module.exports = function(App, ws) {
    var m = App.m;
    var modal = require('./modal')(App);
    return {
        controller: function(){
            var gameName = m.route.param('gameName');
            return {
                getTableList: function () {
                    //TODO get table list form server
                    return [68, 69, 70];
                },
                openTable: function(e){
                    console.log('gameName: ', gameName);
                    modal.open({
                        component: gameName,
                        className: 'userinfo',
                        header: '添加用户'
                    });
                    console.log(e.target.id);
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