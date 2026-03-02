// --- CONFIGURACIÓN CON TUS DATOS ---
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNyb2phcyIsImEiOiJjbW04ZTZjdHkwZzFwMnBvcGdsYmN3NWcwIn0.-nw5ysjrXaulShJq4oLGHA';

    const firebaseConfig = {
        apiKey: "AIzaSyB--VHi8K8gZrNoMBnNwye1tASudsFYGuY",
        authDomain: "pruebamobile-bc7df.firebaseapp.com",
        databaseURL: "https://pruebamobile-bc7df-default-rtdb.firebaseio.com",
        projectId: "pruebamobile-bc7df",
        storageBucket: "pruebamobile-bc7df.firebasestorage.app",
        messagingSenderId: "647363784660",
        appId: "1:647363784660:web:abf2e98e2e0f4fa6437041",
        measurementId: "G-72J8MQ0QVV"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const locationsRef = database.ref('ubicaciones');

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-64.6855, -16.2902],
        zoom: 5
    });

    let marker = null;

    locationsRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        updateTable(data);
        updateMap(data);
    });

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        const row = tableBody.insertRow(0);

        row.insertCell(0).innerText = data.hora;
        row.insertCell(1).innerText = data.latitud.toFixed(6);
        row.insertCell(2).innerText = data.longitud.toFixed(6);
    }

    function updateMap(data) {
        const coords = [data.longitud, data.latitud];

        map.flyTo({ 
            center: coords, 
            zoom: 17, 
            essential: true 
        });

        if (marker) {
            marker.setLngLat(coords);
        } else {
            marker = new mapboxgl.Marker({ color: 'red' })
                .setLngLat(coords)
                .addTo(map);
        }
    }