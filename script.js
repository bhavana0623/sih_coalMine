var map = L.map('map').setView([20.5937789629, 78.9629], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

location_cords = {
    "def":[0,0],
    "home":[13,25],
    "london":[51.507351,-0.127758],

}

const coalMinesIndia = {
    "Jharia": {
        "name": "Jharia",
        "coordinates": [23.7461, 86.4145],
        "state": "Jharkhand",
         "coalProduced": "3.5 million tonnes/year",
        "carbonEmission": "2.1 million tonnes/year"
    },
    "Raniganj": {
        "name": "Raniganj",
        "coordinates": [23.6362, 87.0801],
        "state": "West Bengal"
    },
    "Bokaro": {
        "name": "Bokaro",
        "coordinates": [23.6693, 86.1511],
        "state": "Jharkhand"
    },
    "Korba": {
        "name": "Korba",
        "coordinates": [22.3595, 82.7501],
        "state": "Chhattisgarh"
    },
    "Talcher": {
        "name": "Talcher",
        "coordinates": [20.9507, 85.2335],
        "state": "Odisha"
    },
    "Singrauli": {
        "name": "Singrauli",
        "coordinates": [24.1992, 82.6752],
        "state": "Madhya Pradesh"
    },
    "Sohagpur": {
        "name": "Sohagpur",
        "coordinates": [23.2585, 81.3406],
        "state": "Madhya Pradesh"
    },
    "Makum": {
        "name": "Makum",
        "coordinates": [27.4866, 95.5566],
        "state": "Assam"
    },
    "Chandrapur": {
        "name": "Chandrapur",
        "coordinates": [20.0452, 79.2949],
        "state": "Maharashtra"
    },
    "Wardha Valley": {
        "name": "Wardha Valley",
        "coordinates": [20.4559, 78.5483],
        "state": "Maharashtra"
    }
};

for (var mine in coalMinesIndia) {
    if (coalMinesIndia.hasOwnProperty(mine)) {
        var data = coalMinesIndia[mine];
        var coords = data.coordinates;
        var name = data.name;
        var state = data.state;


        // var redIcon = L.icon({
        //     iconUrl: 'https://img.icons8.com/color/48/000000/marker.png', // Example marker image URL
        //     iconSize: [32, 32],
        //     iconAnchor: [16, 32],
        //     popupAnchor: [0, -32]
        // });
    
        
        L.marker([coords[0], coords[1]],  )
            .addTo(map)
            .bindPopup(`<b>${name}</b><br>${state}`) 
            
        
        var marker = L.marker([coords[0], coords[1]])
            .addTo(map)
            .bindPopup(`<b>${name}</b><br>${state}`)
            .on('click', function() {
                
        var latlng = this.getLatLng();
                map.flyTo(latlng, 13, {
                    duration: 2 
                });
            });
            


    }
}








document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    search(); 
});


navigator.geolocation.getCurrentPosition((position)=>{
    console.log("current location-"+ position.coords.latitude + ',' + position.coords.longitude);
    // map.setView([position.coords.latitude, position.coords.longitude], 5);
})





input_btn = document.getElementById('input-btn')
input_info = document.getElementById('search-input')

function search() {
    var input_info = document.getElementById('search-input');
    var mineInfoDiv = document.getElementById('mine-info');
    
    if (input_info) {
        var locationName = input_info.value.trim();
        var mine = coalMinesIndia[locationName];

        if (mine && mine.coordinates) {
            console.log("Coordinates for", locationName, ":", mine.coordinates);
            map.flyTo(mine.coordinates, 13, {
                duration: 2 // Duration of the transition in seconds
            });

            // Populate the mine-info div with the mine details
            mineInfoDiv.innerHTML = `
                <h2>${mine.name}</h2>
                <p><strong>State:</strong> ${mine.state}</p>
                <p><strong>Coal Produced:</strong> ${mine.coalProduced}</p>
                <p><strong>Carbon Emission:</strong> ${mine.carbonEmission}</p>
            `;

            // Display the mine-info div
            mineInfoDiv.style.display = 'block';

            console.log("Map rendered and mine info displayed.");
        } else {
            console.log("Coal mine not found or incorrect location name.");
            mineInfoDiv.style.display = 'none'; // Hide if location not found
        }
    }
}






// used to display list of stored coal mines
function populateTicker() {
    const ticker = document.getElementById('ticker');
    const mineNames = Object.keys(coalMinesIndia).join(' • '); // Join names with a separator

    ticker.textContent = mineNames; // Set the ticker text
}

populateTicker(); 



