var scrollingController = (function() {
    var _scrollingBottom, _scrollingTop;

    _scrollingBottom = function(el) {
        var bottom = el.scrollHeight;

        window.scrollTo(0, bottom);
    };

    _scrollingTop = function(el) {
        window.scrollTo(0, 0);
    };

    return {
        scrollingBottom: _scrollingBottom,
        scrollingTop: _scrollingTop
    };
})();
