
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
    Components: {},
    Games: {}
};
/**
 * 初始化，做一些基础配置, 加载模块后调用start
 */
Application.init = function(config) {
    Application.config = config;
    this.loadUtils();
    this.loadStylesheets();
    this.loadComponents();
    this.loadGames();
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
        "/": Application.Components['login'],
        "/login": Application.Components['login'],
        "/home": Application.Components['main'],
        "/games/:gameName": Application.Components['room']
    });
    if(!Application.session){
        this.m.route('/login');
    }
};

Application.loadComponents = function () {
    var components = [
        'main',
        'login',
        'header',
        'navigation',
        'room'
    ];
    components.forEach(function(com) {
        Application.Components[com] = require('./components/' + com + '/_index.js')(Application);
    });
};

Application.loadGames = function () {
    var games = [
        'chess',
        'chineseChess'
    ];
    games.forEach(function(game) {
        Application.Games[game] = require('./components/games/' + game + '/_index.js')(Application);
    });
};

Application.loadUtils = function() {
    //here we can set some global utils such as _,$
    window._ = require('underscore'); //underscore
    window.$ = require('jquery/dist/jquery.js');//$

    window.vex = require('vex/js/vex.js');
    window.vex.defaultOptions.className = 'vex-theme-plain';
    require('vex/css/vex.css');
    require('vex/css/vex-theme-plain.css');

    //other utils we defined in /utils/
    var UTIL_PATH = './utils'
    this.Util = require(UTIL_PATH + '/_index.js')(this);
};

Application.loadStylesheets = function() {
    var STYLE_PATH = './styles/';
    require(STYLE_PATH + 'css/material.min.css');
    require(STYLE_PATH + 'css/main.css');
    require(STYLE_PATH + 'css/styles.css');
    require(STYLE_PATH + 'css/login.css');

    require(STYLE_PATH + 'chess/main.css');
    require(STYLE_PATH + 'chineseChess/main.css');
};
module.exports = Application;