module.exports = function (App) {
    var m = App.m;
    return function (ctr) {
        return [m(".login-bg-wrapper",  [
            m(".login-container", [
                m(".login-title", [
                    m("img[id='login-logo'][src='https://cdn.stargt.com.my/wp-content/uploads/2014/07/SGT_Logo.png']")
                ]),
                m("form.login-form[action='#']", [
                    m(".mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label", [
                        m("input.mdl-textfield__input[id='email'][name='email'][type='text']", { onchange: m.withAttr("value", ctr.email), value: ctr.email() }),
                        m("label.mdl-textfield__label mdl-textfield__label--accent[for='email']", "Email")
                    ]),
                    m(".mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label", [
                        m("input.mdl-textfield__input[id='passwd'][name='passwd'][type='password']", {onchange: m.withAttr("value", ctr.passwd), value: ctr.passwd() }),
                        m("label.mdl-textfield__label[for='passwd']","Password")
                    ]),
                    m(".login-submit-field", [
                        m("button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-button--accent", {onclick: ctr.submit.bind(ctr) }, "登录")
                    ])
                ])
            ])
        ])];
    };
};