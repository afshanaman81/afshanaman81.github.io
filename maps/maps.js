
//
//https://www.html5rocks.com/en/tutorials/file/dndfiles/
//https://openlayers.org/en/latest/examples/static-image.html
//https://openlayers.org/en/latest/examples/icon.html
//http://www.wikihow.com/Add-Vector-Features-to-an-OpenLayers-3-Map
$(function(){
    var popupsOverlay;
    $("#files").on("change", handleFileSelect);
    function handleFileSelect(evt) {
        var basemap = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        var proj = new ol.proj.Projection({
            code: 'EPSG:4326',
            units: 'm'
        });

        var map = new ol.Map({
            layers: [basemap],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }),
            view: new ol.View({
                center: [0, 0],
                zoom: 3,
                //projection: proj
            })
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'img/point.png'
            }))
        });

        var vectorLayer = new ol.layer.Vector();
        var vectorSource = new ol.source.Vector({
            projection: proj
        });

        var lat = 54;
        var lng = 24;
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image/*')) {
                continue;
            }

            var reader = new FileReader();
            reader.readAsBinaryString(f);    // Read in the image file as a data URL.

            (function() {

                var tmppath =(window.URL || window.webkitURL).createObjectURL(f);
                EXIF.getData(f, function () {
                    var allMetaData = EXIF.getAllTags(this);
                    // get the geolocation from the file (if available)
                    if (allMetaData.GPSLatitude) {
                        lat = ConvertDMSToDD(allMetaData.GPSLatitude[0], allMetaData.GPSLatitude[1], allMetaData.GPSLatitude[2], allMetaData.GPSLatitudeRef);
                        lng = ConvertDMSToDD(allMetaData.GPSLongitude[0], allMetaData.GPSLongitude[1], allMetaData.GPSLongitude[2], allMetaData.GPSLongitudeRef);
                    }

                    var point = new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857'));
                    var iconFeature = new ol.Feature({
                        geometry: point,
                        name: 'Feature 1',
                        population: 4000,
                        rainfall: 500
                    });

                    iconFeature.setStyle(iconStyle);
                    vectorSource.addFeature(iconFeature);

                    var geometry = iconFeature.getGeometry();
                    var coordinate = geometry.getCoordinates();
                    //var position = map.getPixelFromCoordinate(coordinate);

                    // show image in popup window
                    imgcontainer = document.createElement("div")
                    imgcontainer.setAttribute("class","img-popup")
                    imgcontent = document.createElement("img")
                    imgcontainer.appendChild(imgcontent)
                    imgcontent.setAttribute('src', tmppath)
                    imgcontent.setAttribute('width', '70')

                    imgcontainer.onclick = function() {
                        console.log("CLOSING")
                        $(this).hide();
                        return false;
                    }

                    popupsOverlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
                        element: imgcontainer,
                        autoPan: true,
                        autoPanAnimation: {
                            duration: 250
                        }
                    }));

                    popupsOverlay.setPosition(coordinate);
                    map.addOverlay(popupsOverlay)
                });

            }(f));
        }

        vectorLayer.setSource(vectorSource);
        map.addLayer(vectorLayer)

        /**
         * Add a click handler to the map to render the general popup.
         */
        //https://dev.camptocamp.com/files/gberaudo/webgl_polygons_lines/examples/popup.html
        //https://openlayers.org/en/latest/examples/overlay.html
       /* map.on('click', function(evt) {
            var coordinate = evt.coordinate;
            content.innerHTML = '<p>You clicked here:</p><code>' + coordinate + '</code>';
            popupsOverlay.setPosition(coordinate);
        });*/

        /**
         * Add a click handler to hide the general popup.
         * @return {boolean}
         */
        /*closer.onclick = function() {
            console.log("CLOSING")
            popupsOverlay.setPosition(undefined);
            closer.blur();
            return false;
        }*/
    }




    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);

        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    }

});


