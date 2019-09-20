import React from "react";
// import { API, graphqlOperation } from "aws-amplify";
// import LoaderButton from "./LoaderButton";
// import { getUser } from "./../graphql/queries";
// import { updateUser } from "./../graphql/mutations";

class Profile extends React.Component {
  state = {
    profile: {
      displayName: null,
      email: null,
      credits: 0
    },
    serverProfile: {
      displayName: null,
      email: null,
      credits: 0
    },
    loading_profile: false
  };

  componentDidMount() {
    // this.getProfile();
  }

  // async updateUser(profile) {
  //   try {
  //     var { data } = await API.graphql(graphqlOperation(updateUser, profile));
  //     this.setState({
  //       profile: data.updateUser,
  //       serverProfile: data.updateUser
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async getProfile() {
  //   if (this.props && this.props.sub && this.props.match) {
  //     if (this.props.match.params.id === this.props.sub.substring(10)) {
  //       // me!
  //       this.setState({
  //         profile: { ...this.props.profile },
  //         serverProfile: { ...this.props.profile }
  //       });
  //     } else {
  //       this.setState({ loading_profile: true });
  //       try {
  //         var { data } = await API.graphql(
  //           graphqlOperation(getUser, { user_id: this.props.sub.substring(10) })
  //         );
  //         this.setState({
  //           profile: { ...data.getUser },
  //           serverProfile: { ...data.getUser },
  //           loading_profile: false
  //         });
  //       } catch (e) {
  //         console.log(e);
  //         this.setState({ loading_profile: false });
  //       }
  //     }
  //   }
  // }

  render() {
    if (
      this.props &&
      this.props.sub &&
      this.props.match.params.id === this.props.sub.substring(10)
    ) {
      return (
        <div className="container text-center m-5">
          <h1>Your Profile</h1>
          <div className="row">
            {/*<div className="col-2">Credits:</div>
            <div className="col-1" id="credits">
              {this.state.serverProfile.credits || 0}
            </div>
            <div className="col-1">
              <LoaderButton
                isLoading={this.state.loading_profile}
                onClick={this.updateCredits.bind(this)}
                data-amount={5}
                text="+5"
              />
            </div>*/}
          </div>
        </div>
      );
    } else {
      return <div className="container text-center m-5">Somebody Else</div>;
    }
  }
}

export default Profile;
