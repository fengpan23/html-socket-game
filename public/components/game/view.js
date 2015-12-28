module.exports = function(App) {
    var m = App.m;
    return function(controler) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', {config: 122}, [
            m.component(App.Components['header']),
            //App.View.get('navigation'),
            m("main.mdl-layout__content mdl-color--grey-100", [
                // a demo grid
                m(".mdl-grid ssp-home-container", [

                ])
            ])
        ])

    }
};