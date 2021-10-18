const core = require('@actions/core');
const github = require('@actions/github');

try {
  // const sprintDurationDays = core.getInput('sprint-duration-days');
  // const repoToken = core.getInput('repo-token');
  // const octokit = github.getOctokit(repoToken);
  // const context = github.context;
  //
  // console.log(`Hello ${sprintDurationDays}`);
  // console.log('------------------------------------');
  // const time = (new Date()).toTimeString();
  //
  // const frequency = octokit.rest.repos.getCodeFrequencyStats({
  //   ...context.repo
  // });
  //
  // console.log('------------------------------------');
  // console.log(frequency);
  // console.log('------------------------------------');
  //
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log('------------------------------------');
  // console.log(`The event payload: ${payload}`);
  console.log('Hello again');
} catch (error) {
//  core.setFailed(error.message);
}


