import React, { MouseEvent, ChangeEvent } from "react";

import classes from "./home.module.css";

/*
  Selector to pull the owner and route to display
*/
interface Props {
  onSubmit: (e: MouseEvent<HTMLFormElement>) => void;
  onOwnerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRepoChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Home = ({ onSubmit, onOwnerChange, onRepoChange }: Props) => {
  return (
    <div data-testid="home" className={classes["home-container"]}>
      <div>
        <div className={classes["home-welcome"]}>
          <h1 data-testid="home-welcome">
            Welcome to the Git Hub commits review app
          </h1>
        </div>
        <div className={classes["home-welcome-form-container"]}>
          <form
            data-testid="home-form"
            onSubmit={onSubmit}
            className={classes["home-welcome-form"]}
          >
            <input
              data-testid="owner"
              type="text"
              className={classes["home-welcome-text-box"]}
              name="owner"
              onChange={onOwnerChange}
              placeholder="Enter the repository owner"
            />
            <input
              data-testid="repo"
              type="text"
              className={classes["home-welcome-text-box"]}
              name="repo"
              onChange={onRepoChange}
              placeholder="Enter the repository name"
            />
            <button
              data-testid="search"
              type="submit"
              className={`data-test-button ${classes["home-welcome-button-common"]} ${classes["home-welcome-button"]}`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
