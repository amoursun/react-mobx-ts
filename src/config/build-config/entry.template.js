
function start() {
    require('<%= entry %>')
}

if (module.hot) {
    module.hot.accept('<%= entry %>', start)
}

start()
