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
/**
 * [MVVM boilerplater with webpack-mithriljs-mdl]
 * @type {Object}
 */
var Application = {
    status: null,
    _settings: {},
    m: mithril,
    mdl: {},
    View: {},
    Model: {},
    Component: {},//vm
};
/**
 * 程序入口
 * TODO 判断session 如果没有 signed session 转为 /login
 * @return {[type]} [description]
 */
Application.start = function() {
    this.setUpRoutes();
};
/**
 * 初始化，做一些基础配置,配置后调用start
 */
Application.init = function(config) {
    this.set('config', config);
    this.setUpPath();
    this.setUpComponents();
    return this;
};
/**
 * Setter FN
 */
Application.set = function(key, value, selfAttribute) {
    if (selfAttribute) return this[key] = value;
    this._settings[key] = value;
};
/**
 * Getter FN
 */
Application.get = function(key, selfAttribute) {
    return selfAttribute ? this[key] : this._settings[key] ;
};
/**
 * 程序路径配置
 */
Application.setUpPath = function() {
    this.set('ROOT_PATH', './');
    this.set('COMPONENTS_PATH', this.get('ROOT_PATH') + 'components');
    this.set('VIEW_PATH', this.get('ROOT_PATH') + 'views');
    this.set('MODEL_PATH', this.get('ROOT_PATH') + 'models');
    this.set('UTIL_PATH', this.get('ROOT_PATH') + 'utils');
};
/**
 * 加载基本类，工具，静态样式，Model,View,Components(Mithril)
 */
Application.setUpComponents = function() {
    this.loadUtils();
    this.loadStylesheets();
    this.loadModels(this.get('MODEL_PATH'));
    this.loadViews(this.get('VIEW_PATH'));
    this.loadComponents(this.get('COMPONENTS_PATH'));
};

//setUpRoutes routes here
Application.setUpRoutes = function() {
    this.m.route.mode = 'hash';

    this.m.route(document.getElementById('container'), "/", {
        "/": this.Component.get('home'),
        "/home": this.Component.get('home')
    });
    // the bug may disappear when we use like this
    // when we use route,it has a history dom from the last page
    // this.m.route('/login')
};
/**
 * 如果Component的_selfView 为 true的情况下
 * 根据Components在views目录下的同名目录自动挂载view对象到component下，
 */
Application.setUpViews = function() {
    var Components = this.get('Component', true).getModules();
    var Views = this.get('View', true).getViews();
    for (var key in Components) {
        if (!Components._selfView && Views[key])Components[key].view = Views[key];
    }
};
/**
 * 加载各种工具类
 * 某些工具挂载到window下
 */
//if do not `have to`, we should not use it
//but at now,it can improve our development-speed
//because some module dep on jq,and we need them now
//one day they will be replaced by other no-dep modules
Application.loadUtils = function() {
    //here we can set some global utils such as _,$
    //but global is Hulk
    //window._ = require('lodash');//underscore
    //window.$ = require('jquery/dist/jquery.min.js');//$
    //window.Chart = require('chart.js');
    //window.moment = require('moment');

    //other utils we defined in /utils/
    this.set('Util', require(this.get('UTIL_PATH') + '/index.js')(this), true);
};
/**
 * 加载Components,挂载到Application.Component下
 */
Application.loadComponents = function(path) {
    this.set('Component', require(path + '/index.js')(this), true);
    this.setUpModels();
    this.setUpViews();
};
/**
 * 加载所有自定义样式css
 */
Application.loadStylesheets = function(path) {

};
/**
 * 加载所有view组件挂载到Application.View下
 */
Application.loadViews = function(path) {
    this.set('View', require(path + '/index.js')(this), true);
};
/**
 * 加载所有view组件挂载到Application.Model下
 * @note 同级Model不要相互依赖
 */
Application.loadModels = function(path) {
    this.set('Model', require(path + '/index.js')(this), true);
};
//Abandoned
Application.getModel = function() {
    return this._models;
};

Application.getRoute = function() {
    return this._routes;
};

Application.getView = function() {
    return this._views;
};

Application.setUpModels = function() {
    // var Components = this.Component.getModules();
    // var Models = this.get('Model', true).getModels();

    // for (var key in Components) {
    // 	Models[key] ?
    // 	Components[key].model = Models[key] :
    // 	Components[key].model = 'NO_IMPLEMNTION';
    // }
};

module.exports = Application;