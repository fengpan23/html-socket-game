var mithril = require('mithril');
/* override m.request to provide default cookie authentication */
mithril._request = mithril.request.bind(mithril);
mithril.request = function (option) {
    if (option && !option.config) {
        option.config = function (xhr) {
            xhr.withCredentials = true;
        };
    }
    return mithril._request(option);
};

var Application = {
    m: mithril,
    Util: {},
    Components: {}
};
/**
 * 初始化，做一些基础配置, 加载模块后调用start
 */
Application.init = function(config) {
    this.loadUtils();
    this.loadStylesheets();
    this.loadComponents();
    return this;
};

/**
 * 程序入口
 */
Application.start = function() {
    this.setUpRoutes();
};

Application.setUpRoutes = function() {
    this.m.route.mode = 'hash';
    this.m.route(document.getElementById('container'), "/", {
        "/": Application.Components['main'],
        "/home": Application.Components['main'],
        "/games/chess": Application.Components['games_chess'],
        "/games/chineseChess": Application.Components['games_chineseChess']
    });
};

Application.loadComponents = function () {
    var components = [
        'main',
        'header',
        'navigation',
        'games_chess',
        'games_chineseChess'
    ];
    components.forEach(function(com) {
        Application.Components[com] = require('./components/' + com.split('_').join('/') + '/_index.js')(Application);
    });
};

Application.loadUtils = function() {
    //here we can set some global utils such as _,$
    //window._ = require('lodash');//underscore

    //other utils we defined in /utils/
    var UTIL_PATH = './utils'
    this.Util = require(UTIL_PATH + '/_index.js')(this);
};

Application.loadStylesheets = function() {
    var STYLE_PATH = './styles/';
    require(STYLE_PATH + 'css/material.min.css');
    require(STYLE_PATH + 'css/styles.css');
    require(STYLE_PATH + 'chess/main.css');
    require(STYLE_PATH + 'chineseChess/main.css');
};
module.exports = Application;