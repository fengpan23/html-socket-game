module.exports = function(App) {
    return {
        view: require('./view.js')(App),
        controller: require('./controller.js')(App)
    }
}