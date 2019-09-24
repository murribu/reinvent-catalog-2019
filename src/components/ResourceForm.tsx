import React from 'react';
import { connect } from 'react-redux';
import Image from 'material-ui-image';
import { withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CheckIcon from '@material-ui/icons/Check';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import IResource from '../resources/interfaces/IResource';
import {
  ActionType,
  IAttribute,
  IAttributeType,
  ICollectionAttribute,
  ICollectionAttributeOption,
  IBooleanAttribute,
  IDividerAttribute,
  IImageAttribute,
  IElementAttribute
} from '../resources/interfaces/IAttribute';
import Alert from './Alert';

const styles = (theme: any) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  normalWeight: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  mediumWeight: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  progressContainer: {
    textAlign: 'center' as 'center',
  },
  hide: {
    display: 'none' as 'none',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  fullScreen?: boolean;
  // width?: Breakpoint;
  classes: any;
  open: boolean;
  saving: boolean;
  resource?: IResource;
  onSave: Function;
  onDismiss: Function;
}

type State = {
  loading: boolean;
  error: Error | null;
  attrs: IAttribute[];
  alertOpen: boolean;
}

class ResourceForm extends React.Component<Props, State> {
  state: State = {
    loading: true,
    error: null,
    attrs: [],
    alertOpen: false,
  };

  dialogIconStyle = {
    top: '8px',
    position: 'relative' as 'relative',
  };

  async componentDidUpdate(prevProps: Props) {
    const prevResource = prevProps.resource;
    const { open, resource } = this.props;
    if (!open || !resource) {
      return;
    }

    if (!prevResource || (prevResource && prevResource.signature !== resource.signature)) {
      this.loadResource();
    }
  }

  async componentDidMount() {
    this.loadResource();
  }

  render() {
    const { open, resource, fullScreen, classes } = this.props;
    const { loading, error } = this.state;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          maxWidth={'md'}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {resource && (
              resource.id ? 'Update ' : 'Create '
            )}
            {resource && (resource.constructor as any).$name}
          </DialogTitle>
          <DialogContent>
            {loading &&
              <div className={classes.progressContainer}><CircularProgress /></div>
            }
            {!loading && error &&
              <h3>There was an error loading this resource.</h3>
            }
            {!loading && !error &&
              <DialogContentText>
                Fill out the form below and click 'Save' when finished.
              </DialogContentText>
            }
            {!loading && !error &&
              <Grid container spacing={24}>
                {this.buildForm()}
              </Grid>
            }
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              onClick={this.handleClose}
              disabled={this.props.saving}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleSave}
              disabled={this.props.saving || loading}
            >
              {this.props.saving ?
                <CircularProgress size={14} /> :
                <Typography>Save</Typography>
              }
            </Button>
          </DialogActions>
        </Dialog>
        <Alert
          open={this.state.alertOpen}
          title={<span><ErrorOutlineIcon color="error" fontSize="large" style={this.dialogIconStyle} />Could Not Save</span>}
          content={<span>There were one or more errors in the form which prevented saving.<br/><br/><em>Note that depending on screen size, some inputs might be off screen and require scrolling to view.</em></span>}
          onDismiss={() => this.setState({ alertOpen: false }) }
        />
      </div>
    );
  }

  loadResource = async () => {
    const { resource } = this.props;
    this.setState({ loading: true });

    if (!resource) {
      return;
    }

    try {
      await resource.initialize();

      this.setState({ attrs: resource.attributes });
    } catch (error) {
      console.error('GOT ERROR DURING RESOURCE INIT', error);
      this.setState({ error });
    } finally {
      this.setState({ loading: false })
    }
  }

  handleClose = () => {
    this.resetForm();
    this.props.onDismiss();
  }

  handleSave = () => {
    const { attrs } = this.state;
    if (!attrs) {
      return;
    }

    let anyErrors = false;

    attrs.forEach((attr: IAttribute) => {
      attr.error = false;

      if (!attr.required) {
        return;
      }

      if (attr.type === IAttributeType.Select) {
        const collectionAttr = attr as ICollectionAttribute;
        if (collectionAttr.multiple && (!collectionAttr.arrayValue || collectionAttr.arrayValue.length === 0)) {
          attr.error = true;
          anyErrors = true;
        } else if (!collectionAttr.multiple && !collectionAttr.value) {
          attr.error = true;
          anyErrors = true;
        }

        return;
      }

      if (!attr.value) {
        attr.error = true;
        anyErrors = true;
      }
    });

    this.setState({ attrs });

    if (!anyErrors) {
      this.resetForm();
      this.props.onSave();
    } else {
      this.setState({ alertOpen: true });
    }
  }

  resetForm() {
    const { attrs } = this.state;

    attrs.forEach(attr => {
      attr.error = false;
    });

    this.setState({ loading: false, error: null, attrs });
  }

  handleFieldChange = (attr: IAttribute) => (event: any) => {
    if (attr.type === IAttributeType.Select) {
      const colAttr = attr as ICollectionAttribute;
      if (colAttr.multiple) {
        colAttr.arrayValue = event.target.value;
      } else {
        colAttr.value = event.target.value;
      }

      attr.error = attr.required && !colAttr.arrayValue && !colAttr.value;
    } else {
      attr.value = event.target.value;
      attr.error = attr.required && !attr.value;
    }

    const attrs = this.state.attrs.map((existingAttr: IAttribute) => {
      if (existingAttr.name == attr.name) {
        return attr;
      }

      return existingAttr;
    });

    this.setState({ attrs });
  }

  handleFileChange = (file: File, attr: IImageAttribute) => {
    attr.pendingSrc = URL.createObjectURL(file);
    attr.pendingFile = file;
    attr.value = file; // Used to avoid errors for required files

    const attrs = this.state.attrs.map((existingAttr: IAttribute) => {
      if (existingAttr.name == attr.name) {
        return attr;
      }

      return existingAttr;
    });

    this.setState({ attrs });
  };

  handleFileClear = (attr: IImageAttribute) => {
    attr.pendingSrc = undefined;
    attr.pendingFile = undefined;
    attr.value = attr.originalValue;

    const attrs = this.state.attrs.map((existingAttr: IAttribute) => {
      if (existingAttr.name == attr.name) {
        return attr;
      }

      return existingAttr;
    });

    this.setState({ attrs });
  };

  isOptionSelected(attr: ICollectionAttribute, option: ICollectionAttributeOption) {
    if (attr.arrayValue) {
      if (attr.arrayValue.includes(option.value)) {
        return true;
      }
    }

    if (attr.value) {
      return attr.value === option.value;
    }

    return false;
  }

  getKeyForOptionValue(value: string, attr: ICollectionAttribute) {
    const matchedOption = attr.options.find(option => option.value === value);

    return matchedOption ? matchedOption.key : 'No display name for selected option!';
  }

  buildForm() {
    if (!this.state) {
      return (
        <span>There is no resource associated with this form.</span>
      );
    }

    const { attrs } = this.state;

    if (!attrs) {
      return (
        <span>There are no attributes associated with this form.</span>
      );
    }

    const { classes } = this.props;

    return attrs
    .filter((attr: IAttribute) => {
      if (attr.visible) {
        if (this.props.resource && this.props.resource.id) {
          return attr.visible.includes(ActionType.UPDATE);
        } else {
          return attr.visible.includes(ActionType.CREATE);
        }
      }

      return true;
    })
    .map((attr: IAttribute, i: number) => {
      const readOnly = attr.readOnly ?
        (this.props.resource && this.props.resource.id) ?
          attr.readOnly.includes(ActionType.UPDATE) :
          attr.readOnly.includes(ActionType.CREATE)
        : false;

      if (attr.type === IAttributeType.Divider) {
        const dividerAttr = attr as IDividerAttribute;

        return (
          <Grid item xs={12} sm={attr.columnWidth || 12} key={attr.name}>
            { dividerAttr.label &&
              <Typography variant='h6' style={{ marginTop: '40px' }}>{dividerAttr.label}</Typography>
            }
            { dividerAttr.helpText &&
              <Typography>{dividerAttr.helpText}</Typography>
            }
            {/* <Divider style={{ margin: '15px 0px 20px 0px' }} light /> */}
          </Grid>
        );
      }

      if (attr.type === IAttributeType.Select) {
        const collectionAttr = attr as ICollectionAttribute;

        return (
          <Grid item xs={12} sm={attr.columnWidth || 12} key={attr.name}>
            <FormControl
              fullWidth
              required={attr.required && !readOnly}
              error={attr.error}
            >
              <InputLabel htmlFor={attr.name}>{attr.displayName}</InputLabel>
              <Select
                autoWidth
                multiple={collectionAttr.multiple}
                value={collectionAttr.multiple ? (collectionAttr.arrayValue || []) : (collectionAttr.value || '')}
                onChange={this.handleFieldChange(attr)}
                input={<Input id={attr.name} />}
                renderValue={(selected: any) => {
                  if (!collectionAttr.multiple) {
                    return (<span>{this.getKeyForOptionValue(selected, collectionAttr)}</span>);
                  } else {
                    return (<div className={classes.chips}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>);
                  }
                }}
                MenuProps={MenuProps}
              >
                {collectionAttr.options.map((option: ICollectionAttributeOption) => (
                  <MenuItem key={option.key} value={option.value} className={
                    this.isOptionSelected(attr as ICollectionAttribute, option) ?
                    classes.mediumWeight : classes.normalWeight
                  }>
                    {option.key}
                  </MenuItem>
                ))}
              </Select>
              { attr.helpText &&
                <FormHelperText>{attr.helpText}</FormHelperText>
              }
            </FormControl>
          </Grid>
        )
      }

      if (attr.type === IAttributeType.Boolean) {
        const booleanAttr = attr as IBooleanAttribute;

        return (
          <Grid item xs={12} sm={attr.columnWidth || 12} key={attr.name}>
            <FormControl fullWidth>
              { readOnly &&
                <div>
                  <Typography>{attr.displayName}</Typography>
                  <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Chip
                    icon={attr.value ? <CheckIcon style={{ color: green[400] }} /> : <ErrorOutlineIcon style={{ color: red[400] }} />}
                      label={attr.value ? 'Enabled' : 'Disabled'}
                      className={classes.chip}
                    />
                  </div>
                </div>
              }
              { !readOnly &&
                <FormControlLabel
                  label={attr.displayName}
                  checked={attr.value}
                  labelPlacement="end"
                  control={
                    <Switch
                      id={attr.name}
                      checked={attr.value}
                      disabled={readOnly}
                      onChange={(event: any, checked: boolean) => {
                        attr.value = checked;

                        if (booleanAttr.onChange) {
                          // Revert setting if change handler fails
                          booleanAttr.onChange(checked)
                            .catch(err => attr.value = !checked)
                            .finally(() => this.forceUpdate())
                        } else {
                          this.forceUpdate();
                        }
                      }}
                    />
                  }
                />
              }
              { attr.helpText &&
                <FormHelperText>{attr.helpText}</FormHelperText>
              }
            </FormControl>
          </Grid>
        );
      }

      if (attr.type === IAttributeType.Image) {
        const imageAttr = attr as IImageAttribute;

        return(
          <Grid item xs={12} sm={attr.columnWidth || 12} key={attr.name}>
            <Typography>{attr.displayName}</Typography>
            { attr.helpText &&
              <Typography variant="caption">{attr.helpText}</Typography>
            }
            <Grid container spacing={24} style={{height: `calc(50px + ${imageAttr.height}px)`, margin: '15px 0'}}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Current</Typography>
                {imageAttr.src &&
                  <Image src={imageAttr.src} style={{ paddingTop: '0', width: `${imageAttr.width}px`, height: `${imageAttr.height}px`}} imageStyle={{ width: `${imageAttr.width}px`, height: `${imageAttr.height}px` }} />
                }
                {!imageAttr.src &&
                  <Typography variant="body2">None</Typography>
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Pending</Typography>
                {imageAttr.pendingSrc &&
                  <Grid container>
                    <Grid item>
                      <Image src={imageAttr.pendingSrc} style={{ paddingTop: '0', width: `${imageAttr.width}px`, height: `${imageAttr.height}px` }} imageStyle={{ width: `${imageAttr.width}px`, height: `${imageAttr.height}px` }} />
                    </Grid>
                    <Grid item>
                      <Button variant="text" size="small" onClick={() => this.handleFileClear(imageAttr)}><RemoveCircleOutlineIcon color="error" /></Button>
                    </Grid>
                  </Grid>
                }
                {!imageAttr.pendingSrc &&
                  <Typography variant="body2">None</Typography>
                }
              </Grid>
            </Grid>
            <div>
              <input
                accept="image/*"
                className={classes.hide}
                id={attr.name}
                type="file"
                onClick={(e) => (e as any).target.value = ''}
                onChange={(e) => this.handleFileChange((e as any).target.files[0], imageAttr)}
              />
              <label htmlFor={attr.name}>
                <Button variant="contained" component="span" className={classes.button}>
                  Choose New Image
                </Button>
              </label>
            </div>
            <Typography>For best results use an image that is {imageAttr.width}x{imageAttr.height} pixels.</Typography>
          </Grid>
        );
      }

      if (attr.type === IAttributeType.Element) {
        const elemAttr = attr as IElementAttribute;

        return (
          <Grid item xs={12} sm={attr.columnWidth || 12} key={attr.name}>
            <FormControl fullWidth>
              {elemAttr.render(elemAttr, this.props.resource as IResource)}
            </FormControl>
          </Grid>
        );
      }

      return (
        <Grid item xs={12} sm={attr.columnWidth || 12} key={attr.name}>
          <TextField
            margin="dense"
            id={attr.name}
            label={attr.displayName}
            type={attr.type}
            value={attr.value || (attr.type === IAttributeType.TextArea ? '' : null)}
            onChange={this.handleFieldChange(attr)}
            required={attr.required && !readOnly}
            error={attr.error}
            multiline={attr.type === IAttributeType.TextArea}
            disabled={readOnly}
            helperText={attr.helpText}
            fullWidth
          />
        </Grid>
      );
    });
  }
}

export default withStyles(styles)(
  connect(null, null)(
    withMobileDialog<Props>()(ResourceForm)
  )
);
