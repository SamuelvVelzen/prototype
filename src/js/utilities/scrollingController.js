var scrollingController = (function() {
    var _scrollingBottom, _scrollingTop;

    _scrollingBottom = function(el) {
        var bottom = el.scrollHeight;

        window.scrollTo({
            top: bottom,
            behavior: 'smooth'
        });
    };

    _scrollingTop = function(el) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return {
        scrollingBottom: _scrollingBottom,
        scrollingTop: _scrollingTop
    };
})();
