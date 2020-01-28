var choosingComponent = (function(ui, article, storage) {
    var addEvents,
        checkFilters,
        _controller,
        _subjectChoosing,
        _removeSubject,
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

    _toggleActiveClass = function() {
        var items = storage.getItems(),
            itemsArr,
            filterArr = document.getElementsByClassName(
                ui.uiStrings.class.filter_item
            );

        for (let i = 0; i < filterArr.length; i++) {
            filterArr[i].classList.remove('active');
        }

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');

            itemsArr.forEach(element => {
                var el = document.querySelector(
                    '.' + ui.uiStrings.class.filter_item + '.' + element
                );

                el.classList.add('active');
            });
        }
    };

    _updateInfoCard = function() {
        var items = storage.getItems(),
            itemsArr,
            elArr;

        //remove all active classes
        elArr = document.getElementsByClassName(ui.uiStrings.class.info_item);

        for (let i = 0; i < elArr.length; i++) {
            elArr[i].classList.remove(
                'flex_order_2',
                'flex_order_3',
                'flex_order_4',
                'active'
            );
        }

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');

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
        }
    };

    _removeSubject = function(event, identifier) {
        var parent = _findParent(event.path, identifier),
            subject;

        if (parent.classList.contains('house')) {
            subject = 'house';
        } else if (parent.classList.contains('moving')) {
            subject = 'moving';
        } else if (parent.classList.contains('development')) {
            subject = 'development';
        }

        _controller(subject);
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

        _controller(subject);
    };

    _controller = function(subject) {
        var title = document.getElementById(ui.uiStrings.id.generateTitle),
            button = document.getElementById(ui.uiStrings.id.generateButton);

        //check if item is in storage otherwise add
        storage.checkItem(subject);

        //add active state to filterbalk
        _toggleActiveClass();

        //update infocard with the right order for the page subjects
        if (page == 'subjects') {
            _updateInfoCard();

            //check if empty storage so to hide generate and choosing subject
            if (!storage.checkIsEmpty()) {
                title.classList.add('generating');

                button.classList.remove('disabled');
                button.href = ui.uiStrings.pages.article;
            } else {
                title.classList.remove('generating');

                button.classList.add('disabled');
                button.href = ui.uiStrings.pages.article;
            }
        }
    };

    addEvents = function() {
        var itemArr = document.getElementsByClassName(
                ui.uiStrings.class.filter_item
            ),
            closeArr = document.getElementsByClassName(
                ui.uiStrings.class.close
            ),
            button = document.getElementById(ui.uiStrings.id.generateButton);

        if (button) {
            //prevent clicking if disabled
            button.addEventListener('click', function(event) {
                if (button.classList.contains('disabled')) {
                    event.preventDefault();
                }
            });
        }

        for (let i = 0; i < itemArr.length; i++) {
            itemArr[i].addEventListener('click', function(event) {
                _subjectChoosing(event);

                if (page == 'article') {
                    article.checkContent();
                    article.resetConclusion();
                }
            });
        }

        for (let i = 0; i < closeArr.length; i++) {
            closeArr[i].addEventListener('click', function(event) {
                _removeSubject(event, ui.uiStrings.class.info_item);
            });
        }

        window.subjects = _removeSubject;
    };

    checkFilters = function() {
        var items = storage.getItems(),
            itemsArr,
            title,
            button;

        if (!storage.checkIsEmpty()) {
            //add active state to filterbalk
            _toggleActiveClass();

            //update infocard with the right order for the page subjects
            if (page == 'subjects') {
                _updateInfoCard();

                //check if empty storage so to hide generate and choosing subject
                if (!storage.checkIsEmpty()) {
                    title = document.getElementById(
                        ui.uiStrings.id.generateTitle
                    );
                    button = document.getElementById(
                        ui.uiStrings.id.generateButton
                    );

                    title.classList.add('generating');

                    button.classList.remove('disabled');
                    button.href = ui.uiStrings.pages.article;
                } else {
                    title.classList.remove('generating');

                    button.classList.add('disabled');
                    button.href = ui.uiStrings.pages.article;
                }
            }
        }
    };

    return {
        init: function() {
            addEvents();

            checkFilters();
        },

        subjects: _subjectChoosing
    };
})(uiController, articleComponent, storageController);
