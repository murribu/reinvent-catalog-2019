import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const styles = (theme: any) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 20,
    marginRight: 36,
  },
});

interface Props {
  classes: any;
  authData: any;
  authState: string;
  drawerOpen: boolean;
  toggleDrawer(): void;
  toggleMobileDrawer(): void;
}

interface State {
  menuAnchorEl: any;
}

class NavBar extends React.Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    authData: PropTypes.object.isRequired,
    authState: PropTypes.string.isRequired,
  }

  state = {
    menuAnchorEl: null,
  };

  handleMenu = (event: any) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ menuAnchorEl: null });
  };

  signOut = () => {
    Auth.signOut();
  };

  handleDrawerToggle = () => {
    this.props.toggleDrawer();
  };

  handleMobileDrawerToggle = () => {
    this.props.toggleMobileDrawer();
  };

  logoStyle = {
    height: '45px',
    position: 'relative' as 'relative',
    top: '5px',
  };

  render() {
    const { classes, authData, authState, drawerOpen } = this.props;
    const { menuAnchorEl } = this.state;
    const open = Boolean(menuAnchorEl);

    return (
      <div>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
          color="default"
        >
          <Toolbar disableGutters={!drawerOpen}>
            <Hidden smUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleMobileDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown implementation="css">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classNames(classes.menuButton, {
                  [classes.hide]: drawerOpen,
                })}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              {/* Cooperative Health */}
              <Link to="/"><img src="/images/logo.png" style={this.logoStyle} alt="Cooperative Health" /></Link>
            </Typography>
            {authState === 'signedIn' && (
              <div>
                { authData.username }
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={menuAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);