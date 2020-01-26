var storageComponent = (function(ui) {
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

            //temp
            sessionStorage.removeItem(key);
        },
        getItems: _getItems,
        removeItem: _removeItem,
        checkItem: _checkItem,
        checkIsEmpty: _checkIsEmpty
    };
})(uiController);
