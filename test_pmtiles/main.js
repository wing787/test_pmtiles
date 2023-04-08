// import './style.css';
import maplibre from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibre.Map({
  container: 'map',
  center: [138, 37],
  zoom: 5,
  minZoom: 5,
  maxZoom: 18,
  maxBounds:[122, 20, 154, 50],
  style: {
    version: 8,
    sources: {
      gsi: {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
        tileSize: 256,  // Tile size in pixels, default is 512
        maxzoom: 19,
        attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
      },
    },
    layers: [
      {
        id: 'gsi-layer',
        source: 'gsi',
        type: 'raster',
      },
    ]
  },
})