'use client';

import ml, { Feature } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { use, useEffect, useRef, useState } from 'react';
import '@/assets/Map.css';

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
(MapboxDraw as any).constants.classes.CANVAS = 'maplibregl-canvas';
(MapboxDraw as any).constants.classes.CONTROL_BASE = 'maplibregl-ctrl';
(MapboxDraw as any).constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
(MapboxDraw as any).constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';
(MapboxDraw as any).constants.classes.ATTRIBUTION = 'maplibregl-ctrl-attrib';

import theme from '@/hooks/themeMapBoxDraw';


interface DrawMapProps {
    features: any | null;
    handledraw: (feature: any) => void;
}


export default function DrawMap({ features, handledraw: draw }: DrawMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance: any = useRef<ml.Map | null>(null);
    const drawmapboxInstance: any = useRef<MapboxDraw | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = new ml.Map({
                container: mapRef.current,
                style: 'https://api.maptiler.com/maps/hybrid/style.json?key=OLbko2UQ2lnSd8sbTpFz',
                center: [102.75685, 14.29829],
                zoom: 14,
                fadeDuration: 50,
                canvasContextAttributes: { antialias: true },
                maxPitch: 85,
                hash: true,
            });
            mapInstance.current = map;
            map.on('load', () => {
                InitLayer(mapInstance.current);
                MapboxDrawTools(mapInstance.current);
            })

            return () => {
                mapInstance.current?.remove();
                mapInstance.current = null;
            }


        }
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    function InitLayer(map: any) {
        if (!map.getSource('s-geojson')) {
            map.addSource('s-geojson', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });

            // point-Icon
            mapInstance.current.addLayer({
                id: 'point_Icons',
                type: "symbol",
                source: 's-geojson',
                filter: [
                    "all",
                    ["==", ["geometry-type"], "Point"],
                    ["has", "icon"]
                ],
                layout: {
                    "icon-image": ["get", "icon"],
                    "icon-size": ['coalesce', ['get', 'iconSize'], 0.4],
                    "icon-allow-overlap": true,
                },
            });


            // point_layer
            mapInstance.current.addLayer({
                id: 'point_layer',
                type: 'circle',
                source: 's-geojson',
                filter: [
                    "all",
                    ["==", ["geometry-type"], "Point"],
                    ["!", ["has", "icon"]]
                ],
                paint: {
                    'circle-color': ['coalesce', ['get', 'circle-color'], '#f59b00'],
                    'circle-opacity': ['coalesce', ['get', 'circle-opacity'], 1],
                    'circle-stroke-color': ['coalesce', ['get', 'circle-stroke-color'], '#dcd4c7'],
                    'circle-stroke-width': ['coalesce', ['get', 'circle-stroke-width'], 1.5]
                },
            });

            // polygon_layer
            mapInstance.current.addLayer({
                id: 'polygon_layer',
                type: 'fill',
                source: 's-geojson',
                filter: [
                    "all",
                    ['==', ['geometry-type'], 'Polygon'],
                    // ['==', ['get', 'elevation'], 0],
                ],
                paint: {
                    'fill-color': ['coalesce', ['get', 'fill'], '#00FCFF'],
                    'fill-opacity': ['coalesce', ['get', 'fill-opacity'], 0.3],
                },
            });
            // prism_layer
            mapInstance.current.addLayer({
                id: 'prism_layer',
                type: 'fill-extrusion',
                source: 's-geojson',
                filter: [
                    "all",
                    ['==', ['geometry-type'], 'Polygon'],
                    ['has', 'elevation'],
                    ['>', ['get', 'elevation'], 0],
                    ['!=', ['get', 'elevation'], null]
                ],
                paint: {
                    'fill-extrusion-color': ['coalesce', ['get', 'fill'], '#00FCFF'],
                    'fill-extrusion-height': ['get', 'elevation'],
                    'fill-extrusion-opacity': 0.7,
                },
            });
            // polygon_line
            mapInstance.current.addLayer({
                id: 'polygon_line',
                type: 'line',
                source: 's-geojson',
                filter: ['==', ['geometry-type'], 'LineString'],
                paint: {
                    'line-color': ['coalesce', ['get', 'fill'], '#00FCFF'],
                    'line-width': ['coalesce', ['get', 'line-width'], 2],
                },
            });
        }
    }


    function MapboxDrawTools(map: any) {
        if (!map || drawmapboxInstance.current) return;
        const draw: any = new MapboxDraw({
            styles: theme,
            controls: {
                // point: false,
                // line_string: true,
                // polygon: false,
                trash: false,
                combine_features: false,
                uncombine_features: false,
            },
        });
        map.addControl(draw, 'top-left');
        map.on('draw.create', eventHandlerMap);
        drawmapboxInstance.current = draw;
    };

    // ==== Tools
    function eventHandlerMap(event: any, map: any) {
        switch (event.type) {
            case 'draw.create': // MAP BOX DRAW
                setTimeout(() => {
                    const [feature] = event.features;
                    drawmapboxInstance.current.delete(feature.id);
                    draw(feature);
                }, 0);
                break;
        }
    }

    useEffect(() => {
        if (features) {
            const source = mapInstance.current.getSource('s-geojson');
            if (source) {
                source.setData({
                    type: 'FeatureCollection',
                    features: [features],
                });
            }
        }
    }, [features]);


    return (
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    )
}