import { flagService } from "../services/FlagService";
import { profileService } from "../services/ProfileService";

export const FETCH_FLAGS = "@@flags/fetch";
export const RECEIVE_FLAGS = "@@flags/receive_flags";
export const BEGIN_FLAG_UPDATE = "@@flags/begin_flag_update";
export const END_FLAG_UPDATE = "@@flags/end_flag_update";
export const SET_FLAG_ERROR = "@@flags/set_flag_error";
export const FETCH_MY_PROFILE = "@@profile/fetch_my_profile";
export const RECEIVE_MY_PROFILE = "@@profile/receive_my_profile";
export function fetchFlags() {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_FLAGS });

    const { posts, comments } = (await flagService.fetch()) as any;

    dispatch({
      type: RECEIVE_FLAGS,
      posts,
      comments
    });
  };
}

export function markFlagReviewed(id: string, type: string) {
  return async (dispatch: any) => {
    dispatch({ type: BEGIN_FLAG_UPDATE });

    try {
      await flagService.markFlagAsReviewed(id, type);
      fetchFlags()(dispatch);
    } catch (err) {
      dispatch({ type: SET_FLAG_ERROR, message: err });
    } finally {
      dispatch({ type: END_FLAG_UPDATE });
    }
  };
}

export function fetchMyProfile() {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_MY_PROFILE });

    const profile = (await profileService.fetchMyProfile()) as any;

    dispatch({
      type: RECEIVE_MY_PROFILE,
      profile
    });
  };
}
