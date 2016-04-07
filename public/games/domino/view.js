module.exports = function(App) {
    var m = App.m;
    return function(ctr) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header', [
            m('MAIN.mdl-layout__content mdl-color--grey-100 domino-table', ctr.seats.map(function (seat) {
                if(seat.name){
                    return m('DIV.domino-user seat-' + seat.sid, [
                        m('SPAN.user-name', seat.name),
                        m('SPAN.user-point', seat.point),
                        m('DIV.user-bet', seat.bet || 0)
                ]);
                }else{
                    return m('DIV.domino-seat seat-' + seat.sid, {onclick: ctr.seat, id: seat.sid});
                }
            }))
        ])
    }
};