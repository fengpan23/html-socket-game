module.exports = function(App) {
    var modal = App.Util.get('modal');
    var m = App.m;

    return {
        controller: function(){
            var gameName = m.route.param('gameName');
            return {
                getTableName: function () {
                    return gameName;
                },
                getTableList: function () {
                    //TODO get table list form server
                    var tableMap = {chess: [68, 68, 68, 68, 68], mahjong: [70, 70, 70, 70]}
                    return tableMap[gameName];
                },
                getSeat: function () {
                    return [{id: 1, className: 'seat-top'}, {id: 2, className: 'seat-bottom'}];
                },
                openTable: function(e){
                    modal.open({
                        game: {tableID: e.target.id, gameName: gameName},
                        component: gameName,
                        className: gameName
                    });
                }
            }
        },
        view: function(ctr){
            return m('DIV.table-list', ctr.getTableList().map(function (tableID) {
                    return m('DIV.table-item ' + ctr.getTableName() + '-table', [
                        m('DIV.table-board', {id: tableID, onclick: ctr.openTable}),
                        ctr.getSeat().map(function (seat) {
                            return m('DIV.table-seat', seat);
                        })
                    ]);
                })
            )
        }
    }
};