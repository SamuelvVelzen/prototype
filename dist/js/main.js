window.onload = function() {
    storageController.init();
    articleComponent.init();
    choosingComponent.init();
    navComponent.init();
};

var uiController = (function() {
    var uiStrings = {
        id: {
            notification: 'notification',
            generateTitle: 'generateTitle',
            generateButton: 'generateArticle',
            conclusionButton: 'conclusion',
            conclusionText: 'conclusion_text',
            hiddenContent: 'hiddenContent',
            animation: 'animation',
            noconclusion: 'noConclusion',
            conclusionContent: 'conclusion_content',
            titleConclusion: 'title_conclusion',
            titleSubConclusion: 'title_sub_conclusion',
            readTitle: 'readmore',
            readCard: '_card',
            loading: 'loader'
        },
        class: {
            filter_item: 'filterbalk_container_item',
            info_item: 'infocard_inner_body_item',
            close: 'close',
            content: 'content',
            cards: 'card',
            navButtons: 'nav_buttons',
            scrollButtons: 'scroll_buttons'
        },
        style: {
            order: 'flex_order',
            slideIn: 'slide_in',
            slideOut: 'slide_out'
        },
        pages: {
            article: 'article.html'
        }
    };

    var content = {
        housemovingdevelopment: `<p class="text">Het ontwikkelingsplan Nieuw Crooswijk heeft zo zijn voor- en nadelen. De buurt wordt opgeknapt en verfrist. Er verschijnen nieuwe huizen, nieuwe winkels, nieuwe tentjes en zelfs nieuwe mensen. Het aantal koopwoningen is in de jaren gestegen ten koste van het aantal huurwoningen. Dit heeft ervoor gezorgd dat er door de jaren heen veel verhuizingen zijn geweest in de wijk. </p><p class="text">Oorspronkelijke bewoners moeten hun huis uit en moeten vaak verhuizen naar een ander huis in een andere wijk. De gerenoveerde en nieuwbouwwoningen trekken meer midden en hoogopgeleiden mensen aan. In Rubroek en Oud Crooswijk gaan de ontwikkelingen qua woonsamenstelling minder snel. In Nieuw Crooswijk is het aantal huishoudens met een hoog inkomen gestegen ten kostte van het aantal huishoudens met een laag en midden hoog inkomen.</p><p class="text">Dat heeft gezorgd voor ontevredenheid onder de oorspronkelijke bewoners. Het gros van de bewoners is van mening dat de wijk op een negatieve manier veranderd is. Het gevoel van saamhorigheid dat de wijk ooit zo kenmerkte, is er vandaag de dag volgens de bewoners niet meer. De volksbuurt is gekrompen en volgens bewoners mist er harmonie tussen de twee groepen. Er is niet tot weinig contact tussen oorspronkelijke Crooswijkers en nieuwe bewoners.  </p><p class="text">Crooswijk is door de jaren heen drastisch veranderd en de komende jaren zullen de gevolgen van het ontwikkelingsplan waarschijnlijk alleen maar blijven toenemen. Crooswijk was in 2016 de armste wijk van Nederland. Tegenwoordig wonen er meer yuppen. Oorspronkelijke bewoners zijn ontevreden over de veranderingen. In de essentie was het doel van de gemeente om de bevolkingssamenstelling in Crooswijk in balans te brengen. De kritische vraag die rijst is: Is Crooswijk er sinds het ontwikkelingsplan op vooruit gegaan? Het ligt maar net aan wie je het vraagt.</p>`,
        movingdevelopment: `<p class="text">Het ontwikkelingsplan in Crooswijk heeft zijn voor- en nadelen. Er verschijnen nieuwe huizen, nieuwe winkels, nieuwe tentjes en zelfs nieuwe mensen. Crooswijkers komen en gaan. Er zijn door de jaren heen veel verhuizingen geweest.</p><p class="text"> Het plan heeft een grote impact gehad op de woonsamenstelling in Crooswijk. Er wonen steeds meer midden en hoogopgeleiden bewoners in Crooswijk. In Rubroek en Oud Crooswijk gaan de ontwikkelingen qua woonsamenstelling minder snel. In Nieuw Crooswijk is het aantal huishoudens met een hoog inkomen gestegen ten kostte van het aantal huishoudens met een laag en midden hoog inkomen. Dat heeft gezorgd voor ontevredenheid onder de oorspronkelijke bewoners. Een groot deel van de oorspronkelijke bewoners vindt dat de wijk op een negatieve manier veranderd is. De volksbuurt is gekrompen en volgens bewoners mist er harmonie tussen de twee groepen.</p><p class="text">Crooswijk is drastisch veranderd en de veranderingen zullen de komende jaren wellicht blijven toenemen. Crooswijk was in 2016 de armste wijk van Nederland. Tegenwoordig wonen er meer yuppen. In de essentie was het doel van de gemeente om de bevolkingssamenstelling in Crooswijk in balans te brengen. Oorspronkelijke bewoners zijn ontevreden over de veranderingen. De kritische vraag die rijst is: Is Crooswijk er sinds het ontwikkelingsplan op vooruit gegaan? Het ligt maar net aan wie je het vraagt</p>`
    };

    return {
        uiStrings: uiStrings,
        content: content
    };
})();

var storageController = (function(ui) {
    var key = 'filterstorage',
        working = false;

    var _checkCompatible,
        _setItems,
        _addItem,
        _getItems,
        _removeItem,
        _checkItem,
        _checkIsEmpty;

    _setItems = function(valArr) {
        if (working) {
            sessionStorage.setItem(key, valArr);
        }
    };

    _addItem = function(val) {
        if (working) {
            var items = _getItems();

            if (_checkIsEmpty()) {
                _setItems(val);
            } else {
                _updateItem(val);
            }
        }
    };

    _updateItem = function(val) {
        var result;

        if (working) {
            result = _getItems() + ',' + val;

            sessionStorage.setItem(key, result);
        }
    };

    _getItems = function() {
        if (working) {
            var result = sessionStorage.getItem(key);

            if (result != '') {
                return result;
            }

            return '';
        }
    };

    _removeItem = function(val) {
        var items = _getItems(),
            result = items,
            itemsArr;

        if (working) {
            if (!_checkIsEmpty()) {
                itemsArr = items.split(',');

                if (itemsArr.includes(val)) {
                    for (var i = 0; i < itemsArr.length; i++) {
                        if (itemsArr[i] == val) {
                            itemsArr.splice(i, 1);
                            i--;
                        }
                    }

                    _setItems(itemsArr.toString());
                }
            }
        }
    };

    _checkItem = function(val) {
        var items = _getItems(),
            result = items,
            itemsArr;

        if (!_checkIsEmpty()) {
            itemsArr = items.split(',');

            if (itemsArr.includes(val)) {
                for (var i = 0; i < itemsArr.length; i++) {
                    if (itemsArr[i] == val) {
                        itemsArr.splice(i, 1);
                        i--;
                    }
                }

                _setItems(itemsArr.toString());
            } else {
                _addItem(val);
            }
        } else {
            _addItem(val);
        }
    };

    _checkIsEmpty = function() {
        var items = _getItems();

        if (items == null || items == false || items == '') {
            return true;
        } else {
            return false;
        }
    };

    _checkCompatible = function() {
        if (typeof Storage == 'undefined') {
            // Sorry! No Web Storage support..
            if (
                confirm(
                    ' Je gebruikt een verouderde browser. Voor een betere ervaring moet je je browser upgraden.'
                )
            ) {
                window.open('http://browsehappy.com/', '_blank');
            }

            document
                .getElementById(ui.uiStrings.id.notification)
                .classList.add('active');
        } else {
            document
                .getElementById(ui.uiStrings.id.notification)
                .classList.remove('active');

            working = true;
        }
    };

    return {
        init: function() {
            _checkCompatible();
        },
        getItems: _getItems,
        removeItem: _removeItem,
        checkItem: _checkItem,
        checkIsEmpty: _checkIsEmpty
    };
})(uiController);

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

var articleComponent = (function(ui, storage, scrolling) {
    var addEvents,
        _checkContent,
        _showContent,
        _generatingConclusion,
        _generatingReadMore,
        _resetingConclusion,
        _generatingLinks;

    _checkContent = function() {
        var items = storage.getItems(),
            articleArr = document.getElementsByClassName(
                ui.uiStrings.class.content
            ),
            loading = document.getElementById(ui.uiStrings.id.loading),
            itemsArr;

        for (let i = 0; i < articleArr.length; i++) {
            articleArr[i].classList.remove('active');
        }

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');

            el = document.getElementById(itemsArr[0]);
            el.classList.add('active');

            loading.classList.add('loaded');
        }
    };

    _showContent = function() {
        var el = document.getElementById(ui.uiStrings.id.hiddenContent);

        el.classList.add('generated');
    };

    _generatingConclusion = function() {
        var items = storage.getItems(),
            elTitle = document.getElementById(ui.uiStrings.id.titleConclusion),
            elSub = document.getElementById(ui.uiStrings.id.titleSubConclusion),
            conclusionContent = document.getElementById(
                ui.uiStrings.id.conclusionContent
            );

        if (!storage.checkIsEmpty()) {
            var stringItems = '',
                subtitle = '',
                conclusion,
                el;

            items.split(',').forEach(element => {
                stringItems += element;
            });

            conclusion = ui.content[stringItems];

            if (conclusion != undefined) {
                el = document.getElementById(ui.uiStrings.id.conclusionText);

                el.innerHTML = conclusion;
                elTitle.style.display = 'block';
                elSub.style.display = 'block';

                var itemsArr = items.split(',');

                for (let i = 0; i < itemsArr.length; i++) {
                    var reallife = '';

                    switch (itemsArr[i]) {
                        case 'house':
                            reallife = 'Huur en koopwoningen';
                            break;
                        case 'moving':
                            reallife = 'Verhuisbewegingen';
                            break;
                        case 'development':
                            reallife = 'Persoonlijke ontwikkeling';
                            break;
                        default:
                            reallife = '';
                    }

                    if (i != 0) {
                        subtitle += ' & ' + reallife;
                    } else {
                        subtitle = reallife;
                    }
                }

                elSub.innerText = subtitle;
            } else {
                elSub.innerText = '';

                conclusionContent.classList.remove('done');

                document
                    .getElementById(ui.uiStrings.id.noconclusion)
                    .classList.add('active');
            }
        } else {
            elSub.innerText = '';

            conclusionContent.classList.remove('done');

            document
                .getElementById(ui.uiStrings.id.noconclusion)
                .classList.add('active');
        }
    };

    _generatingReadMore = function() {
        var items = storage.getItems(),
            readMoreArr = ['house', 'moving', 'development'],
            readMoreEl = document.getElementById(ui.uiStrings.id.readTitle),
            itemsArr,
            elCard;

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');

            for (let i = 0; i < itemsArr.length; i++) {
                for (let j = 0; j < readMoreArr.length; j++) {
                    if (itemsArr[i] == readMoreArr[j]) {
                        readMoreArr.splice(j, 1);
                        j--;
                    }
                }
            }

            if (readMoreArr.length != 0) {
                readMoreEl.classList.add('more_content');

                for (let i = 0; i < readMoreArr.length; i++) {
                    elCard = document.getElementById(
                        readMoreArr[i] + ui.uiStrings.id.readCard
                    );

                    elCard.classList.add('show');
                }
            }
        }
    };

    _resetingConclusion = function() {
        var el = document.getElementById(ui.uiStrings.id.conclusionText),
            elSub = document.getElementById(ui.uiStrings.id.titleSubConclusion),
            notification = document.getElementById(
                ui.uiStrings.id.noconclusion
            ),
            animationEl = document.getElementById(ui.uiStrings.id.animation),
            content = document.getElementById(ui.uiStrings.id.hiddenContent),
            conclusion = document.getElementById(
                ui.uiStrings.id.conclusionContent
            ),
            readMoreEl = document.getElementById(ui.uiStrings.id.readTitle),
            readCards = document.getElementsByClassName(
                ui.uiStrings.class.cards
            );

        el.innerHTML = '';
        elSub.innerText = '';

        notification.classList.remove('active');

        animationEl.classList.remove('done');
        content.classList.remove('generated');
        conclusion.classList.remove('done');

        readMoreEl.classList.remove('more_content');

        for (let i = 0; i < readCards.length; i++) {
            readCards[i].classList.remove('show');
        }
    };

    _generatingLinks = function(event) {
        window.subjects(event, ui.uiStrings.class.cards);
    };

    addEvents = function() {
        var el = document.getElementById(ui.uiStrings.id.conclusionButton),
            cards = document.getElementsByClassName(ui.uiStrings.class.cards),
            animationEl,
            conclusion;

        el.addEventListener('click', function() {
            _showContent();
            scrolling.scrollingBottom(document.body);

            setTimeout(() => {
                animationEl = document.getElementById(
                    ui.uiStrings.id.animation
                );

                conclusion = document.getElementById(
                    ui.uiStrings.id.conclusionContent
                );

                animationEl.classList.add('done');
                conclusion.classList.add('done');

                _generatingConclusion();
                _generatingReadMore();

                scrolling.viewScrolling(
                    document.getElementById(ui.uiStrings.id.titleConclusion),
                    'center'
                );
            }, 2000);
        });

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', _generatingLinks);
        }
    };

    return {
        init: function() {
            if (page == 'article') {
                addEvents();
                _checkContent();
            }
        },
        checkContent: _checkContent,
        resetConclusion: _resetingConclusion
    };
})(uiController, storageController, scrollingController);

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

        subjects: _subjectChoosing,
        controller: _controller
    };
})(uiController, articleComponent, storageController);

var navComponent = (function(ui, storage, scrolling) {
    var _goNav, _checkButtons, _findActive;

    _findActive = function() {
        var items = storage.getItems(),
            itemsArr;

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');

            for (let i = 0; i < itemsArr.length; i++) {
                var el = document.getElementById(itemsArr[i]);

                if (el.classList.contains('active')) {
                    console.log(el.id);

                    if (el.id == 'house') {
                        return 'house';
                    }
                    if (el.id == 'moving') {
                        return 'moving';
                    }
                    if (el.id == 'development') {
                        return 'development';
                    }
                }
            }
        }
        return false;
    };

    _findNext = function(activeClass, way) {
        if (!storage.checkIsEmpty()) {
            var items = storage.getItems(),
                itemsArr = items.split(','),
                index;

            for (let i = 0; i < itemsArr.length; i++) {
                if (itemsArr[i] == activeClass) {
                    index = i;
                }
            }
            console.log(way);

            if (
                (way == 'forward' && index >= itemsArr.length) ||
                (way == 'prev' && index == 0)
            ) {
                return false;
            } else if (way == 'forward') {
                return itemsArr[index + 1];
            } else {
                return itemsArr[index - 1];
            }
        }
    };

    _checkButtons = function(way) {
        var buttons = document.getElementsByClassName(
                ui.uiStrings.class.navButtons
            ),
            content = document.querySelector(
                '.' + ui.uiStrings.class.content + '.active'
            );

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('disabled');
        }

        if (storage.checkIsEmpty()) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.add('disabled');
            }
        }

        if (way) {
            var el = document.getElementById(way);

            el.classList.add('disabled');
        }
    };

    _goScroll = function(way) {
        var el = document.querySelector('#' + _findActive() + '_' + way),
            button = document.getElementById('scroll_' + way);
        console.log(el);

        if (el) {
            scrolling.viewScrolling(el, 'start');
        } else {
        }
    };

    _goNav = function(way) {
        var items = storage.getItems(),
            buttons = document.getElementsByClassName(
                ui.uiStrings.class.navButtons
            ),
            currentActive = document.querySelector(
                '.' + ui.uiStrings.class.content + '.active'
            ),
            itemsArr;

        if (!storage.checkIsEmpty()) {
            var nextItem = _findNext(_findActive(), way);
            console.log(nextItem);

            if (nextItem != false && nextItem != '' && nextItem != undefined) {
                var newActive = document.getElementById(nextItem),
                    nextNextItem = _findNext(nextItem, way),
                    slideOut,
                    slideIn;

                if (way == 'forward') {
                    slideOut = 'left';
                    slideIn = 'right';
                } else {
                    slideOut = 'right';
                    slideIn = 'left';
                }

                currentActive.classList.add(
                    ui.uiStrings.style.slideOut + '_' + slideOut
                );

                if (
                    nextNextItem == false ||
                    nextNextItem == '' ||
                    nextNextItem == undefined
                ) {
                    _checkButtons(way);
                }

                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.classList.remove(
                        ui.uiStrings.style.slideOut + '_' + slideOut
                    );

                    scrolling.scrollingTop(newActive);

                    newActive.classList.add(
                        ui.uiStrings.style.slideIn + '_' + slideIn
                    );
                    newActive.classList.add('active');

                    setTimeout(() => {
                        newActive.classList.remove(
                            ui.uiStrings.style.slideIn + '_' + slideIn
                        );
                    }, 1000);
                }, 1000);
            } else {
                _checkButtons(way);
            }
        } else {
            _checkButtons();
        }
    };

    return {
        init: function() {
            _checkButtons();
        },
        goScroll: _goScroll,
        goNav: _goNav
    };
})(uiController, storageController, scrollingController);
