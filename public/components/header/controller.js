module.exports = function(Application) {
    return function (args) {

        this.currentPage = args.current;

        this.gotoPage = function (num) {
            var totalPage = Math.ceil(args.total / 10);
            if (num >= 1 && num <= totalPage) {
                this.currentPage(num);
                args.callback.call(this, this.currentPage(), 10);
            }
        };

        this.prevPage = function () {
            this.gotoPage(this.currentPage() - 1);
        }

        this.nextPage = function () {
            this.gotoPage(this.currentPage() + 1);
        }
    };
};