module.exports = function(App) {
    function chineseChess(option){
        return{
            view: require('./view.js')(App),
            controller: require('./controller.js')(App, option)
        }
    }
    chineseChess.navigation = {
        name: '中国象棋',
        icon: 'home'
    };
    return chineseChess;
};