module.exports = function(App) {
    function chess(options){
        return{
            view: require('./view.js')(App),
            controller: require('./controller.js')(App, options)
        }
    }
    chess.navigation = {
        name: '国际象棋',
        icon: 'home'
    };
    return chess;
}