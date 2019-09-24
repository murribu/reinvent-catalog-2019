import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

interface Props {
  classes: any;
};

interface State {};

const styles = (theme: any) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export class ChangeUserMFA extends React.Component<Props, State> {
  newEmail?: string;

  onNewEmailChange = (event: any) => {
    this.newEmail = event.target.value;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography>Multi-factor Authentication</Typography>
        {/* <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Change Email Address</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              margin="dense"
              label="New Email Address"
              type="email"
              onChange={this.onNewEmailChange}
              fullWidth
            />
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
      </div>
    );
  }
}

export default withStyles(styles)(ChangeUserMFA);