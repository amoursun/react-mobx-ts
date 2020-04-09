let opts = {};
require('./config.prod.server').execute({
  sourceMap: opts.sourceMap,
  buildPlanKey: opts.buildPlanKey,
  enableProfiling: opts.enableProfile
})
