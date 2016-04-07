module.exports = function(App, Opts) {
    var m = App.m;
    return function(){
        var client = App.Util.get('engine'), t;
        client.on('init', function (data) {
            t = setInterval(function () {
                domino.timeout--;
                m.redraw();
                domino.timeout === 0 && clearInterval(t);
            }, 1000);

            data.users && redraw(data.users);
        });
        client.init(Opts);

        function redraw(data){
            var index, user = data;
            if(data['user'])user = data['user'];
            if(user.seatindex){
                index = _.findLastIndex(domino.seats, {sid: user.seatindex});
                _.extend(domino.seats[index], _.pick(user, 'name', 'point'));
            }else {
                for (var id in user) {
                    index = _.findLastIndex(domino.seats, {sid: user[id].seatindex});
                    _.extend(domino.seats[index], _.pick(user[id], 'name', 'buy'));
                }
            }
            m.redraw();
        }

        function blinds(data){
            var index;
            for(var id in data.game){
                index = _.findLastIndex(domino.seats, {sid: data.game[id].seatindex});
                _.extend(domino.seats[index], _.pick(data.game[id], 'betstake'));
            }
            m.redraw();
        }

        client.on('userjoin', redraw);
        client.on('broadcast_userjoin', redraw);
        client.on('broadcast_blinds', blinds);
        client.on('cards', function (data) {
            console.log('domino.sid: ', domino.sid);
            var index = _.findLastIndex(domino.seats, {sid: domino.sid});
            _.extend(domino.seats[index], _.pick(data.user, 'cards', 'cardvalues'));
            m.redraw();
        });
        client.on('broadcast_cards', function (data) {
            var index = _.findLastIndex(domino.seats, {sid: data.game.seatindex});
            domino.seats[index].cardsnum = (domino.seats[index].cardsnum || 0) + data.game.cardsnum;
            m.redraw();
        });

        var domino = {
            sid: 0,
            timeout: 15,
            seats: [{sid: 1}, {sid: 2}, {sid: 3}, {sid: 4}, {sid: 5}, {sid: 6}, {sid: 7}]
        };

        domino.seat = function (e) {
            clearInterval(t);
            domino.sid = +e.target.id;
            client.send('userjoin', {seatindex: +e.target.id, buy: 2000});
        };

        domino.leave = function () {
            //TODO close the game socket
            m.route('/home');
        };
        return domino;
    }
};