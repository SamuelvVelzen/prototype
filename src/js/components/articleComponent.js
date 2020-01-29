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
