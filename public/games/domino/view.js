module.exports = function(App) {
    var m = App.m;
    return function(ctr) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header', [
            m('MAIN.mdl-layout__content mdl-color--grey-100 domino-table', ctr.seats.map(function (seat) {
                if(seat.name){
                    let ma = [];
                    ma.push(m('DIV.user-name', seat.name), m('DIV.user-point', seat.point || seat.buy));
                    seat.betstake && ma.push(m('DIV.user-bet', [m('SPAN.bet-icon'), m('SPAN.bet-number', seat.betstake)]));
                    if(seat.cards) {
                        ma.push(m('DIV.cards', m('DIV.cards-content', {onclick: ctr.change}, seat.cards.map(function (card) {
                            return m('img.card', {src: '/games/domino/styles/img/' + card + '.png'});
                        })), m('DIV.cards-value', seat.cardvalues)));
                    }
                    seat.cardsnum && ma.push(m('img.card-bk', {src: '/games/domino/styles/img/card-bk-'+ seat.cardsnum +'.png'}));

                    return m('DIV.domino-user seat-' + seat.sid, {class: seat.sid === ctr.sid ? 'me' : 'user'}, ma);
                }else{
                    return m('DIV.domino-seat seat-' + seat.sid, {onclick: ctr.seat, id: seat.sid});
                }
            }), _.pairs(ctr.operate).map(function (op) {
                return m('BUTTON.mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored operate-btn', {disabled: !op[1], onclick: ctr[op[0]]}, op[0]);
            }))
        ])
    }
};