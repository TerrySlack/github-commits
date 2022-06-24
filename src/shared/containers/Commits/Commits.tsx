import React, { useCallback, MouseEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { dateFormat, formatDate } from "Utils/dates";
import { Commits } from "Components/Commits";
import { areEqual } from "Utils/equalityChecks";
import { debounce } from "Utils/debounce";
import { getRepoCommits, setNavigation } from "Common/Redux";

//static selector.
const commonSelector = ({
  common: { owner, repo, commits, page, isEndOfCommits },
}) => ({ owner, repo, commits, page, isEndOfCommits });

const CommitsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { owner, repo, commits, page, isEndOfCommits } = useSelector(
    commonSelector,
    areEqual
  );

  const setDateFormat = (date: string) => formatDate(date, dateFormat);
  const onLoadMore = () => {
    if (!isEndOfCommits) {
      //Get the next set of results
      dispatch(getRepoCommits(owner, repo));
    }
  };

  const navigateActions = () => {
    dispatch(setNavigation(""));
    navigate("/");
  };

  //Methods wrapped in Debounce.  Stop rapid clicking or pressing the enter key from making multiple requests
  const onSearchClick = useCallback(
    debounce(async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigateActions();
    }),
    [page, isEndOfCommits]
  );

  const onSearchKeyUp = useCallback(
    debounce((e: KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (e.code === "NumpadEnter" || e.code === "Enter") navigateActions();
    }),
    [page, isEndOfCommits]
  );

  const onLoadMoreClick = useCallback(
    debounce((e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      onLoadMore();
    }),
    [page, isEndOfCommits]
  );

  const onLoadMoreKeyUp = useCallback(
    debounce((e: KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (e.code === "NumpadEnter" || e.code === "Enter") onLoadMore();
    }),
    [page, isEndOfCommits]
  );

  return (
    commits && (
      <Commits
        owner={owner}
        repo={repo}
        commits={commits}
        setDateFormat={setDateFormat}
        isButtonDisabled={isEndOfCommits}
        onLoadMoreClick={onLoadMoreClick}
        onLoadMoreKeyUp={onLoadMoreKeyUp}
        onSearchClick={onSearchClick}
        onSearchKeyUp={onSearchKeyUp}
      />
    )
  );
};

export { CommitsContainer as Commits };
