module.exports = function(App) {
    var m = App.m;
    return function(ctr) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', [
            m('DIV.demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50', [
                m('nav.demo-navigation mdl-navigation mdl-color--blue-grey-800',
                    ctr.users.map(function (user) {
                        return  m('DIV.demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop',
                            m('DIV.mdl-card__title mdl-card--expand mdl-color--teal-300',[
                                m('IMG.demo-avatar', {src: "/styles/img/head_1.jpg"}),
                                m('H2.mdl-card__title-text', user.name),
                                m('H2.mdl-card__title-text', user.point)
                            ])
                        )
                    })
                )
            ]),
            m('MAIN.mdl-layout__content mdl-color--grey-100', [
                m('DIV.choose-seat', {style: {display: ctr.display}}, [
                    m('DIV.timeout', ctr.timeout),
                    m('LABEL.mdl-radio mdl-js-radio mdl-js-ripple-effect', {for: 'option-1'}, [
                        m('INPUT#option-1.mdl-radio__button', {type: 'radio', value: 'red', name:'options'}),
                        m('SPAN.mdl-radio__label', 'red')
                    ]),
                    m('LABEL.mdl-radio mdl-js-radio mdl-js-ripple-effect', {for: 'option-2'}, [
                        m('INPUT#option-2.mdl-radio__button', {type: 'radio', value: 'black', name:'options'}),
                        m('SPAN.mdl-radio__label', 'black')
                    ]),
                    m('DIV.mdl-button mdl-js-button mdl-button--raised mdl-button--colored game-btn', {onclick: ctr.ready}, '准备')
                ]),
                m('DIV.chinese-chess-chessboard', {onclick: ctr.clickBoard}, ctr.chessman.map(function (v) {
                    return m('span.base-st', {onclick: ctr.clickChess, id: v[2], class: v[0], style: {left: v[1].x + 'px', top: v[1].y + 'px', backgroundSize: '80px'}})
                }))
            ])
        ])
    }
};