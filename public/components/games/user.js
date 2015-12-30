module.exports = function(App, ws) {
    var m = App.m;
    return {
        controller: function(){
            ws.onUserJoin = function (user) {
                console.log(user)
            }
        },
        view: function(){
            return m('DIV.demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop', {config: 122}, [
                m('DIV.mdl-card__title mdl-card--expand mdl-color--teal-300', [
                    m('IMG.demo-avatar', {src: "/styles/img/head_1.jpg"}),
                    m('H2.mdl-card__title-text', 'xxxxxx')
                ]),
                m('DIV.mdl-card__supporting-text mdl-color-text--grey-600')
            ])
        }
    }
};