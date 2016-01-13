module.exports = function(App) {
    var m = App.m;

    return function() {

        function loadNavigation(){
            var nav = [];
            for(var game in App.Games){
                var n = App.Games[game].navigation;
                nav.push(m("a#submenu.mdl-navigation__link[href='/games/"+ game +"']", {config: m.route}, [m("i.material-icons[role='presentation']", n.icon), n.name]));
            }
            return nav;
        }

        return m('DIV.demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50', [
            m('HEADER.demo-drawer-header'),
            m('nav.demo-navigation mdl-navigation mdl-color--blue-grey-800', loadNavigation())
        ]);
    }
};