module.exports = function(App) {
    function chineseChess(option){
        return{
            view: require('./view.js')(App),
            controller: require('./controller.js')(App, option)
        }
    }
    chineseChess.navigation = {
        name: App.config.games.chineseChess.name,
        icon: 'home'
    };
    return chineseChess;
};