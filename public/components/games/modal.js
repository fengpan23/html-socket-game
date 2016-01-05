module.exports = function (App) {
    var m = App.m;
    var modal = {
        vex: window.vex
    };
    /**
     * @param  option [options.className:'custom className', options.header:'header text', options.component]
     */
    modal.open = function (option) {
        modal.vex.open({
            content: '<header></header></div><div class="mount-root"></div>',
            className: this.vex.defaultOptions.className + " " + option.className,
            afterOpen: function ($vexContent) {
                if (option.header) {
                    var $header = $vexContent.children('header');
                    $header.text(option.header);
                }
                var rootElem = $vexContent.children('.mount-root').get(0);
                var initOption = _.extend({}, option.args || {}, {
                    close: function () {
                        modal.vex.close($vexContent.data().vex.id);
                    }
                });
                if(option.component){
                    m.mount(rootElem, m.component(typeof option.component=== 'string' ? App.Games[option.component](option.game) : option.component, initOption));
                }
            }
        });
    };
    return modal;
};