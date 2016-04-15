module.exports = function(App, Opts) {
    var m = App.m, timeout;
    return function(){
        var client = App.Util.get('engine'), t;
        m.redraw.strategy("diff");
        function redraw(data){
            var user = data;
            if(data['user'])user = data['user'];
            if(user.seatindex){
                _.extend(_.findWhere(domino.seats, {sid: user.seatindex}), _.pick(user, 'name', 'point'));
            }else {
                for (var id in user) {
                    _.extend(_.findWhere(domino.seats, {sid: user[id].seatindex}), _.pick(user[id], 'name', 'buy'));
                }
            }
            m.redraw();
        }

        client.init(Opts);
        client.on('init', function (data) {
            timeout = data.game.operatetime;
            t = setInterval(function () {
                domino.timeout--;
                m.redraw();
                domino.timeout === 0 && clearInterval(t);
            }, 1000);

            data.users && redraw(data.users);
        });
        client.on('userjoin', redraw);
        client.on('broadcast_userjoin', redraw);
        client.on('broadcast_blinds', function (data) {
            for(var key in data.game){
                let sid =  data.game[key].seatindex;
                if(sid){
                    _.extend(_.findWhere(domino.seats, {sid: sid}), _.pick(data.game[key], 'betstake', 'point'));
                }else{
                    domino.followVal(data.game[key][domino.sid] || 0);
                    domino.betVal(domino.followVal() * 2);
                }
            }
            m.redraw();
        });
        client.on('cards', function (data) {
            _.extend(_.findWhere(domino.seats, {sid: domino.sid}), _.pick(data.user, 'cards', 'cardvalues'));
            m.redraw();
        });
        client.on('broadcast_cards', function (data) {
            data.seatindex.forEach(function (id) {
                var user = _.findWhere(domino.seats, {sid: id});
                user.cardsnum = (user.cardsnum || 0) + data.cardsnum;
            });
            m.redraw();
        });

        var interval;
        client.on('nextuser', function (data) {
            clearInterval(interval);
            _.each(domino.seats, function(seat){seat.timeout = 0;});
            domino.operate = _.omit(data.user.operate, 'change');
            domino.timeout = timeout;
            interval = setInterval(function(){
                if(domino.timeout < 1){
                    domino.operate = {};
                    return clearInterval(interval);
                }
                domino.timeout -= 1;
                m.redraw();
            }, 1000);
            m.redraw();
        });
        client.on('broadcast_nextuser', function (data) {
            clearInterval(interval);
            var nid = data.game.nextplayer;
            var user = _.findWhere(domino.seats, {sid: nid});
            user.timeout = timeout;
            m.redraw();
        });
        
        client.on('change', function (data) {
            var user = _.findWhere(domino.seats, {sid: domino.sid});
            user.cardvalues = data.user.cardvalues;
            m.redraw();
        });

        client.on('broadcast_pass', function (data) {
            var user = _.findWhere(domino.seats, {sid: data.game.seatindex});
            user.timeout = 0;
            m.redraw();
        });
        client.on('broadcast_bet', function (data) {
            var user = _.findWhere(domino.seats, {sid: data.user.seatindex});
            user.betstake = data.user.bettotal;
            user.point = data.user.point;
            var val = data.game.prompt[domino.sid] || 0;
            domino.followVal(val);
            domino.betVal(val * 2);
            m.redraw();
        });

        client.on('broadcast_pools', function(data){
            domino.pools = [];
            data.game.forEach(function (pool) {
                domino.pools.push(_.pick(pool, 'point'));
            });
            domino.seats.forEach(function(seat){
                seat.betstake = 0;
            });
        });

        client.on('broadcast_fold', function (data) {
            var user = _.findWhere(domino.seats, {sid: data.seatindex});
            delete user.cardsnum;
            delete user.cards;
            delete user.cardvalues;
            delete user.timeout;
            m.redraw();
        });

        client.on('broadcast_confirm', function (data) {
            var user = _.findWhere(domino.seats, {sid: data.game.seatindex});
            user.timeout = 0;
        });
        
        client.on('broadcast_billing', function (data) {
            for(var sid in data.users){
                _.extend(_.findWhere(domino.seats, {sid: sid}), _.pick(data.users[sid], 'cards', 'cardvalues', 'type'));
            }
        });
        
        client.on('broadcast_over', function (data) {
            console.log('over data: ', data);
            domino.seats.forEach(function (seat) {
                seat.cardsnum = 0;
                seat.timeout = 0;
            });
        });

        var domino = {
            sid: 0,
            timeout: 15,    //choose seat timeout
            operate: {},
            betVal: m.prop(),
            followVal: m.prop(),
            pools: [],
            seats: [{sid: 1}, {sid: 2}, {sid: 3}, {sid: 4}, {sid: 5}, {sid: 6}, {sid: 7}],
            bets: [{name: '1 pot', value: 20}, {name: '2 pot', value: 40}, {name: 'All In', value: 100}]
        };

        domino.seat = function (e) {
            clearInterval(t);
            domino.sid = +e.target.id;
            console.log('domino sid: ', domino.sid);
            client.send('userjoin', {seatindex: +e.target.id, buy: 2000});
        };

        domino.leave = function () {
            //TODO close the game socket
            m.route('/home');
        };

        domino.change = function () {
            var user = _.findWhere(domino.seats, {sid: domino.sid});
            var temp = user.cards[0];
            for(var i = 1; i < user.cards.length; i++){
                user.cards[i-1] =  user.cards[i];
            }
            user.cards[i-1] = temp;
            client.send('change', {cards: user.cards});
        };

        domino.confirm = function () {
            var cards = _.findWhere(domino.seats, {sid: domino.sid}).cards;
            client.send('confirm', {cards: cards});
        };

        domino.pass = function () {
            client.send('pass');
        };

        domino.follow = function () {
            client.send('bet', {betstake: domino.followVal()});
        };

        domino.bet = function () {
            client.send('bet', {betstake: domino.betVal()});
        };

        domino.fold = function () {
            client.send('fold');
        };

        domino.catch = function () {
            //表完态  清除倒计时 时间
            console.log('catch click !!!');
            domino.operate = {};
        };
        
        return domino;
    }
};