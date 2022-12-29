// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

function Base64Decode(token) {
    if (token.length === 0) return null;
    // The last character in the token is the number of padding characters.
    var numberOfPaddingCharacters = token.slice(-1);
    // The Base64 string is the token without the last character.
    token = token.slice(0, -1);
    // '-'s are '+'s and '_'s are '/'s.
    token = token.replace(/-/g, '+');
    token = token.replace(/_/g, '/');
    // Pad the Base64 string out with '='s
    for (var i = 0; i < numberOfPaddingCharacters; i++)
        token += "=";
    return atob(token);
}

function GetResultsMapsHTML() {
    var mapsContainerHTML = '';
    mapsContainerHTML += '<div id="myMap" style="height:400px" ></div>';

    // Buttons to enable setting and resetting search polygon
    mapsContainerHTML += '<div style="position:absolute;top:50px;left:50px;">';
    mapsContainerHTML += '    <input type="button" value="Set Search Polygon" onclick="drawingTools.startDrawing();" />';
    mapsContainerHTML += '    <input type="button" value="Clear Search Polygon" onclick="drawingTools.clear();" />';
    mapsContainerHTML += '</div>';

    return mapsContainerHTML;
}

//  Authenticates the map and shows some locations.
function AuthenticateResultsMap(results) {
    $.post('/home/getmapcredentials', {},
        function (data) {

            if (data.mapKey === null || data.mapKey === "")
            {
                showMap = false;
                return;
            }

            var mapsContainerHTML = GetResultsMapsHTML();
            $('#maps-viewer').html(mapsContainerHTML);

            // default map coordinates
            var coordinates = [-122.32, 47.60];

            // Authenticate the map using the key 
            resultsMap = new atlas.Map('myMap', {
                center: coordinates,
                zoom: 9,
                visibility: "visible",
                width: "500px",
                height: "500px",
                style: "grayscale_dark",
                language: 'en-US',
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: data.mapKey
                }
            });

            //Wait until the map resources are ready.
            resultsMap.events.add('ready', function () {
  
                /* Construct a zoom control*/
                var zoomControl = new atlas.control.ZoomControl();
      
                /* Add the zoom control to the map*/
                resultsMap.controls.add(zoomControl, {
                    position: "bottom-right"
                    });
                });

            AddMapPoints(results);

            return;
        });
    return;
}

// Adds map points and re-centers the map based on results
function AddMapPoints(results) {
    var coordinates;

    if (mapDataSource !== null) {
        // clear the data source, add new POIs and re-center the map
        mapDataSource.clear();
        coordinates =  UpdatePOIs(results, mapDataSource);
        if (coordinates) {
            resultsMap.setCamera ({ center: coordinates });
        }
    }
    else {
        //Create a data source to add it to the map 
        mapDataSource = new atlas.source.DataSource();
        coordinates = UpdatePOIs(results, mapDataSource);
        
        //Wait until the map resources are ready for first set up.
        resultsMap.events.add('ready', function () {

            //take the last coordinates.
            if (coordinates) { resultsMap.setCamera ({ center: coordinates }); }

            //Add data source and create a symbol layer.
            resultsMap.sources.add(mapDataSource);
            var symbolLayer = new atlas.layer.SymbolLayer(mapDataSource);
            resultsMap.layers.add(symbolLayer);

            //Create a popup but leave it closed so we can update it and display it later.
            popup = new atlas.Popup({
                pixelOffset: [0, -18],
                closeButton: false
            });
            
            //Add a hover event to the symbol layer.
            resultsMap.events.add('click', symbolLayer, function (e) {
                //Make sure that the point exists.
                if (e.shapes && e.shapes.length > 0) {
                    var content, coordinate;
                    var properties = e.shapes[0].getProperties();
                    var id = properties.id;
                    var popupTemplate = `<div class="customInfobox">
                                         <div class="name" onclick="ShowDocument('${id}', ${0});" >{name}</div>
                                         <div onclick="ShowDocument('${id}', ${0});">{description}</div>
                                         </div>`;
                    content = popupTemplate.replace(/{name}/g, properties.name).replace(/{description}/g, properties.description);
                    coordinate = e.shapes[0].getCoordinates();

                    popup.setOptions({
                        //Update the content of the popup.
                        content: content,

                        //Update the popup's position with the symbol's coordinate.
                        position: coordinate

                    });

                    if (popup.isOpen() !== true) {
                        //Open the popup.
                        popup.open(resultsMap);
                    }
                    else
                    {
                        popup.close();
                    }
                }
            });

            drawingTools = new PolygonDrawingTool(resultsMap, null, function (polygon) {
                //Do something with the polygon.
                mapPolygon = polygon;
            });
        });

        // This is necessary for the map to resize correctly after the 
        // map is actually in view.
        $('#maps-pivot-link').on("click", function () {
            window.setTimeout(function () {
                map.map.resize();
            }, 100);
        });
    }
}

function UpdatePOIs(results, dataSource) {
    var coordinates;
    for (var i = 0; i < results.length; i++) {
        var result = results[i].document;
        var latlon = result?.geoLocation;
        if (latlon !== null && typeof latlon !== 'undefined') {
            if (latlon.coordinates !== null) {
                coordinates = [latlon.coordinates[0], latlon.coordinates[1]]; // longitude, latitude
                //Add the symbol to the data source.
                dataSource.add(new atlas.data.Feature(new atlas.data.Point(coordinates), {
                    name: result.metadata_storage_name,
                    description: "Learn more...",
                    id: result.metadata_storage_path
                }));
            }
        }
    }

    return coordinates;
}

function UpdateMap(data) {
    if (showMap === true) {
        if (resultsMap === null) {
            // Create the map
            AuthenticateResultsMap(data.results);
        }
        else {
            AddMapPoints(results);
        }
    }
}


function UpdateResults(data, displayPII, simpleText) {
    var resultsHtml = '';

    $("#doc-count").html(` Available Results: ${data.count}`);



    for (var i = 0; i < data.results.length; i++) {

        var result = data.results[i];
        var document = result.document;
        document.idx = i;

        var name;
        var title;
        var content;

        if (result.highlights) {
            if (result.highlights?.merged_content) {
                content = result.highlights?.merged_content[0];
            } else if (result.highlights?.content) {
                content = result.highlights?.content[0];
            }
        } else {
            content = "";
        }

        var icon = " ms-Icon--Page";
        var id = document[data.idField]; 
        var tags = GetTagsHTML(document);
        var path;
       
           
        display_pii = displayPII;
        var mrn = document.mrn;
        var recordStatus = document.recordStatus;
        var noteId = document.noteId;
        var dateOfService = document.dateOfService;
        var noteText = document.noteText;
        var maskedText = document.maskedText;
        var encounterType = document.encounterType;
        var creatingProvider = document.creatingProvider;
        var signingProvider = document.signingProvider;
        var cosignProvider = document.cosignProvider;
        var TAHJson = document.TextAnalyticsForDisplay; 

        var textToDisplay = maskedText
        if (display_pii == true)
        {
            textToDisplay = noteText;
        }
        

        if (simpleText == false) { 

            resultsHtml += `<div id="resultdiv${i}" class="demo${i}" onclick="ShowDocument('${id}', ${i + 1});">
                                    <div class="search-result">
                                        <h5>MRN: ${mrn}</h5>                                              
                                            <h5>Note Id: ${noteId}</h5>
                                            <h5>Date Of Service: ${dateOfService}</h5>
                                            <h5>Encounter Type  ${encounterType}</h5>                                            
                                            <h5>Creating Provider: ${creatingProvider}</h5>          
                                            <div id="${noteId}" class="search-result" style="border: 1px solid black; padding: 10px; margin: 10px; height:40vh">                                                                                                                                                                                                               
                                            
                                            <div>
                                        </div>
                                    </div>
                                </div>`;
        }
        else {
            resultsHtml += `<div id="resultdiv${i}" class="$demo${i}" onclick="ShowDocument('${id}', ${i + 1});">
                                    <div class="search-result">
                                            <h5>MRN: ${mrn}</h5>
                                            <h5>Note Id: ${noteId}</h5>
                                            <h5>Date Of Service: ${dateOfService}</h5>
                                            <h5>Encounter Type  ${encounterType}</h5>                                            
                                            <h5>Signing Provider: ${signingProvider}</h5>
                                            <h5>Cosign Provider: ${cosignProvider}</h5>                                        
                                        <div  id="${id}" class="search-result" style="border: 1px solid black; padding: 10px; margin: 10px; height:40vh">
                                            ${textToDisplay}
                                        </div>
                                    </div>
                                </div>`;
        }
    }

    $("#doc-details-div").html(resultsHtml);    

}

function DisplayMarkedUpText(data, display_pii) {

    for (var i = 0; i < data.results.length; i++) {
        var result = data.results[i];
        var document = result.document;

        var noteId = document.noteId;
        //var noteText = document.noteText;
        var textToDisplay = document.maskedText;
        var TAHJson = document.TextAnalyticsForDisplay;

        if (display_pii == true) {
            textToDisplay = document.noteText;
        }


        ta4h = JSON.parse(TAHJson);
        renderTextAnalyticsForHealth(noteId, textToDisplay, ta4h);
    }
}

function ShowHideTags(i) {
    var node = document.getElementById("tagdiv" + i);
    var image = document.getElementById("tagimg" + i);
    if (node.style.display === "none") {
        node.style.display = "block";
        image.src = "/images/collapse.png";
    }
    else {
        node.style.display = "none";
        image.src = "/images/expand.png";
    }

    $grid.masonry('layout');
}