// import './style.css';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
  container: 'map',
  center: [139.5787562, 35.7024594],
  zoom: 13,
  minZoom: 4,
  maxZoom: 18,
  // maxBounds:[122, 20, 154, 50],
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
      pmtiles :{
        type: 'vector',
        url: 'pmtiles://https://test-pmtiles.s3.ap-northeast-1.amazonaws.com/jstat-district/chochomoku_all_fix.pmtiles',
        attribution: '&copy; <a href="https://www.e-stat.go.jp/gis/statmap-search?page=1&type=2&aggregateUnitForBoundary=A&toukeiCode=00200521" target="_blank">2020年国勢調査小地域（町丁・字等別）の境界データを加工し作成</a>',
      }
    },
    layers: [
      {
        id: 'gsi-layer',
        source: 'gsi',
        type: 'raster',
      },
      {
        id: 'pmtiles-layer',
        source: 'pmtiles',
        'source-layer': 'chochomoku_allgeojsonl',
        type: 'line',
        paint: {
          'line-color': 'rgba(0, 73, 147, 1)',
          'line-width': 1.5
        },
      },
    ]
  },
})