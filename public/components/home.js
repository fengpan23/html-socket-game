module.exports = function(App) {
    //a sample module
    var Home = {
        _selfView: false
    };
    //For develeopment,we auto login
    //每次刷新都请求登陆一次，让server保存session
    //方便我们后续请求api
    //等项目完善后移除
    App.Model.get('session').login('wptad@tom.com', 'goyootad123');

    Home.controller = function() {

        var vm = {
            _chartClickStyles: {
                label: "clicks",
                fillColor: "rgba(63,81,181,1)",
                strokeColor: "rgba(63,81,181,1)",
                pointColor: "rgba(63,81,181,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(63,81,181,1)"
            },
            _chartViewStyles: {
                label: "views",
                fillColor: "rgba(255,85,85,1)",
                strokeColor: "rgba(255,85,85,1)",
                pointColor: "rgba(255,85,85,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,85,85,1)",
            }
        };
        //TODO
        vm.getTitle = function() {
            return model.getTitle();
        };
        //TODO
        vm.getWords = function() {
            return model.getWords();
        };

        vm.drawChart = function(el) {
            var items = [];
            var type = /view/.test(el.className) ? 'view' : 'click';
            var style = (type === 'view') ? vm._chartViewStyles : vm._chartClickStyles;

            if (App.Util.get('cache').cached('statRecentWeek')) {
                items = App.Util.get('cache').get('statRecentWeek');
                var datas = [];
                var labels = [];
                var datasets = [];
                items.forEach(function(item, index) {
                    labels.push(moment().subtract(index, 'days').format('MM-DD'));
                    datas.push(item[type]);

                });

                datasets.push(_.merge({data: datas}, style));

                var myChart = el.getContext('2d');
                var myLineChart = new Chart(myChart).Bar({
                    labels: labels,
                    datasets: datasets
                }, {
                    scaleShowGridLines: true,
                    scaleStartValue: 0,
                    barValueSpacing : 15
                });
            }

        };


        return vm;
    };
    return Home;
};