var mapsPlaceholder = [];

console.log("waiting for leaflet library to load...");
waitForElement();

function waitForElement(){
    if(typeof L !== "undefined"){
        console.log("leaflet library loaded, adding hook for map!");
        L.Map.addInitHook(function () {
            console.log("map loaded! addiong coordinates hook!");
            this.on('contextmenu', function(e) {
                var lt = String(calculateLatitude(e.latlng.lat));
                var lg = String(calculateLongitude(e.latlng.lng));
                prompt("Latitude and longitude for right click:", lt + ", " + lg);
            });
            console.log("waiting 10 seconds to inject marker coordinates");
            setTimeout(applyMarketCoordinates, 10000);
            console.log("pushing map reference to global variable for testing");
            mapsPlaceholder.push(this);
        });
    }
    else{
        setTimeout(waitForElement, 250);
    }
}

function applyMarketCoordinates() {
    console.log("injecting marker coordinates!");
    mapsPlaceholder[0].eachLayer(function(layer){
        if(layer.hasOwnProperty("_popup")) {
            let popup = layer._popup;
            if(popup.hasOwnProperty("_content")) {
                if(layer.hasOwnProperty("_latlng")) {
                    var lt = String(calculateLatitude(layer._latlng.lat));
                    var lg = String(calculateLongitude(layer._latlng.lng));
                    popup._content = popup._content.concat("<br>", lt + ", " + lg);
                }
            }
        }
    });
}

//finland/russia southern point: 
// - leaflet: 59.44507509904714, 61.74316406249999
// - gmaps: 60.513647450623296, 27.77397530558015
function calculateLatitude(lt) {
    return lt;
}

function calculateLongitude(lg) {
    return lg - 34;
}