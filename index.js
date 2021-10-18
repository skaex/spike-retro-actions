const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const sprintDurationDays = core.getInput('sprint-duration-days');
  const repoToken = core.getInput('repo-token');
  const octokit = github.getOctokit(repoToken);
  const context = github.context;

  const time = (new Date()).toTimeString();

  const codeFrequency = await octokit.rest.repos.getCodeFrequencyStats({
    ...context.repo
  });

  console.log('------------------------------------');
  console.log(codeFrequency);
  console.log('------------------------------------');
  const participationFrequency = await octokit.rest.repos.getParticipationStats({
    ...context.repo
  });
  console.log('------------------------------------');
  console.log(participationFrequency);
  console.log('------------------------------------');
}

try {
  run();
 } catch (error) {
  core.setFailed(error.message);
}
