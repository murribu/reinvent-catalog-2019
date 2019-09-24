import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PostFlagList from './PostFlagList';
import CommentFlagList from './CommentFlagList';

interface OwnProps {
  classes: any;
}

interface StateProps {
  flags: any;
}

interface Props extends StateProps, OwnProps { }

interface State {
  tabValue: number;
  postFlagCount: number;
  commentFlagCount: number;
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

export class Flags extends React.Component<Props, State> {
  state: State = {
    tabValue: 0,
    postFlagCount: 0,
    commentFlagCount: 0,
  };

  componentDidMount() {
    this.updateFlagCount();
  }

  componentDidUpdate() {
    this.updateFlagCount();
  }

  updateFlagCount() {
    const newPostFlagCount = this.props.flags.posts.count;
    const newCommentFlagCount = this.props.flags.comments.count;

    const { postFlagCount, commentFlagCount } = this.state;
    let newState: any = {};

    if (newPostFlagCount != postFlagCount) {
      newState.postFlagCount = newPostFlagCount;
    }

    if (newCommentFlagCount != commentFlagCount) {
      newState.commentFlagCount = newCommentFlagCount;
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState);
    }
  }

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className={classes.root}>
        <Tabs value={tabValue} onChange={this.onTabChange}>
          <Tab label={<Badge className={classes.padding} badgeContent={this.state.postFlagCount} color="error">Posts</Badge>} />
          <Tab label={<Badge className={classes.padding} badgeContent={this.state.commentFlagCount} color="error">Comments</Badge>} />
        </Tabs>
        { tabValue === 0 &&
          <div style={{ padding: 8 * 3 }}>
            <PostFlagList
              data={this.props.flags.posts.data}
              loading={this.props.flags.fetching}
            />
          </div>
        }
        { tabValue === 1 &&
          <div style={{ padding: 8 * 3 }}>
            <CommentFlagList
              data={this.props.flags.comments.data}
              loading={this.props.flags.fetching}
            />
          </div>
        }
      </div>
    );
  }

  onTabChange = (event: any, newValue: any) => {
    this.setState({
      tabValue: newValue,
    });
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    flags: state.flags,
  };
};

export default withStyles(styles)(connect<StateProps, {}, OwnProps>(mapStateToProps)(Flags));