
//
//https://www.html5rocks.com/en/tutorials/file/dndfiles/
//https://openlayers.org/en/latest/examples/static-image.html
//https://openlayers.org/en/latest/examples/icon.html
//http://www.wikihow.com/Add-Vector-Features-to-an-OpenLayers-3-Map
$(function(){
    var coordinates = [];
    var imgcontainer, imgcontent, imgclose;
    var popupsOverlay;
    $("#files").on("change", handleFileSelect);
    function handleFileSelect(evt) {
        // hide the div 'center'
	    $(".center").hide()
        $(".center").children().hide()
        $("#map").show()

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
        const files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image/*')) {
                continue;
            }

            var reader = new FileReader();
            reader.readAsBinaryString(f);    // Read in the image file as a data URL.

            (function() {   // since the getData function takes longer than the loop execution, we need a callback

                const tmppath =(window.URL || window.webkitURL).createObjectURL(f);
                EXIF.getData(f, function () {
                    const allMetaData = EXIF.getAllTags(this);
                    // get the geolocation from the file (if available)
                    if (allMetaData.GPSLatitude) {
                        lat = ConvertDMSToDD(allMetaData.GPSLatitude[0], allMetaData.GPSLatitude[1], allMetaData.GPSLatitude[2], allMetaData.GPSLatitudeRef);
                        lng = ConvertDMSToDD(allMetaData.GPSLongitude[0], allMetaData.GPSLongitude[1], allMetaData.GPSLongitude[2], allMetaData.GPSLongitudeRef);
                        var callback = $.proxy(pushCoords,lat, lng);
                    }

                    const point = new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857'));
                    const iconFeature = new ol.Feature({
                        geometry: point,
                        name: 'Feature 1',
                        population: 4000,
                        rainfall: 500
                    });

                    iconFeature.setStyle(iconStyle);
                    vectorSource.addFeature(iconFeature);

                    const geometry = iconFeature.getGeometry();
                    const coordinate = geometry.getCoordinates();
                    //var position = map.getPixelFromCoordinate(coordinate);

                    // show image in popup window
                    imgcontainer = document.createElement("div")
                    imgcontainer.setAttribute("class","img-popup")

                    imgcontent = document.createElement("img")
                    imgcontent.setAttribute("class","img-content")
                    imgcontent.setAttribute('src', tmppath)

                    imgclose = document.createElement("div")
                    imgclose.setAttribute("class","popup-closer")

                    imgcontainer.appendChild(imgcontent)
                    imgcontainer.appendChild(imgclose)

                    imgclose.onclick = function() {
                        //console.log("CLOSING")
                        $(imgcontainer).hide();
                        return false;
                    }

                    imgcontainer.onclick = function() {
                        //console.log("CLOSING")
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

        //console.log(coordinates)
        //var ext = ol.extent.boundingExtent([coordinates]);
        //map.getView().fit(ext,map.getSize());

    }

    // doesnt work :(
    function pushCoords(lat, lng){
        //console.log("lat: " + lat)
        coordinates.push([lat, lng])
    }


    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);

        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    }

});


// TODO:
/*
1. Zoom to extent
2. Image rotation
3. Passing coordinates array for zoom to extent
4. Hide the file selector division
5. Provide a way to choose more images or do all over again
*/