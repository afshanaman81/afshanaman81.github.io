
//
//https://www.html5rocks.com/en/tutorials/file/dndfiles/
//https://openlayers.org/en/latest/examples/static-image.html
//https://openlayers.org/en/latest/examples/icon.html
//http://www.wikihow.com/Add-Vector-Features-to-an-OpenLayers-3-Map
$(function(){
    $("#files").on("change", handleFileSelect);
    function handleFileSelect(evt) {
        var basemap = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'img/point.png'
            }))
        });

        var proj = new ol.proj.Projection({
            code: 'EPSG:4326',
            units: 'm'
        });

        var vectorLayer = new ol.layer.Vector();
        var vectorSource = new ol.source.Vector({
            projection: proj
        });
        var popup;
        var lat = 54;
        var lng = 24;
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();
            reader.readAsBinaryString(f);    // Read in the image file as a data URL.
            EXIF.getData(f, function() {
                var allMetaData = EXIF.getAllTags(this);
                // get the geolocation from the file (if available)
                if (allMetaData.GPSLatitude) {
                    lat = ConvertDMSToDD(allMetaData.GPSLatitude[0], allMetaData.GPSLatitude[1], allMetaData.GPSLatitude[2], allMetaData.GPSLatitudeRef);
                    lng = ConvertDMSToDD(allMetaData.GPSLongitude[0], allMetaData.GPSLongitude[1], allMetaData.GPSLongitude[2], allMetaData.GPSLongitudeRef);
                }
                //var allMetaDataSpan = document.getElementById("allMetaDataSpan");
                //allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
                console.log(lat + ", " + lng);


                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([lng, lat],'EPSG:4326', 'EPSG:3857')),
                    name: 'Feature 1',
                    population: 4000,
                    rainfall: 500
                });

                iconFeature.setStyle(iconStyle);
                vectorSource.addFeature(iconFeature);


                // Popup
                //https://stackoverflow.com/questions/29046095/bootstrap-popover-auto-placement-incorrectly-applied
                // needs bootstrap
                var element = document.getElementById('popup');

                popup = new ol.Overlay({
                    element: element,
                    positioning: 'bottom-center',
                    stopEvent: false,
                    offset: [0, -50]
                });



            });
        }

        vectorLayer.setSource(vectorSource);
        var map = new ol.Map({
            layers: [basemap, vectorLayer],
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
/*
        map.addOverlay(popup);

        // display popup on click
        map.on('click', function(evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature) {
                    return feature;
                });
            if (feature) {
                var coordinates = feature.getGeometry().getCoordinates();
                popup.setPosition(coordinates);
                $(element).popover({
                    'placement': 'top',
                    'html': true,
                    'content': feature.get('name')
                });
                $(element).popover('show');
            } else {
                $(element).popover('destroy');
            }
        });

        // change mouse cursor when over marker
        map.on('pointermove', function(e) {
            if (e.dragging) {
                $(element).popover('destroy');
                return;
            }
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            map.getTarget().style.cursor = hit ? 'pointer' : '';
        });*/
    }

    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);

        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    }

});


