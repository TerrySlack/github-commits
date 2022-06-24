import React, {
  MouseEvent,
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { debounce } from "Utils/debounce";
import { getRepoCommits, clearCommits } from "Common/Redux";
import { areEqual } from "Utils/equalityChecks";
import { Home } from "Components/Home";

//static selector.
const navigateUrlSelector = ({ common: { navigateUrl } }) => navigateUrl;

const HomeContainer = function () {
  const navigateUrl = useSelector(navigateUrlSelector, areEqual);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [owner, setOwner] = useState<string>("");
  const [repo, setRepo] = useState<string>("");

  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getRepoCommits(owner, repo));
  };

  const onOwnerChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setOwner(value);
    }),
    []
  );

  const onRepoChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setRepo(value);
    }),
    []
  );

  useEffect(() => {
    //I want to reset the state in commits
    dispatch(clearCommits());
  }, []);

  useEffect(() => {
    //The url for navigation is determined in the getRepoCommits thunk.
    //Need this, in order to safely navigate to the /does/not/exist route if the owner/repo does not exist
    if (navigateUrl.length > 0) navigate(navigateUrl);
  }, [navigateUrl]);

  return (
    <Home
      onSubmit={onSubmit}
      onOwnerChange={onOwnerChange}
      onRepoChange={onRepoChange}
    />
  );
};
export { HomeContainer as Home };
