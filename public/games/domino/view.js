module.exports = function(App) {
    var m = App.m;
    var str = '\<svg width="105px" height="125px" viewbox="0 0 105 125">'
        + '\<path d="M10,0 L95,0 A10,10 0 0 1 105,10 L105,115 A10,10 0 0 1 95,125 L10,125 A10,10 0 0 1 0,115 L0,10 A10,10 0 0 1 10,0" stroke="#FCB03C" stroke-width="4" fill-opacity="0" style="stroke-dasharray: 460, 460; stroke-dashoffset: 460;">'
        + '\</path>'
        + '\</svg>';
    var interval = {};
    var timer = function (sid, time) {
        var $el = $(str);
        var $path = $el.find('path');
        var len = 460;
        interval.id = sid;
        clearInterval(interval.i);
        interval.i = setInterval(function(){
            $path.css('strokeDashoffset', len -= 460/time/100);
            if(len < 0)clearInterval(interval.i);
        }, 10);
        setTimeout(function(){$('.user-timeout').html($el);}, 1000);
    };
    var clear = function (sid) {
        interval.id === sid && clearInterval(interval.i);
    };
    var stopProp = function (e) {
        e.stopPropagation();
        return false;
    };

    return function(ctr) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header',
            m('MAIN.mdl-layout__content mdl-color--grey-100 domino-table', ctr.seats.map(function (seat) {
                if(seat.name){
                    let ma = [];
                    ma.push(m('DIV.user-name', seat.name), m('DIV.user-point', seat.point || seat.buy));
                    seat.betstake && ma.push(m('DIV.user-bet', [m('SPAN.bet-icon'), m('SPAN.bet-number', seat.betstake)]));
                    if(seat.cards) {
                        ma.push(m('DIV.cards', m('DIV.container', m('DIV.cards-content', {onclick: ctr.change}, seat.cards.map(function (card) {
                            return m('img.card', {src: '/games/domino/styles/img/' + card + '.png'});
                        }), m('DIV.cards-values', seat.cardvalues.map(function (value) {return m('SPAN', value);}))))));
                    }
                    seat.cardsnum && ma.push(m('img.card-bk', {src: '/games/domino/styles/img/card-bk-'+ seat.cardsnum +'.png'}));
                    seat.timeout ? ma.push(m('DIV.user-timeout', timer(seat.sid, seat.timeout))) : clear(seat.sid);

                    return m('DIV.domino-user seat-' + seat.sid, {class: seat.sid === ctr.sid ? 'me' : 'user'}, ma);
                }else{
                    return m('DIV.domino-seat seat-' + seat.sid, {onclick: ctr.seat, id: seat.sid});
                }
            }), m('DIV.operate', {onclick: ctr.catch}, [
                    _.pairs(ctr.operate).map(function (op) {
                        return m('BUTTON.mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored operate-btn btn-' + op[0], {
                            disabled: !op[1], onclick: ctr[op[0]]
                        }, [
                            m('SPAN', op[0]),
                            op[0] === 'bet' || op[0] === 'follow' ? m('SPAN.value-' + op[0], '(' + ctr[op[0] + 'Val']() + ')') : ''
                        ]);
                    }),
                    ctr.operate.bet && m('DIV.bet-content', {onclick: stopProp}, [
                        m('DIV.bet-default', ctr.bets.map(function (b) {
                            return m('BUTTON.bet-btn', {onclick: m.withAttr("value", ctr.betVal), value: b.value}, b.name);
                        })),
                        m('DIV.bet-slider', m('INPUT', {type: 'range', min: 0,  max: 100, onchange: m.withAttr("value", ctr.betVal), value: ctr.betVal()})),
                    ])
                ]),
                m('DIV.timeout', {style: {display: _.isEmpty(ctr.operate) ? 'none' : ''}}, m('SPAN.time', ctr.timeout))
            )
        )
    }
};