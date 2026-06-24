import React from 'react';
import { WebView } from 'react-native-webview';

// A real interactive street map — OpenStreetMap tiles via Leaflet in a WebView.
// No API key, no token, no billing. Shows the user's APPROXIMATE area (a soft circle,
// never a precise pin) plus warm-density blobs. NOTE: the blobs are placeholder offsets
// until the backend supplies real check-in density — the MAP and the location are real.

export default function OsmHeatMap({ lat, lng }: { lat: number; lng: number }) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>html,body,#map{height:100%;margin:0;background:#e8e1d1}</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    var lat=${lat}, lng=${lng};
    var map=L.map('map',{zoomControl:false,attributionControl:false,dragging:true,tap:false}).setView([lat,lng],14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);
    // YOU — an approximate area, never an exact dot
    L.circle([lat,lng],{radius:420,color:'#c9734f',weight:2,dashArray:'5',fillColor:'#d98b6b',fillOpacity:0.12}).addTo(map);
    // warm density (placeholder offsets until real check-in data exists)
    var blobs=[[0.006,0.004],[-0.004,0.007],[0.005,-0.007],[-0.006,-0.003]];
    blobs.forEach(function(b,i){
      var c=[lat+b[0],lng+b[1]];
      L.circle(c,{radius:520,stroke:false,fillColor:'#9b2f7a',fillOpacity:0.28}).addTo(map);
      L.circle(c,{radius:300,stroke:false,fillColor:'#ef8a2a',fillOpacity:0.4}).addTo(map);
      L.circle(c,{radius:140,stroke:false,fillColor:'#ffe24d',fillOpacity:0.65}).addTo(map);
    });
  </script>
</body>
</html>`;
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1, backgroundColor: '#e8e1d1' }}
      scrollEnabled={false}
      androidLayerType="hardware"
    />
  );
}
