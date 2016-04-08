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

        client.on('userjoin', redraw);
        client.on('broadcast_userjoin', redraw);
        client.on('broadcast_blinds', function (data) {
            for(var key in data.game){
                let sid =  data.game[key].seatindex;
                if(sid){
                    _.extend(_.findWhere(domino.seats, {sid: sid}), _.pick(data.game[key], 'betstake'));
                }else{
                    domino.bet = data.game[key][domino.sid] || 0;
                }
            }
            m.redraw();
        });
        client.on('cards', function (data) {
            _.extend(_.findWhere(domino.seats, {sid: domino.sid}), _.pick(data.user, 'cards', 'cardvalues'));
            m.redraw();
        });
        client.on('broadcast_cards', function (data) {
            var index = _.findIndex(domino.seats, {sid: data.game.seatindex});
            domino.seats[index].cardsnum = (domino.seats[index].cardsnum || 0) + data.game.cardsnum;
            m.redraw();
        });
        client.on('nextuser', function (data) {
            domino.operate = data.user.operate;
            m.redraw();
        });
        
        client.on('change', function (data) {
            var user = _.findWhere(domino.seats, {sid: domino.sid});
            user.cardvalues = data.user.cardvalues;
            m.redraw();
        });


        client.on("pass", function () {
            
        });
        client.on("broadcast_pass", function () {

        });
        client.on("broadcast_bet", function (data) {
            console.log('on bet data: ', data);
        });

        client.on("broadcast_fold", function (data) {
            console.log('fold data: ', data);
        });

        var domino = {
            sid: 0,
            timeout: 15,
            operate: {},
            seats: [{sid: 1}, {sid: 2}, {sid: 3}, {sid: 4}, {sid: 5}, {sid: 6}, {sid: 7}]
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
            
        };

        domino.pass = function () {

        };
        
        domino.follow = function () {
            client.send('bet', {betstake: domino.bet});
        };
        
        domino.fold = function () {
            client.send('fold');
        };
        
        domino.bet = function () {
            
        };
        
        return domino;
    }
};