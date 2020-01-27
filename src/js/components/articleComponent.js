var articleComponent = (function(ui, storage) {
    var addEvents,
        _checkContent,
        _showContent,
        _generatingConclusion,
        _resetingConclusion;

    _checkContent = function() {
        var items = storage.getItems(),
            articleArr = document.getElementsByClassName(
                ui.uiStrings.class.content
            ),
            itemsArr;

        for (let i = 0; i < articleArr.length; i++) {
            articleArr[i].classList.remove(
                'flex_order_2',
                'flex_order_3',
                'flex_order_4',
                'active'
            );
        }

        if (!storage.checkIsEmpty()) {
            itemsArr = items.split(',');

            for (let i = 0; i < itemsArr.length; i++) {
                var number = i + 2,
                    el = document.getElementById(itemsArr[i]);

                el.classList.add(
                    ui.uiStrings.style.order + '_' + number,
                    'active'
                );
            }
        }
    };

    _showContent = function() {
        var el = document.getElementById(ui.uiStrings.id.hiddenContent);

        el.classList.add('generated');
    };

    _generatingConclusion = function() {
        var items = storage.getItems(),
            elTitle = document.getElementById(ui.uiStrings.id.titleConclusion),
            elSub = document.getElementById(ui.uiStrings.id.titleSubConclusion);
        console.log(elTitle);
        console.log(elSub);

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
                elTitle.style.display = 'none';
                elSub.style.display = 'none';

                elSub.innerText = '';

                document
                    .getElementById(ui.uiStrings.id.noconclusion)
                    .classList.add('active');
            }
        } else {
            elTitle.style.display = 'none';
            elSub.style.display = 'none';

            elSub.innerText = '';

            document
                .getElementById(ui.uiStrings.id.noconclusion)
                .classList.add('active');
        }
    };

    _resetingConclusion = function() {
        var el = document.getElementById(ui.uiStrings.id.conclusionText),
            notification = document.getElementById(
                ui.uiStrings.id.noconclusion
            ),
            elTitle = document.getElementById(ui.uiStrings.id.titleConclusion),
            elSub = document.getElementById(ui.uiStrings.id.titleSubConclusion),
            animationEl = document.getElementById(ui.uiStrings.id.animation);

        var hoi = document.getElementById(ui.uiStrings.id.hiddenContent);

        hoi.classList.remove('generated');

        animationEl.classList.remove('done');

        el.innerHTML = '';
        notification.classList.remove('active');

        // elTitle.style.display = 'none';
        // elSub.style.display = 'none';

        // elSub.innerText = '';
    };

    addEvents = function() {
        var el = document.getElementById(ui.uiStrings.id.conclusionButton),
            animationEl;

        el.addEventListener('click', function() {
            _showContent();

            setTimeout(() => {
                animationEl = document.getElementById(
                    ui.uiStrings.id.animation
                );

                animationEl.classList.add('done');

                _generatingConclusion();
            }, 2000);
        });
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
})(uiController, storageController);
