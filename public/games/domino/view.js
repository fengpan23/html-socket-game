module.exports = function(App) {
    var m = App.m;
    return function(ctr) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header', [
            m('MAIN.mdl-layout__content mdl-color--grey-100 domino-table', ctr.seats.map(function (seat) {
                if(seat.name){
                    return m('DIV.domino-user seat-' + seat.sid, [
                        m('SPAN.user-name', seat.name),
                        m('SPAN.user-point', seat.point || seat.buy),
                        m('DIV.user-bet', [m('SPAN.bet-icon'), m('SPAN.bet-number', seat.betstake || 0)]),
                        m('DIV.user-cards', seat.cards ? seat.cards.map(function (card) {
                            return m('img.card', {src: '/games/domino/styles/img/' + card + '.png'});
                        }) : _.times(seat.cardsnum || 0, function () {
                            return m('img.card-bg', {src: '/games/domino/styles/img/card-bg.png'})
                        }))
                    ]);
                }else{
                    return m('DIV.domino-seat seat-' + seat.sid, {onclick: ctr.seat, id: seat.sid});
                }
            }))
        ])
    }
};