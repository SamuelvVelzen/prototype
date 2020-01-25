var storageComponent = (function(ui) {
    var _checkCompatible;

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
        }
    };

    return {
        init: function() {
            _checkCompatible();
        }
    };
})(uiController);
