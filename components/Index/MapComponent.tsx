'use client';
import ml from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';
import '@/assets/Map.css';

import BaseMapControl from './BaseMapControl';
import { thailand_adm0 } from '@/actions/action';


export default function MapComponent() {

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance: any = useRef<ml.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = new ml.Map({
        container: mapRef.current,
        style: 'https://api.maptiler.com/maps/hybrid/style.json?key=OLbko2UQ2lnSd8sbTpFz',
        center: [102.75685, 14.29829],
        // center: [33.516058440388605, 16.687466127144575],
        zoom: 14,
        fadeDuration: 50,
        canvasContextAttributes: { antialias: true },
        maxPitch: 85,
        hash: true,
      });
      mapInstance.current = map;

      mapInstance.current.on('load', async () => {
        // loadThaiGeojson()
      })

      return () => {
        mapInstance.current?.remove();
        mapInstance.current = null;
      }

    }

    async function loadThaiGeojson() {
      const geojson = await thailand_adm0()
      // if (!res.ok) throw new Error();
      // const geojson = await res.json();

      mapInstance.current.addSource('thai-region', {
        type: 'geojson',
        data: geojson,
      });

      mapInstance.current.addLayer({
        id: 'RTA-thai-region-line',
        type: 'line',
        source: 'thai-region',
        paint: {
          'line-color': '#0000ff',
          'line-width': 0.9,
        },
      });
    }




    function switchMapStyle(layerId: string, url: string) {
      const customData: any = { sources: {}, layers: [], images: {} };
      const currentStyle = mapInstance.current.getStyle();
      // --- save custom sources/layers/images ---
      for (const [id, source] of Object.entries(currentStyle.sources)) {
        if (!(source as any).url) customData.sources[id] = source;
      }
      for (const layer of currentStyle.layers) {
        if (customData.sources[(layer as any).source]) customData.layers.push(layer);
      }
      const imageIds = mapInstance.current.listImages().filter((id: any) => id.startsWith("customImg-"));
      for (const id of imageIds) {
        customData.images[id] = mapInstance.current.getImage(id);
      }
      // --- set new style ---
      mapInstance.current.setStyle(url);

      mapInstance.current.once("styledata", () => {
        setTimeout(() => {
          // --- restore custom sources/layers/images ---
          const { sources, layers, images } = customData;
          for (const [id, source] of Object.entries(sources)) {
            if (!mapInstance.current.getSource(id)) mapInstance.current.addSource(id, source);
          }
          for (const layer of layers) {
            if (!mapInstance.current.getLayer((layer as any).id)) mapInstance.current.addLayer(layer);
          }
          for (const [id, img] of Object.entries(images)) {
            if (!mapInstance.current.hasImage(id)) mapInstance.current.addImage(id, (img as any).data);
          }
          if (mapInstance.current.getLayer('hills')) mapInstance.current.removeLayer('hills');
          if (mapInstance.current.getSource('terrainSource')) mapInstance.current.removeSource('terrainSource');
        }, 100);
      });
    }


    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className='w-full h-full relative'>
      <BaseMapControl />
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}