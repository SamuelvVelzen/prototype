window.onload = function() {
    storageController.init();
    articleComponent.init();
    choosingComponent.init();
    navComponent.init();

    var ImageMap = function(map, img) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                imgWidth = img.naturalWidth,
                imgHeight = img.naturalHeight;
            for (n = 0; n < len; n++) {
                coords[n] = areas[n].coords.split(',');
            }
            this.resize = function() {
                var n,
                    m,
                    clen,
                    x = img.offsetWidth / imgWidth,
                    y = img.offsetHeight / imgHeight;
                imgWidth = img.offsetWidth;
                imgHeight = img.offsetHeight;
                for (n = 0; n < len; n++) {
                    clen = coords[n].length;
                    for (m = 0; m < clen; m += 2) {
                        coords[n][m] *= x;
                        coords[n][m + 1] *= y;
                    }
                    areas[n].coords = coords[n].join(',');
                }
                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new ImageMap(
            document.getElementById('clickable_map'),
            document.getElementById('clickable_img')
        );
    imageMap.resize();
    return;
};
