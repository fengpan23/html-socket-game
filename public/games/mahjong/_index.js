module.exports = function(Application) {
     function mahjong(options){
        return{
            view: require('./view.js')(Application),
            controller: require('./controller.js')(Application, options)
        }
    }
    mahjong.navigation = {
        name: '三人麻将',
        icon: 'home'
    }
    return mahjong;
}