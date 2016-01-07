module.exports = function(App, ws) {
    var m = App.m;
    var modal = require('./modal')(App);
    return {
        controller: function(){
            var gameName = m.route.param('gameName');
            return {
                getTableList: function () {
                    //TODO get table list form server
                    return [68, 68, 68];
                },
                openTable: function(e){
                    modal.open({
                        game: {tableID: e.target.id, gameName: gameName},
                        component: gameName,
                        className: gameName,
                        header: '国际象棋'
                    });
                }
            }
        },
        view: function(ctr){
            return m('DIV.table-list', ctr.getTableList().map(function (tableID) {
                    return m('DIV.demo-card-event mdl-card mdl-shadow--2dp', [
                        m('DIV.mdl-card__title mdl-card--expand', {id: tableID, onclick: ctr.openTable})
                    ]);
                })
            )
        }
    }
};