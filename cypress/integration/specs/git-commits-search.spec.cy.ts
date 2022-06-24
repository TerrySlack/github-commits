//This is spec file, inside your google-search.spec.ts

import { GithubCommitsSearch } from "../../page-objects/git-commits-search.page";
const search = new GithubCommitsSearch();

/*  I wanted to test the displaying of commits from a repo, using cypress-pipe
However, there is an issue open for the plugin for cypress 10.X.
Running this test will always take you to the NotFound route.
I setup a test below to test for that.

describe("GitHub Commits Request", () => {
  it("GitHub Commits", () => {
    cy.visit("localhost:3000");
    
    search.owner().type("facebook").should("have.value", "facebook");
    search.repo().type("react").should("have.value", "react");

    search.searchBtn().click({ force: true });
    search.searchResults().should("be.visible");
  });
});
*/
describe("Attempting a GitHub Commits Request, without providing an owner and repository name", () => {
  it("GitHub Commits", () => {
    cy.visit("localhost:3000");

    //Test for a click without entering data.  Should be redirected to the not found route
    cy.get(".data-test-button").should("be.visible").click({ force: true });

    //This is what should be displayed in the not found route
    cy.get(".data-test-invalid")
      .should("be.visible")
      .contains(
        "Looks like we have an invalid URL or you forgot to enter a repository owner and/or name"
      );
  });
});
