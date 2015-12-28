module.exports = function(App) {
    var m = App.m;
    return function(controler) {
        return m('DIV.demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600', {config: 122}, [
            m(".mdl-layout__header-row", [
                m("span.mdl-layout-title", "头部"),
                m(".mdl-layout-spacer"),
                m(".mdl-textfield.mdl-js-textfield.mdl-textfield--expandable", {config: 1231}, [
                    m("label.mdl-button.mdl-js-button.mdl-button--icon[for='search']", [
                        m("i.material-icons", "account_circle")
                    ]),
                    m(".mdl-textfield__expandable-holder", [
                        m("input.mdl-textfield__input[id='search'][type='text']"),
                        m("label.mdl-textfield__label[for='search']", "Enter your query...")
                    ])
                ]),
                m("button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon[id='hdrbtn']", [
                    m("i.material-icons", "file_download")
                ]),
                m("ul.mdl-menu.mdl-js-menu.mdl-js-ripple-effect.mdl-menu--bottom-right[for='hdrbtn']", {config: 123}, [
                    m("li.mdl-menu__item", "今日报表"),
                    m("li.mdl-menu__item", "本周报表"),
                    m("li.mdl-menu__item", "本月报表"),
                    m("li.mdl-menu__item", "自定义报表")
                ])
            ])
        ])
    }
};