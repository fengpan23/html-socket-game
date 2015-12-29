module.exports = function(App) {
    var m = App.m;
    return function(controler) {
        return m('DIV.demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600 is-casting-shadow', {config: 122}, [
            m('DIV.mdl-layout__header-row')
        ])
    }
};