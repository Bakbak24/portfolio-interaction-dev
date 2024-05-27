var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var locations = [
    { name: "Location 1", coords: [51.5, -0.09], challenge: "Solve a riddle!" },
    { name: "Location 2", coords: [51.51, -0.17], challenge: "Find the hidden object!" },
    { name: "Location 3", coords: [51.49, -0.14], challenge: "Answer a question!" },
    { name: "Location 4", coords: [51.52, -0.11], challenge: "Complete a physical challenge!" },
    { name: "Location 5", coords: [51.48, -0.10], challenge: "Take a photo!" }
];

locations.forEach(location => {
    L.marker(location.coords).addTo(map).bindPopup(location.challenge);
});

// Functie om afstand tussen twee punten te berekenen
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius van de aarde in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Afstand in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function checkNearbyLocations(lat, lon) {
    locations.forEach(location => {
        var distance = getDistanceFromLatLonInKm(lat, lon, location.coords[0], location.coords[1]);
        if (distance < 0.1) {
            alert("You are near " + location.name + "! " + location.challenge);
        }
    });
}

if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        checkNearbyLocations(lat, lon);
        map.setView([lat, lon], 13);
    });
} else {
    alert("Geolocation is not supported by this browser.");
}