// types
import {
  SET_NAVIGATION,
  SET_OWNER_REPO,
  CommonActionsTypes,
  SET_COMMITS,
  CLEAR_COMMITS,
} from "./actions";

// state
const initialState = {
  navigateUrl: "",
  owner: "",
  repo: "",
  commits: [],
  page: 1,
  isEndOfCommits: false,
};

export const Commonreducer = (
  state = initialState,
  action: CommonActionsTypes
) => {
  switch (action.type) {
    case SET_NAVIGATION: {
      return {
        ...state,
        navigateUrl: action.payload,
      };
    }
    case SET_OWNER_REPO: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_COMMITS: {
      const { commits, page, navigateUrl, owner, repo } = action.payload;

      //Build the commit object
      const commitState = { ...state, page, navigateUrl, owner, repo };

      if (commits.length > 0) {
        //Merge the new commits with the existing ones
        commitState.commits = [...state.commits, ...commits];
      } else {
        commitState.isEndOfCommits = true;
      }

      return commitState;
    }
    case CLEAR_COMMITS: {
      return initialState;
    }
    default:
      return state;
  }
};
