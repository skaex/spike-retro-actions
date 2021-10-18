const core = require('@actions/core');
const github = require('@actions/github');



async function run() {
  const sprintDurationDays = parseInt(core.getInput('sprint-duration-days'));
  const repoToken = core.getInput('repo-token');
  const octokit = github.getOctokit(repoToken);
  const context = github.context;

  console.log('----------------------------');
  console.log(context.repo.default_branch);
  console.log('----------------------------');

  const time = (new Date()).toTimeString();

  const sprintEndDate = new Date();
  const sprintStartDate = new Date(new Date().setDate(sprintEndDate.getDate() - sprintDurationDays));
  const sprintReportDate = `[${sprintStartDate.getMonth() + 1}/${sprintStartDate.getDate()}/${sprintStartDate.getFullYear()}]`;


  octokit.rest.issues.create({
    ...context.repo,
    title: `Team Retrospective - ${sprintReportDate}`,
    body: `
# Team Retrospective - ${sprintReportDate}
A retrospective is a way to learn from experience. It's an opportunity for a team to take a step back and reflect on how things are going, and to create a plan for itself to refine and improve for the future. This was issue was automatically created to remind the team to take time to reflect, and to provide guidance for the conversation.

**Remember that retrospectives are blameless. Focus on what you can learn and improve upon for next time.**

## Insights
* [1] Merged pull requests since ${sprintReportDate}
* [1] Open pull requests since ${sprintReportDate}
* [1] Closed issues since ${sprintReportDate}
* [1] New issues since ${sprintReportDate}

Excluding merges, **[1] author** has pushed **[1] commit** to master and **[1] commit** to all branches. On [master], **[0] files** have changed and there have been **[0] additions** and **[0] deletions**.

[Profile pics of all contributors]

## What went well?
It's important to notice which things went well so we can continue doing them in the future.

## What could go better?
Make note of things that were okay, but not great. How could they be improved? And of course, discuss the things that just didn't go right at all. Should we stop doing this altogether? Is it expected to improve itself, and we just have to double down and get through it? Can we offset it in some other way?

## What will we commit to improve in the short term?
The discussion above may reveal a bunch of things we'd like to do. But to ensure that we're not overwhelmed or changing too many things at once, let's pick a couple and then commit to them.

For best results, we'll create specific action items and assign each one to someone on the team.
    `
  });
}

try {
  run();
 } catch (error) {
  core.setFailed(error.message);
}
