import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env["GIT_API_KEY"],
});

export const getCommits = async (owner: string, repo: string, page?: number) =>
  await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
    owner,
    repo,
    page,
    per_page: 10,
    order: "asc",
  });
