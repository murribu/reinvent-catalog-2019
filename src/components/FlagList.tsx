import React from 'react';
import MaterialTable from 'material-table';
import { capitalize } from 'lodash';
import pluralize from 'pluralize';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Alert from './Alert';
import { makeRelatedTableLink } from './RelatedTableLink';
import { SET_FLAG_ERROR, markFlagReviewed } from '../redux/actions';

interface OwnProps {
  name: string;
  loading: boolean;
  data: any[];
}

interface StateProps {
  markingAsReviewed: boolean;
  flagError?: string;
}

interface Props extends StateProps, OwnProps {
  dispatch: any;
}

interface State {
  alertOpen: boolean;
  alertTitle: string | JSX.Element;
  alertContent: string | JSX.Element;
}

export class FlagList extends React.Component<Props, State> {
  state: State = {
    alertOpen: false,
    alertTitle: '',
    alertContent: '',
  }

  dialogIconStyle = {
    top: '8px',
    position: 'relative' as 'relative',
  };

  makeColumns = () => {
    const { name } = this.props;

    return [
      { title: capitalize(name), field: 'content', render: (rowData: any) => makeRelatedTableLink(pluralize(name).toLowerCase(), rowData.contentId, rowData.content) },
      { title: 'Author', field: 'author', render: (rowData: any) => makeRelatedTableLink('users', rowData.author, rowData.author) },
      { title: 'Flagged By', field: 'user', render: (rowData: any) => makeRelatedTableLink('users', rowData.user, rowData.user) },
    ];
  };

  rowTransformer = (record: any) => {
    const { name } = this.props;
    const flaggedRecord = record[name.toLowerCase()];


    return {
      'content': flaggedRecord.title || flaggedRecord.content,
      'contentId': flaggedRecord.id,
      'author': flaggedRecord.author.id,
      'user': record.user.id,
      rawRecord: record,
    };
  };

  markAsReviewed = (rowData: any) => {
    this.props.dispatch(markFlagReviewed(rowData.rawRecord.id, this.props.name));
  }

  componentDidUpdate() {
    const { flagError } = this.props;
    const { alertOpen } = this.state;

    if (flagError && !alertOpen) {
      this.setState({
        alertOpen: true,
        alertTitle: ((<span><ErrorOutlineIcon color="error" fontSize="large" style={this.dialogIconStyle} /> Could Not Save</span>)),
        alertContent: 'There was an error updating the flag. Please try again.',
      });
    } else if (!flagError && alertOpen) {
      this.setState({
        alertOpen: false,
      });
    }
  }

  render() {
    const { data, loading, name, markingAsReviewed } = this.props;

    return (
      <div>
        <MaterialTable
          isLoading={loading}
          title={`${name} Flags`}
          columns={this.makeColumns()}
          data={data && data.length > 0 ? data.map((record: any) => this.rowTransformer(record)) : []}
          actions={[
            {
              icon: markingAsReviewed ? () => (<CircularProgress size={20} />) : 'check',
              disabled: markingAsReviewed,
              tooltip: 'Mark as Reviewed',
              onClick: (event, record) => this.markAsReviewed(record),
            },
          ]}
          options={{
            emptyRowsWhenPaging: false,
            actionsColumnIndex: -1,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200],
            search: false,
            sorting: false,
          }}
        />
        <Alert
          open={this.state.alertOpen}
          title={this.state.alertTitle}
          content={this.state.alertContent}
          onDismiss={() => this.props.dispatch({ type: SET_FLAG_ERROR, message: undefined }) }
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    markingAsReviewed: state.flags.markingAsReviewed,
    flagError: state.flags.flagError,
  };
};

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(FlagList);