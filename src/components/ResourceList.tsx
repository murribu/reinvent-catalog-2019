import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { capitalize } from 'lodash';
import pluralize from 'pluralize';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import MaterialTable from 'material-table';
import Alert from './Alert';
import Confirm from './Confirm';
import ResourceForm from './ResourceForm';
import IResource from '../resources/interfaces/IResource';
import { Location } from 'history';

interface Props extends RouteComponentProps<any> {
  classes: any;
  resource: IResource;
  listReturnShape?: string;
  push?(route: string): void;
  match: any;
}

interface State {
  listLoading: boolean,
  listError: Error | null,
  data: any[],
  formOpen: boolean,
  formResource?: IResource,
  formSaving: boolean,
  alertOpen: boolean,
  alertTitle: string | JSX.Element,
  alertContent: string | JSX.Element,
  deleteRecordPending?: IResource,
  deleteConfirmOpen: boolean,
  deleteConfirmLoading: boolean,
  deleteConfirmTitle: string,
  deleteConfirmContent: string,
}

const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto' as 'auto',
  },
  createButton: { },
  createButtonContainer: {
    textAlign: 'right' as 'right',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  progress: { },
  progressContainer: {
    textAlign: 'center' as 'center',
  },
  table: {
    minWidth: 700,
  },
});

type ResourceClass = {
  new (record: any, partialRecord: boolean): IResource;
  columns: { title: string, field: string }[];
  rowTransformer(record: any): any;
  all(responseShape: string | undefined, limit?: number, nextToken?: string | null): Promise<any[]>;
}

class ResourceList extends React.Component<Props, State> {
  protected resource: IResource;
  protected resourceClass: ResourceClass;
  protected resourceName : string;

  state: State = {
    listLoading: true,
    listError: null,
    data: [],
    formOpen: false,
    formResource: undefined,
    formSaving: false,
    alertOpen: false,
    alertTitle: '',
    alertContent: '',
    deleteRecordPending: undefined,
    deleteConfirmOpen: false,
    deleteConfirmLoading: false,
    deleteConfirmTitle: 'Confirm Removal',
    deleteConfirmContent: 'Are you sure you want to remove this item?',
  };

  dialogIconStyle = {
    top: '8px',
    position: 'relative' as 'relative',
  };

  nextToken?: string;
  prevToken?: string;
  currentPage = 0;
  rowsPerPage = 10;

  constructor(props: Props) {
    super(props);

    const { resource } = props;

    this.resource = resource;
    this.resourceName = capitalize(pluralize((resource.constructor as any).$name));
    this.resourceClass = (resource.constructor as any) as ResourceClass;
  }

  async componentDidMount() {
    this.updateStateFromRoute();
    this.fetchData();
  }

  async fetchData(tokenToUse: string | null = null) {
    this.setState({
      listLoading: true,
    });

    try {
      //! TODO: Remove hardcoded limit in favor of legitimate pagination. It's cumbersome to
      //! implement via AppSync, so skipping it for now.
      const [data, nextToken] = await this.resourceClass.all(this.props.listReturnShape, /*this.rowsPerPage*/ 1000000, tokenToUse || null);

      this.nextToken = nextToken;

      this.setState({
        listError: null,
        data,
      });
    } catch (err) {
      const partialResult = err.data as any;
      if (partialResult) {
        console.warn('FETCHED DATA WITH PARTIAL RESULTS', err);

        const keyName = Object.keys(partialResult).shift() as string;
        const data = partialResult[keyName].items.filter((i: any) => i !== null);

        this.setState({
          listError: null,
          data,
        });

        return;
      }

      console.error('Error fetching data:', err, err.message);

      this.setState({
        listError: err,
      });
    } finally {
      this.setState({
        listLoading: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { listError, listLoading, data } = this.state;

    if (listError) {
      return (<h3>Could not load data. Please check your internet connection and refresh.</h3>);
    }

    const self = this;

    return (
      <Grid item xs={12}>
        <div className={classes.createButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.createButton}
            onClick={this.onCreateClick}
          >
            New {pluralize.singular(this.resourceName || '')}
            <AddIcon className={classes.rightIcon} />
          </Button>
        </div>
        <Paper className={classes.root}>
          <MaterialTable
            // components={{
            //   Pagination: props => (
            //     <td style={{display: 'block'}}>
            //       <TablePagination
            //         rowsPerPageOptions={[10, 25, 50, 100, 200]}
            //         component="div"
            //         count={this.nextToken ? data.length + 1 : data.length}
            //         rowsPerPage={this.rowsPerPage}
            //         page={this.currentPage}
            //         backIconButtonProps={{
            //           'aria-label': 'Previous Page',
            //         }}
            //         nextIconButtonProps={{
            //           'aria-label': 'Next Page',
            //         }}
            //         labelDisplayedRows={({ from, to, count }) => ``}
            //         onChangePage={this.onChangePage}
            //         onChangeRowsPerPage={this.onChangeRowsPerPage}
            //       />
            //     </td>
            //   ),
            // }}
            isLoading={listLoading}
            title={this.resourceName || 'Resources'}
            columns={this.resourceClass.columns}
            data={data && data.length > 0 ? data.map((record: any) => this.resourceClass.rowTransformer(record)) : []}
            onRowClick={function (rowData: any) { self.onRowClicked(arguments[0], arguments[1]) } }
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, record) => this.promptToDelete(record),
              },
            ]}
            options={{
              emptyRowsWhenPaging: false,
              actionsColumnIndex: -1,
              exportButton: true,
              pageSize: this.rowsPerPage,
              pageSizeOptions: [10, 25, 50, 100, 200],
            }}
          />
        </Paper>
        <ResourceForm
          open={this.state.formOpen}
          saving={this.state.formSaving}
          resource={this.state.formResource}
          onDismiss={this.onFormDismissed}
          onSave={this.onResourceSave}
        />
        <Confirm
          record={this.state.deleteRecordPending}
          loading={this.state.deleteConfirmLoading}
          open={this.state.deleteConfirmOpen}
          title={this.state.deleteConfirmTitle}
          content={this.state.deleteConfirmContent}
          onConfirm={this.onDeleteConfirm }
          onCancel={this.onDeleteCancel }
        />
        <Alert
          open={this.state.alertOpen}
          title={this.state.alertTitle}
          content={this.state.alertContent}
          onDismiss={() => this.setState({ alertOpen: false })}
        />
      </Grid>
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    const currentLocation = this.props.location;
    const newLocation = nextProps.location;

    if (newLocation.pathname !== currentLocation.pathname) {
      this.updateStateFromRoute(newLocation);
    }
  }

  protected updateStateFromRoute(locationToUse?: Location) {
    const { match } = this.props;
    const location = locationToUse ? locationToUse : this.props.location;

    if (location.pathname === match.url) {
      this.setState({
        formSaving: false,
        formOpen: false,
      });

      return;
    }

    // Creation
    if (location.pathname.endsWith('/new')) {
      this.setState({
        formResource: new this.resourceClass(null, false),
        formSaving: false,
        formOpen: true,
      });

      return;
    }

    // Updating
    this.setState({
      formResource: new this.resourceClass({ rawRecord: { id: location.pathname.replace(`${match.url}/`, '') } }, true),
      formSaving: false,
      formOpen: true,
    });
  }

  navTo = (route: string) => {
    const { push } = this.props;
    if (push) {
      push(route);
    }
  }

  onCreateClick = () => {
    const { match } = this.props;
    this.navTo(`${match.url}/new`);
  }

  onFormDismissed = () => {
    const { history } = this.props;

    history.goBack();
  }

  onResourceSave = async () => {
    const { formResource } = this.state;

    if (formResource) {
      this.setState({ formSaving: true });

      try {
        const response = await formResource.save();

        this.setState({
          alertTitle: (<span><CheckIcon fontSize="large" style={{ ...this.dialogIconStyle, color: green[400] }} /> Success!</span>),
          alertContent: (formResource as IResource).getSaveMessage(response) || 'Resource was successfully saved.',
          alertOpen: true,
        });

        this.navTo(this.props.match.url);
        this.fetchData();
      } catch (err) {
        const { response } = err;
        console.error('RESOURCE NOT SAVED SUCCESSFULLY:', err, response);
        let error = 'An unknown error has occurred. Please try again.';

        if (response && response.data) {
          let { error: innerError } = response.data;

          if (innerError && innerError !== '') {
            error = innerError;
          }
        }

        this.setState({
          alertTitle: (<span><ErrorOutlineIcon color="error" fontSize="large" style={this.dialogIconStyle} /> Could Not Save</span>),
          alertContent: error,
          alertOpen: true,
        });
      } finally {
        this.setState({
          formSaving: false,
        });
      }
    }
  }

  promptToDelete = (record: any) => {
    this.setState({
      deleteRecordPending: record,
      deleteConfirmOpen: true,
      deleteConfirmLoading: false,
    });
  }

  onDeleteConfirm = async (record: any) => {
    const resourceToDelete = new this.resourceClass(record, false);
    try {
      this.setState({ deleteConfirmLoading: true });
      await resourceToDelete.delete();
      this.setState({ deleteConfirmOpen: false });

      this.fetchData();
    } catch (err) {
      console.error('COULD NOT DELETE', err, err.message);

      this.setState({
        alertTitle: (<span><ErrorOutlineIcon color="error" fontSize="large" style={this.dialogIconStyle} /> Could Not Delete</span>),
        alertContent: 'The resource was not able to be deleted successfully.',
        alertOpen: true,
      });
    } finally {
      this.setState({ deleteConfirmLoading: false });
    }
  }

  onDeleteCancel = () => {
    this.setState({ deleteConfirmOpen: false });
  }

  onRowClicked = (event: any, record: any) => {
    if (event.target.nodeName === 'A') {
      return;
    }

    const formResource = new this.resourceClass({ rawRecord: { id: record.id } }, true);

    this.setState({
      formResource,
    });

    this.navTo(`${this.props.match.url}/${formResource.id}`);
  }

  onChangePage = (event: any, page: number) => {
    const tokenToUse = page > this.currentPage ? this.nextToken : this.prevToken;
    this.currentPage = page;
    this.fetchData(tokenToUse);
  }

  onChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = event.target.value as number;
    this.rowsPerPage = newRowsPerPage;
    this.fetchData();
  }
}

export default withStyles(styles)(withRouter(connect<Props>(null, { push })(ResourceList)));