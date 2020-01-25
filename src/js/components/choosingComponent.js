var choosing = (function(ui, storage) {
    var addEvents, _subjectChoosing, _findParent;

    _findParent = function(path, identifier) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList.contains(identifier)) {
                return path[i];
            }
        }
    };

    _toggleActiveClass = function(subject) {
        var el = document.querySelector(
            '.' + ui.uiStrings.class.filter_item + '.' + subject
        );

        el.classList.toggle('active');
    };

    _toggleInfoCard = function(subject) {
        var el = document.querySelector(
            '.' + ui.uiStrings.class.info_item + '.' + subject
        );

        el.classList.toggle('active');
    };

    _subjectChoosing = function(event) {
        var parent = _findParent(event.path, ui.uiStrings.class.filter_item),
            subject;

        switch (parent.innerText) {
            case 'Huur en koopwoningen':
                subject = 'house';
                break;
            case 'Verhuisbewegingen':
                subject = 'moving';
                break;
            case 'Persoonlijke ontwikkeling':
                subject = 'development';
                break;
            default:
                subject = '';
        }

        _toggleActiveClass(subject);
        _toggleInfoCard(subject);
    };

    addEvents = function() {
        var itemArr = document.getElementsByClassName(
            ui.uiStrings.class.filter_item
        );

        for (let i = 0; i < itemArr.length; i++) {
            itemArr[i].addEventListener('click', function(event) {
                _subjectChoosing(event);
            });
        }
    };

    return {
        init: function() {
            addEvents();
        },

        subjects: _subjectChoosing
    };
})(uiController, localStorage);
