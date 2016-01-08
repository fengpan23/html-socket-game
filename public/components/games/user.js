module.exports = function(App, engine) {
    var m = App.m;
    return {
        controller: function(){
            return {
                ready: function(){
                    console.log('player ready');
                    engine.join().then(function(){
                        engine.sitDown(1);
                        engine.ready();
                    });
                },
                exit: function(){
                    console.log('player exit');
                }
            }
        },
        view: function(ctr){
            return m('DIV.demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop', [
                m('DIV.mdl-card__title mdl-card--expand mdl-color--teal-300', [
                    m('IMG.demo-avatar', {src: "/styles/img/head_1.jpg"}),
                    m('H2.mdl-card__title-text', 'xxxxxx')
                ]),
                m('DIV.mdl-card__supporting-text mdl-color-text--grey-600', [
                    m('DIV.game-snippet', [
                        m('DIV.mdl-button mdl-js-button mdl-button--raised mdl-button--colored game-btn', {onclick: ctr.ready}, '准备'),
                        m('DIV.mdl-button mdl-js-button mdl-button--raised mdl-button--colored game-btn', {onclick: ctr.exit}, '退出')
                    ])
                ])
            ])
        }
    }
};