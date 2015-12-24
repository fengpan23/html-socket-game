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

// console.log(m)
//TODO App.model App.route App.view
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
	Application.setUpRoutes();
};
/**
 * 初始化，做一些基础配置,配置后调用start
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
Application.init = function(config) {
	Application.set('config', config);

	Application.set('CONST', require('./config/constants.js'));
	Application.set('PADLocale', require('./config/pickadateLocale.js'));

	Application.setUpPath();

	Application.setUpComponents();
	
	return this;
};
/**
 * Setter FN
 * @param {[type]} key           [description]
 * @param {[type]} value         [description]
 * @param {[type]} selfAttribute [description]
 */
Application.set = function(key, value, selfAttribute) {
	if (selfAttribute) return this[key] = value;
	this._settings[key] = value;
};
/**
 * Getter FN
 * @param  {[type]} key           [description]
 * @param  {[type]} selfAttribute [description]
 * @return {[type]}               [description]
 */
Application.get = function(key, selfAttribute) {
	return selfAttribute ?
		this[key] :
		this._settings[key] ; 
};
/**
 * 程序路径配置
 * configure basic paths 
 */
Application.setUpPath = function() {
	this.set('ROOT_PATH', './');
	this.set('COMPONENTS_PATH', this.get('ROOT_PATH') + 'components');
	this.set('VIEW_PATH', this.get('ROOT_PATH') + 'views');
	this.set('MODEL_PATH', this.get('ROOT_PATH') + 'models');
	this.set('UTIL_PATH', this.get('ROOT_PATH') + 'utils');
	this.set('PUBLIC_PATH', this.get('ROOT_PATH') + 'assets');
};
/**
 * 加载基本类，工具，静态样式，Model,View,Components(Mithril)
 */
Application.setUpComponents = function() {
	Application.loadUtils();
	Application.loadStylesheets();
	Application.loadModels(this.get('MODEL_PATH'));
	Application.loadViews(this.get('VIEW_PATH'));
	Application.loadComponents(this.get('COMPONENTS_PATH'));
};

//setUpRoutes routes here
Application.setUpRoutes = function() {
	this.m.route.mode = 'hash';

	this.m.route(document.getElementById('container'), "/", {
		"/": this.Component.get('home'),
		"/home": this.Component.get('home'),
		"/login": this.Component.get('login'),
		"/pub": this.Component.get('publisher'),
		"/agent": this.Component.get('agent'),
		"/slot": this.Component.get('slot'),
		"/adv": this.Component.get('advertisers'),
		"/dsp": this.Component.get('dsp'),
		"/dspTemplate": this.Component.get('dspTemplate'),
		"/admin": this.Component.get('admin')
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
		if (!Components._selfView && Views[key]) 
			Components[key].view = Views[key]; 
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
	window._ = require('lodash');//underscore
	window.$ = require('jquery/dist/jquery.min.js');//$
	window.Chart = require('chart.js');
	window.moment = require('moment');

	//for date picker
	require('./hackLibs/pickadate/classic.css');
	require('./hackLibs/pickadate/classic.date.css');
	require('./hackLibs/pickadate/rtl.css');
	require('./hackLibs/pickadate/picker.date.js');

	//dragular
	require('dragula/dist/dragula.min.css');
	window.dragula = require('dragula');
	//vex  a dialog module,
	//SIMPLEMODAL for bak
	//window.vex = require('vex/js/vex.combined.min.js');
	window.vex = require('vex/js/vex.js');
	window.vex.dialog = require('vex/js/vex.dialog.js');
	window.vex.defaultOptions.className = 'vex-theme-plain';
	require('vex/css/vex.css');
	require('vex/css/vex-theme-plain.css');
	//require('vex/css/vex-theme-flat-attack.css');
	//other utils we defined in /utils/
	Application.set('Util', 
			require(Application.get('UTIL_PATH') + '/index.js')(this), 
			true);
};
/**
 * 加载Components,挂载到Application.Component下
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
Application.loadComponents = function(path) {
	Application.set('Component', require(path + '/index.js')(this), true);
	Application.setUpModels();
	Application.setUpViews();
};
/**
 * 加载所有自定义样式css
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
Application.loadStylesheets = function(path) {
	require('material-design-lite/material.min.blue_theme.css');
	//for mdl dom update
	this.mdl = require('exports?componentHandler&MaterialRipple!material-design-lite/material.js');
	require(this.get('PUBLIC_PATH') + '/style/font.css');
	require(this.get('PUBLIC_PATH') + '/style/basic.css');
	require(this.get('PUBLIC_PATH') + '/style/header_nav.css');
	require(this.get('PUBLIC_PATH') + '/style/home.css');
	require(this.get('PUBLIC_PATH') + '/style/login.css');
	require(this.get('PUBLIC_PATH') + '/style/agent.css');
	require(this.get('PUBLIC_PATH') + '/style/modal.css');
	require(this.get('PUBLIC_PATH') + '/style/dsp.css');
	require(this.get('PUBLIC_PATH') + '/style/admin.css');
	require(this.get('PUBLIC_PATH') + '/style/slotInfo.css');
};
/**
 * 加载所有view组件挂载到Application.View下
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
Application.loadViews = function(path) {
	Application.set('View', 
			require(path + '/index.js')(this), 
			true);
};
/**
 * 加载所有view组件挂载到Application.Model下
 * @note 同级Model不要相互依赖
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
Application.loadModels = function(path) {
	Application.set('Model', 
			require(path + '/index.js')(this),
			true);
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