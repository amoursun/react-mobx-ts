// node 不需要
if (process.env.NODE_ENV === 'prod') {
  let opts = {}
  require('./config.prod.server').execute({
    sourceMap: opts.sourceMap,
    buildPlanKey: opts.buildPlanKey,
    enableProfiling: opts.enableProfile
  });
} else if (process.env.NODE_ENV === 'dev') {
  require('./config.dev.server')({});
}
