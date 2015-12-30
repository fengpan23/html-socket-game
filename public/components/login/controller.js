module.exports = function(App) {
    var m = App.m;
    return function () {
        var user = {};
        user.email = m.prop('');
        user.passwd = m.prop('');
        user.submit = function (e) {
            e.preventDefault();
            App.session = user.email()
            m.route('/home');
        };
        return user;
    };
};