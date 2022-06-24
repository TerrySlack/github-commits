import React, { MouseEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

import { NotFound } from "Components/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { areEqual } from "Utils/equalityChecks";
import { debounce } from "Utils/debounce";
import { clearCommits } from "Common/Redux";

//static selector.
const ownerRepoSelector = ({ common: { owner, repo } }) => ({ owner, repo });
export const NotFoundContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { owner, repo } = useSelector(ownerRepoSelector, areEqual);

  const navigateActions = () => {
    dispatch(clearCommits());
    navigate("/");
  };

  //Let's debounce the methods to stop repeated mouse clicks or enter presses
  const onSearchClick = debounce((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigateActions();
  });

  const onSearchKeyUp = debounce((e: KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.code === "NumpadEnter" || e.code === "Enter") navigateActions();
  });

  return (
    <NotFound
      owner={owner}
      repo={repo}
      onSearchClick={onSearchClick}
      onSearchKeyUp={onSearchKeyUp}
    />
  );
};
export { NotFoundContainer as NotFound };
