module.exports = function(App) {
    var m = App.m;
    return function() {
        return m('DIV.demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50', [
            m('HEADER.demo-drawer-header'),
            m('nav.demo-navigation mdl-navigation mdl-color--blue-grey-800', [
                m("a#submenu.mdl-navigation__link[href='/games/chess']", {config: m.route}, [m("i.material-icons[role='presentation']", "home"),"国际象棋"]),
                m("a#submenu.mdl-navigation__link[href='/games/chineseChess']", {config: m.route}, [m("i.material-icons[role='presentation']", "home"),"中国象棋"])
            ])
        ])
    }
};