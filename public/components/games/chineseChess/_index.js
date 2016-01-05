module.exports = function(Application) {
    return function(option){
        return{
            view: require('./view.js')(Application),
            controller: require('./controller.js')(Application, option)
        }
    }
}