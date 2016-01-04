module.exports = function(App, ws) {
    var m = App.m;
    return {
        controller: function(){
            return {
                loadComponent: function (name) {
                    return require('./'+ name)(App, ws);
                }
            }
        },
        view: function(ctr){
            return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded', [
                m.component(App.Components['header']),
                m.component(App.Components['navigation']),
                m("MAIN.mdl-layout__content mdl-color--grey-100", [
                    m.component(ctr.loadComponent('tables'))
                ])
            ])
        }
    }
};