//git-commits-search.page.ts file.
/// <reference types="cypress" />
export class GithubCommitsSearch {
  owner() {
    return cy.get('input[name="owner"]').should("be.visible");
  }
  repo() {
    return cy.get('input[name="repo"]').should("be.visible");
  }
  searchBtn() {
    return cy.get(".data-test-button").should("be.visible");
  }
  searchResults() {
    return cy.get(".data-test-table").should("be.visible");
  }
}
