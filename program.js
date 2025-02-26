// Coordenadas de Guayatá
const GUAYATA_COORDS = [5.0731, -73.4875];

// Crear mapas
let map1 = L.map('map1').setView(GUAYATA_COORDS, 15);
let map2 = L.map('map2', { zoomControl: false, attributionControl: false }).setView(GUAYATA_COORDS, 15);

// Añadir capas base
let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' });
let hybridLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Esri' });

osmLayer.addTo(map1);
hybridLayer.addTo(map2);

// Sincronizar los mapas
map1.sync(map2);
map2.sync(map1);

// Activar herramientas de edición en map1
map1.pm.addControls({ position: 'topleft' });

// Control deslizante
let slider = document.getElementById('slider');
let map2Element = document.getElementById('map2');

slider.onmousedown = function (e) {
    document.onmousemove = function (e) {
        let percentage = (e.clientX / window.innerWidth) * 100;
        if (percentage > 0 && percentage < 100) {
            slider.style.left = percentage + "%";
            map2Element.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        }
    };
};

document.onmouseup = function () {
    document.onmousemove = null;
};
