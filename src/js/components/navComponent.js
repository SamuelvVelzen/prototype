var navComponent = (function(ui, storage) {
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

    _checkButtons = function() {
        var buttons = document.getElementsByClassName(
                ui.uiStrings.class.navButtons
            ),
            content = document.querySelector(
                '.' + ui.uiStrings.class.content + '.active'
            );

        if (storage.checkIsEmpty()) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.add('disabled');
            }
        } else {
            console.log(content);
        }
    };

    _goNav = function(way) {
        var items = storage.getItems(),
            buttons = document.getElementsByClassName(
                ui.uiStrings.class.navButtons
            ),
            currentActive = document.querySelector('.content.active'),
            itemsArr;

        if (!storage.checkIsEmpty()) {
            var nextItem = _findNext(_findActive(), way);
            console.log(nextItem);

            if (nextItem != false && nextItem != '' && nextItem != undefined) {
                var newActive = document.getElementById(nextItem),
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

                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.classList.remove(
                        ui.uiStrings.style.slideOut + '_' + slideOut
                    );

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
            }
        } else {
            _checkButtons();
        }
    };

    return {
        init: function() {
            _checkButtons();
        },
        goNav: _goNav
    };
})(uiController, storageController);
