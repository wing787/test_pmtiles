// import './style.css';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';

// parameters
let polygons_outline_width = 2.5;
let polygons_outline_color = 'rgba(0, 0, 205, 1)';

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
        // 地理院タイル 標準地図
        // tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
        // 地理院タイル 淡色地図
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
        tileSize: 256,  // Tile size in pixels, default is 512
        maxzoom: 19,
        attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
      },
      pmtiles_town :{
        type: 'vector',
        url: 'pmtiles://https://test-pmtiles.s3.ap-northeast-1.amazonaws.com/jstat-district/chochomoku_all_fix.pmtiles',
        attribution: '&copy; <a href="https://www.e-stat.go.jp/gis/statmap-search?page=1&type=2&aggregateUnitForBoundary=A&toukeiCode=00200521" target="_blank">2020年国勢調査小地域（町丁・字等別）の境界データを加工し作成</a>',
      },
      pmtiles_city :{
        type: 'vector',
        url: 'pmtiles://https://test-pmtiles.s3.ap-northeast-1.amazonaws.com/kokudosuuchi/city_master.pmtiles',
        attribution: '&copy; <a href="https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html" target="_blank">国土数値情報 - 行政区域データ - </a>',
      }
    },
    layers: [
      {
        id: 'gsi-layer',
        source: 'gsi',
        type: 'raster',
      },
      {
        id: 'pmtiles_town-layer',
        source: 'pmtiles_town',
        'source-layer': 'chochomoku_allgeojsonl',
        type: 'line',
        minzoom: 12.5,
        paint: {
          'line-color': polygons_outline_color,
          'line-width': polygons_outline_width
        },
      },
      {
        id: 'pmtiles_city-layer',
        source: 'pmtiles_city',
        'source-layer': 'city_mastergeojsonl',
        type: 'line',
        maxzoom: 12.5,
        paint: {
          'line-color': polygons_outline_color,
          'line-width': polygons_outline_width
        }
      }
    ]
  },
});
map.on('zoom', function() {
  var zoom = map.getZoom();
  document.getElementById('zoom-value').innerText = zoom.toFixed(2); // 四捨五入して2桁の小数に設定
});