import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FlagIcon from '@material-ui/icons/Flag';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import CommentIcon from '@material-ui/icons/Comment';
import LocalHostpitalIcon from '@material-ui/icons/LocalHospital';
import InboxIcon from '@material-ui/icons/Inbox';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const drawerWidth = 240;
const styles = (theme: any) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap' as 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden' as 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'flex-end' as 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

interface OwnProps {
  classes?: any;
  open: boolean;
  mobileOpen: boolean;
  push?: Function;
  onDrawerClose(event: any): void;
}

interface StateProps {
  flags: any;
}

interface Props extends StateProps, OwnProps {}

interface State {
  flagCount: number;
}

class Menu extends React.Component<Props, State> {
  state: State = {
    flagCount: 0,
  };

  navTo = (route: string) => () => {
    const { push } = this.props;
    if (push) {
      push(route);
    }
  }

  componentDidMount() {
    this.updateFlagCount();
  }

  componentDidUpdate() {
    this.updateFlagCount();
  }

  updateFlagCount() {
    const postFlagCount = this.props.flags.posts.count;
    const commentFlagCount = this.props.flags.comments.count;
    const newCount = postFlagCount + commentFlagCount;

    const { flagCount } = this.state;

    if (newCount != flagCount) {
      this.setState({
        flagCount: newCount,
      });
    }
  }

  render() {
    const { classes, open, mobileOpen } = this.props;

    const drawer = (
      <div>
        <Hidden xsDown implementation="css">
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.onDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </Hidden>
        <List>
          <Tooltip title="Dashboard" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Dashboard' onClick={this.navTo('/')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List subheader={<ListSubheader>{(open || mobileOpen) && 'Content' }</ListSubheader>}>
          <Tooltip title="Categories" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Categories' onClick={this.navTo('/categories')}>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary='Categories' />
            </ListItem>
          </Tooltip>
          <Tooltip title="Diagnoses" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Diagnoses' onClick={this.navTo('/diagnoses')}>
              <ListItemIcon><LocalHostpitalIcon /></ListItemIcon>
              <ListItemText primary='Diagnoses' />
            </ListItem>
          </Tooltip>
          <Tooltip title="Posts" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Posts' onClick={this.navTo('/posts')}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary='Posts' />
            </ListItem>
          </Tooltip>
          <Tooltip title="Comments" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Comments' onClick={this.navTo('/comments')}>
              <ListItemIcon><CommentIcon /></ListItemIcon>
              <ListItemText primary='Comments' />
            </ListItem>
          </Tooltip>
          <Tooltip title="Flagged Content" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Flagged Content' onClick={this.navTo('/flags')}>
              <ListItemIcon>
                <Badge className={classes.margin} badgeContent={this.state.flagCount} color="error">
                  <FlagIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary='Flagged Content' />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List subheader={<ListSubheader>{(open || mobileOpen) && 'Security'}</ListSubheader>}>
          <Tooltip title="Users" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Users' onClick={this.navTo('/users')}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary='Users' />
            </ListItem>
          </Tooltip>
          <Tooltip title="Partners" placement="right" disableFocusListener={open} disableHoverListener={open} disableTouchListener={open}>
            <ListItem button key='Partners' onClick={this.navTo('/partners')}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary='Partners' />
            </ListItem>
          </Tooltip>
        </List>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={this.props.mobileOpen}
            onClose={this.props.onDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
            open={open}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    flags: state.flags,
  };
};

const connectedMenu = connect<StateProps, {}, OwnProps>(mapStateToProps, { push })(Menu);

export default withStyles(styles)(connectedMenu);
