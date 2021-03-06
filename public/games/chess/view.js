module.exports = function(App) {
    var m = App.m;
    return function(chess) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', [
            m('DIV.demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50', [
                m('nav.demo-navigation mdl-navigation mdl-color--blue-grey-800', [
                    m.component(chess.getComponent('user'))
                ])
            ]),
            m('MAIN.mdl-layout__content mdl-color--grey-100', [
                m('DIV#chessboard', {config: chess.drawBoard})
            ])
        ])
    }
};