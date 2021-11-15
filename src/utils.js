const core = require('@actions/core');
const github = require('@actions/github');

const sprintDurationDays = parseInt(core.getInput('sprint-duration-days'));
const repoToken = core.getInput('repo-token');
const octokit = github.getOctokit(repoToken);
const context = github.context;

// const time = (new Date()).toTimeString();
const sprintEndDate = new Date();
const sprintStartDate = new Date();
sprintStartDate.setDate(sprintEndDate.getDate() - sprintDurationDays);
const sprintReportDate = `[${sprintStartDate.getMonth() + 1}/${sprintStartDate.getDate()}/${sprintStartDate.getFullYear()}]`;

const getPullRequests = async (sinceDate) => {
  const pulls = await octokit.rest.pulls.list({
    ...context.repo
  });

  // .filter(pull =>  sinceDate <= new Date(pull.created_at))
  const formattedPulls = pulls.data
    .reduce((pullDataset, pullItem) => {
      const pullData = {...pullDataset};

      if(!Object.keys(pullData).includes(pullItem.state)) {
          pullData[pullItem.state] = []
      }
      pullData[pullItem.state].push(pullItem);

      return pullData;
  }, {});

  return formattedPulls;
};

const getIssuesByState = async (sinceDate) => {
  console.log("context repo")
  console.log(sinceDate)
  console.log(JSON.stringify(context.repo))
  let page = 1

  const issues = await paginatedFetch(
    octokit.rest.issues.listForRepo,
    {...context.repo, since: sinceDate, page: page}
  )

  // .filter(pull =>  sinceDate <= new Date(pull.created_at))
  console.log(JSON.stringify(issues))
   

  return groupBy(issues.data), "state";
};


const getRepository = async () => octokit.rest.repos.get({
    ...context.repo
  });

const createIssue = ({ title, body }) => 
  octokit.rest.issues.create({
    ...context.repo,
    title,
    body
  });

const paginatedFetch = (endpoint, params) =>
  endpoint({
    ...params
  })

const groupBy = (xs, key) =>
  xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

// ========================== exports =========================== //

module.exports = {
  sprintReportDate,
  sprintStartDate,
  createIssue,
  getIssues,
  getPullRequests,
  getRepository,
}