import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface Props {
  record: any;
  open: boolean;
  loading: boolean;
  title: string | JSX.Element;
  content: string | JSX.Element;
  onConfirm: (record: any) => void;
  onCancel: () => void;
}

export class Confirm extends React.Component<Props> {
  render() {
    const { record, open, title, content, onConfirm, onCancel } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCancel() } color="secondary" disabled={this.props.loading}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(record) } color="primary" disabled={this.props.loading} autoFocus>
            {this.props.loading ?
              <CircularProgress size={14} /> :
              'Okay'
            }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Confirm;