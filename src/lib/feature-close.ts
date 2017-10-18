import * as chalk from 'chalk';
import { getBranchPrompt, merge, pushBranchToRemoteAndDelete } from './helpers';
import * as homeConfig from 'home-config';
const config = homeConfig.load('.oneflowrc');

function useDefault(d, value = d) {
  return value;
}

export default async function featureClose(branch, options) {
  branch = await getBranchPrompt(branch);

  merge(
    branch,
    config.BASE_BRANCH,
    !options.ff || config.NO_FF,
    true,
    useDefault(options.rewriteHistory && config.REWRITE_COMMITS, options.rewrite),
    options.interactive
  );

  await pushBranchToRemoteAndDelete(branch, options.forcePush);

  console.log(chalk.blue(`closed feature ${branch} to ${config.BASE_BRANCH}`));
}
