module.exports = function(Application) {
    return {
        view: require('./view.js')(Application),
        controller: require('./controller.js')
    }
}