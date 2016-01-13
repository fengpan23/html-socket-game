module.exports = function(Application) {
    return function(options){
        return{
            view: require('./view.js')(Application),
            controller: require('./controller.js')(Application, options)
        }
    }
}