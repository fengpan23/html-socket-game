module.exports = function(App) {
    var m = App.m;
    return function(ctr) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', {config: 122}, [
            m('DIV.demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50', [
                m('nav.demo-navigation mdl-navigation mdl-color--blue-grey-800', [
                    //m.component(ctr.getComponent())
                ])
            ]),
            m('MAIN.mdl-layout__content mdl-color--grey-100', [
                m('DIV.choose-seat', [
                    //m('LABLE.mdl-radio mdl-js-radio mdl-js-ripple-effect', {onclick: ctr.ready}, '准备'),
                    m('INPUT.mdl-radio__button', {type: 'radio', value: '1'}, [m('SPAN.radio__label', 'red')]),
                    m('INPUT.mdl-radio__button', {type: 'radio', value: '1'}, [m('SPAN.radio__label', 'black')]),
                    m('DIV.mdl-button mdl-js-button mdl-button--raised mdl-button--colored game-btn', {onclick: ctr.exit}, '确定')
                ]),
                m('DIV.chinese-chess-chessboard', {onclick: ctr.clickBoard}, ctr.chessman.map(function (v) {
                    return m('span.base-st', {onclick: ctr.clickChess, id: v[2], class: v[0], style: {left: v[1].x + 'px', top: v[1].y + 'px', backgroundSize: '80px'}})
                }))
            ])
        ])
    }
};