module.exports = function(App) {
    var m = App.m;
    return function(controler) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', {config: 122}, [
            m.component(App.Components['header']),
            //App.View.get('navigation'),
            m("main.mdl-layout__content mdl-color--grey-100", [
                // a demo grid
                m(".mdl-grid ssp-home-container", [
                    //three basic cards
                    //调用 revenueRecentWeek/statRecentWeek 缓存
                    //m('.ssp-grid-cell mdl-cell--4-col', [
                    //    m.component(App.Component.get('statCard'), 'revenue')
                    //]),
                    //m('.ssp-grid-cell mdl-cell--4-col', [
                    //    m.component(App.Component.get('statCard'), 'view')
                    //]),
                    //m('.ssp-grid-cell mdl-cell--4-col', [
                    //    m.component(App.Component.get('statCard'), 'click')
                    //]),
                    ////a chart header
                    //m('.ssp-grid-cell mdl-cell--12-col', [
                    //    App.View.get('chartHeader')
                    //]),
                    //our canvas chart
                    //.ssp-canvas-view 来判断画布的类型，进行不同的数据渲染
                    //用到statRecentWeek 缓存
                    //m('.ssp-grid-cell mdl-cell--5-col', [
                    //    m('.ssp-canvas-large.mdl-shadow--4dp', [
                    //        m('canvas.ssp-cavans-view[height=230][width=400]', {
                    //            config: controler.drawChart
                    //        }, '您的浏览器不支持图表画布')
                    //    ])
                    //]),
                    //m('.ssp-grid-cell mdl-cell--5-col', [
                    //    m('.ssp-canvas-large mdl-shadow--4dp', [
                    //        m('canvas.ssp-cavans-click[height=230][width=400]', {
                    //            config: controler.drawChart
                    //        }, '您的浏览器不支持图表画布')
                    //    ])
                    //]),
                    ////our data table
                    ////查询近一周数据，放入缓存revenueRecentWeek/statRecentWeek
                    //m('.ssp-grid-cell mdl-cell--12-col', [
                    //    m.component(App.Component.get('pubStatTable'))
                    //]),

                ])
            ])
        ])

    }
};