var storageComponent = (function(ui) {
    var key = 'filterstorage',
        working = false;

    var _checkCompatible, _addItem, _getItem;

    _addItem = function(val) {
        if (working) {
            if (_getItem() == '') {
                sessionStorage.setItem(key, val);
            } else {
                _updateItem(val);
            }
        }
    };

    _updateItem = function(val) {
        var result;

        if (working) {
            result = _getItem() + ',' + val;

            sessionStorage.setItem(key, result);
        }
    };

    _getItem = function() {
        if (working) {
            return sessionStorage.getItem(key);
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
        addItem: _addItem,
        getItem: _getItem
    };
})(uiController);
