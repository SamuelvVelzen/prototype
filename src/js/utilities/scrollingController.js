var scrollingController = (function() {
    var _scrollingBottom, _scrollingTop, _viewScrolling;

    _scrollingBottom = function(el) {
        var bottom = el.scrollHeight;

        window.scrollTo({
            top: bottom + 106,
            behavior: 'smooth'
        });
    };

    _scrollingTop = function(el) {
        var elTop = el.offsetTop;

        window.scrollTo({
            top: 0 + 106,
            behavior: 'smooth'
        });
    };

    _viewScrolling = function(el, way) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: way
        });
    };

    _elScrolling = function(el) {};

    return {
        scrollingBottom: _scrollingBottom,
        scrollingTop: _scrollingTop,
        viewScrolling: _viewScrolling
    };
})();
