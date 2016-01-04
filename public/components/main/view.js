module.exports = function(App) {
    var m = App.m;
    return function() {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded', [
            m.component(App.Components['header']),
            m.component(App.Components['navigation']),
            m("main.mdl-layout__content mdl-color--grey-100", [

            ])
        ])
    }
};