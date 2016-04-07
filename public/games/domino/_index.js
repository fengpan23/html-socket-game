module.exports = function(Application) {
    function Domino(options){
        return{
            view: require('./view.js')(Application),
            controller: require('./controller.js')(Application, options)
        }
    }
    Domino.navigation = {
        name: 'domino',
        icon: 'home'
    }
    return Domino;
}