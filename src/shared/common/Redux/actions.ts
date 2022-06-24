import { Datum, GitApiResponseData } from "./types";

export const SET_NAVIGATION = "SET_NAVIGATION";
export const SET_OWNER_REPO = "SET_OWNER_REPO";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const SET_PAGE = "SET_PAGE";
export const SET_COMMITS = "SET_COMMITS";
export const CLEAR_COMMITS = "CLEAR_COMMITS";

interface OwnerRepo {
  owner: string;
  repo: string;
}

interface ActionTypes {
  SET_NAVIGATION: string;
  SET_OWNER_REPO: OwnerRepo;
  SET_COMMITS: Datum[]; //TODO:  Type this
  CLEAR_COMMITS: void;
  SET_TOTAL_PAGES: number;
  SET_PAGE: number;
}

export interface CommonActions {
  navigationUrl?: string;
  owner?: string;
  repo?: string;
  commits?: Datum[];
  page?: number;
  isEndOfCommits?: number;
  navigateUrl?: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: CommonActions;
}

export type CommonActionsTypes = MessageAction;

export const setNavigation = (url: string) => ({
  type: SET_NAVIGATION,
  payload: url,
});

export const getRepoCommits =
  (owner: string, repo: string) =>
  //Redux typings for dispatch is any
  async (dispatch: any, _getState: Function, { getCommits }) => {
    //Pull what we need out of state.
    const {
      common: { page },
    } = _getState();

    getCommits(owner, repo, page)
      .then(({ data: commits }: GitApiResponseData) => {
        //Increment the page, for the next call
        const newPageNumber = page + 1;

        //Send our data off to the store
        dispatch({
          type: SET_COMMITS,
          payload: {
            commits,
            page: newPageNumber,
            navigateUrl: "/commits",
            owner,
            repo,
          },
        });
      })
      .catch(() => {
        //Save the owner/repo entries
        dispatch({
          type: SET_OWNER_REPO,
          payload: {
            owner,
            repo,
          },
        });
        //The owner and/or repo does not exist.  Lets Navigate
        dispatch(setNavigation("/does/not/exist"));
      });
  };

export const clearCommits = () => ({ type: CLEAR_COMMITS });
