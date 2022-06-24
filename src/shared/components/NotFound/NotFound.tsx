import React, { MouseEvent, KeyboardEvent } from "react";

import classes from "./notfound.module.css";

interface Props {
  owner: string;
  repo: string;
  onSearchClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onSearchKeyUp: (e: KeyboardEvent<HTMLButtonElement>) => void;
}
export const NotFound = ({
  owner,
  repo,
  onSearchClick,
  onSearchKeyUp,
}: Props) => {
  return (
    <div
      className={`${classes["not-found-container"]} ${classes["not-found-common"]}`}
    >
      <form className={classes["not-found-form"]}>
        <div>
          <h1>Aww shucks. Looks like we have a problem Houston!</h1>
        </div>
        {owner.length > 0 && repo.length > 0 && (
          <div className={classes["not-found-owner-repo-container"]}>
            <p className={classes["not-found-owner-repo-message"]}>
              Looks like
              <span className={classes["not-found-owner-repo"]}>{owner}</span>
              and/or
              <span className={classes["not-found-owner-repo"]}>{repo}</span>
              are invalid entries.
            </p>
          </div>
        )}
        {owner.length === 0 && repo.length === 0 && (
          <div className={classes["not-found-owner-repo-container"]}>
            <p
              className={`data-test-invalid ${classes["not-found-owner-repo-message"]}`}
            >
              Looks like we have an invalid URL or you forgot to enter a
              repository owner and/or name
            </p>
          </div>
        )}
        <div className={classes["not-found-try-again-container"]}>
          <p className={classes["not-found-try-again-message"]}>
            Can you try again :)
          </p>
          <button
            type="button"
            onKeyUp={onSearchKeyUp}
            className={classes["not-found-try-again-button"]}
            onClick={onSearchClick}
          >
            Back to Search
          </button>
        </div>
      </form>
    </div>
  );
};
