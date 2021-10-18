const core = require('@actions/core');
const github = require('@actions/github');

try {
  const sprintDurationDays = core.getInput('sprint-duration-days');
  const repoToken = core.getInput('repo-token');
  const octokit = github.getOctokit(repoToken);
  const context = github.context;

  const time = (new Date()).toTimeString();

  const frequency = await octokit.rest.repos.getCodeFrequencyStats({
    ...context.repo
  });

  console.log('------------------------------------');
  console.log(frequency);
  console.log('------------------------------------');
} catch (error) {
  core.setFailed(error.message);
}
