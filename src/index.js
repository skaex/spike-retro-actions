
const {
  sprintReportDate,
  getPullRequests,
  getRepository,
  createIssue
 } = require('./utils');

async function run() {
  const repository = await getRepository();
  const issues = await getIssues();
  const { merged, open, closed } =  await getPullRequests(sprintReportDate);

  const body = `
  # Team Retrospective - ${sprintReportDate}
  A retrospective is a way to learn from experience. It's an opportunity for a team to take a step back and reflect on how things are going, and to create a plan for itself to refine and improve for the future. This was issue was automatically created to remind the team to take time to reflect, and to provide guidance for the conversation.
  
  **Remember that retrospectives are blameless. Focus on what you can learn and improve upon for next time.**
  
  ## Insights
  * ${merged && merged.length ? merged.length : 0} Merged pull requests since ${sprintReportDate}
  * ${open && open.length ? open.length : 0} Open pull requests since ${sprintReportDate}
  * [1] Closed issues since ${sprintReportDate}
  * [1] New issues since ${sprintReportDate}
  
  Excluding merges, **[1] author** has pushed **[1] commit** to ${repository.default_branch} and **[1] commit** to all branches. On [${repository.default_branch}], **[0] files** have changed and there have been **[0] additions** and **[0] deletions**.
  
  [Profile pics of all contributors]
  
  ## What went well?
  It's important to notice which things went well so we can continue doing them in the future.
  
  ## What could go better?
  Make note of things that were okay, but not great. How could they be improved? And of course, discuss the things that just didn't go right at all. Should we stop doing this altogether? Is it expected to improve itself, and we just have to double down and get through it? Can we offset it in some other way?
  
  ## What will we commit to improve in the short term?
  The discussion above may reveal a bunch of things we'd like to do. But to ensure that we're not overwhelmed or changing too many things at once, let's pick a couple and then commit to them.
  
  For best results, we'll create specific action items and assign each one to someone on the team.
 `;

  await createIssue({
    title: `Team Retrospective - ${sprintReportDate}`,
    body
  });
}

try {
  run();
 } catch (error) {
  core.setFailed(error.message);
}
