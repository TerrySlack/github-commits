import React, { MouseEvent, KeyboardEvent } from "react";

import { Table, THead, TBody, TR, TH, TD } from "Components/Table";
import classes from "./commits.module.css";

//Typings for the git hub api response
import { Datum, Commit } from "Common/Redux/types";

interface GitCommit {
  commit: Commit;
  html_url: string;
}

interface Props {
  owner: string;
  repo: string;
  commits: Datum[];
  isButtonDisabled: boolean;
  setDateFormat: (dateString: string) => string;
  onLoadMoreClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onLoadMoreKeyUp: (e: KeyboardEvent<HTMLButtonElement>) => void;
  onSearchClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onSearchKeyUp: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export const Commits = ({
  owner,
  repo,
  commits,
  isButtonDisabled,
  setDateFormat,
  onLoadMoreClick,
  onLoadMoreKeyUp,
  onSearchKeyUp,
  onSearchClick,
}: Props) => {
  return (
    <div className={classes["commits-container"]}>
      <header className={`${classes["commits-header"]}`}>
        <div className={classes["commits-header-section-container"]}>
          <section className={classes["commits-header-title"]}>
            Commit Feed
          </section>
          <section>
            <span className={`${classes["commits-header-results"]}`}>
              Showing results for
            </span>
            <span className={classes["commits-header-results"]}>
              /{owner}/{repo}
            </span>
          </section>
        </div>
      </header>
      <section className={classes["commits-content"]}>
        <Table className={`data-test-table ${classes["commits-table"]}`}>
          <THead>
            <TR>
              <TH className={classes["commits-thead-th"]}>Date Committed</TH>
              <TH className={classes["commits-thead-th"]}>Author</TH>
              <TH className={classes["commits-thead-th"]}>Message</TH>
            </TR>
          </THead>
          <TBody>
            {commits.map(
              ({
                commit: {
                  author: { name, date },
                  message,
                },
                html_url,
              }: GitCommit) => {
                return (
                  <TR key={html_url}>
                    <TD
                      className={`${classes["commits-column"]} ${classes["commits-date"]}`}
                    >
                      {setDateFormat(date)}
                    </TD>
                    <TD
                      className={`${classes["commits-column"]} ${classes["commits-truncate"]} ${classes["commits-name"]}`}
                    >
                      {name}
                    </TD>
                    <TD
                      title={message}
                      className={`${classes["commits-column"]} ${classes["commits-truncate"]} ${classes["commits-message"]}`}
                    >
                      <a
                        className={classes["commits-table-anchor"]}
                        href={html_url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {message}
                      </a>
                    </TD>
                  </TR>
                );
              }
            )}
          </TBody>
        </Table>
      </section>
      <footer className={`${classes["commits-footer"]}`}>
        <button
          type="button"
          onKeyUp={onLoadMoreKeyUp}
          className={`${classes["commits-button"]} ${
            !isButtonDisabled
              ? classes["commits-load-more"]
              : classes["commits-button-disabled"]
          }`}
          onClick={onLoadMoreClick}
        >
          Load More
        </button>
        <button
          type="button"
          onKeyUp={onSearchKeyUp}
          className={`${classes["commits-button"]} ${classes["commits-load-more"]}`}
          onClick={onSearchClick}
        >
          Back to Search
        </button>
      </footer>
    </div>
  );
};
