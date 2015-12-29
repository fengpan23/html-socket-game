module.exports = function(App) {
    var m = App.m;
    return function(chess) {
        return m('DIV.demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', {config: 122}, [
            m.component(App.Components['header']),
            m('MAIN', [
                m('DIV.mdl-button mdl-js-button mdl-button--raised mdl-button--colored', {onclick: chess.ready}, '准备'),
                m('DIV.chinese-chess-chessboard', chess.flash().map(function (c, p) {
                    console.log('c', c, ' p', p);

                    return m('span', {class: c, style: {top: p.y, left: p.x}})
                }))
            ])
        ])
    }
};
//<!-- Colored raised button -->
//<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
//    Button
//    </button>
//        <!-- Accent-colored raised button -->
//    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
//    Button
//    </button>
//        <!-- Accent-colored raised button with ripple -->
//    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
//    Button
//    </button>