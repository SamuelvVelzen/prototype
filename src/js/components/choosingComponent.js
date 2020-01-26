var choosing = (function(ui, storage) {
    var addEvents,
        _subjectChoosing,
        _findParent,
        _toggleActiveClass,
        _updateInfoCard;

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

    _updateInfoCard = function() {
        var items = storage.getItems(),
            itemsArr,
            elArr;

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');
            elArr = document.getElementsByClassName(
                ui.uiStrings.class.info_item
            );

            for (let i = 0; i < elArr.length; i++) {
                elArr[i].classList.remove(
                    'flex_order_2',
                    'flex_order_3',
                    'flex_order_4',
                    'active'
                );
            }

            itemsArr.forEach((element, key) => {
                var el = document.querySelector(
                        '.' + ui.uiStrings.class.info_item + '.' + element
                    ),
                    number = key + 2;

                el.classList.add(
                    ui.uiStrings.style.order + '_' + number,
                    'active'
                );
            });
        } else {
            //remove all active classes
            var elArr = document.getElementsByClassName(
                ui.uiStrings.class.info_item
            );

            for (let i = 0; i < elArr.length; i++) {
                elArr[i].classList.remove(
                    'flex_order_2',
                    'flex_order_3',
                    'flex_order_4',
                    'active'
                );
            }
        }
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
        storage.checkItem(subject);

        _updateInfoCard();
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
})(uiController, storageComponent);
