import DeckGL from '@deck.gl/react';
import React, { FC } from 'react';
import { StaticMap } from 'react-map-gl';

// The current mapbox-gl release requires its stylesheet be included at all times.
// The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  /**
   * The bearing is the compass direction that is "up";
   * for example,a bearing of 90° orients the map so that east is up
   */
  bearing?: number;
  /**
   * 0 is perpendicular to the surface, for a look straight down at the map,
   * while a greater value like 60 looks ahead towards the horizon.
   */
  pitch?: number;
  altitude?: number;
}

export interface MapProps {
  /**
   * <@default=`true`>
   */
  isControllerEnabled?: boolean;
  /**
   * <@default=`'100%'`>
   */
  width?: number | string;
  /**
   * <@default=`'100%'`>
   */
  height?: number | string;
  /**
   * <@default=`'streets'`>
   */
  mapStyle?: 'light' | 'dark' | 'streets' | 'outdoors' | 'satellite';
  /**
   * <@default=`{ longitude: 0, latitude: 30, zoom: 1, pitch: 0, bearing: 0 }`>
   */
  initialViewState: ViewState;
  layers: any[];
}

export const Map: FC<MapProps> = ({
  isControllerEnabled,
  width,
  height,
  mapStyle,
  initialViewState,
  layers,
}) => (
  <DeckGL
    controller={isControllerEnabled}
    initialViewState={initialViewState}
    layers={layers}
  >
    <StaticMap
      reuseMap
      preventStyleDiffing
      width={width!}
      height={height!}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle={`mapbox://styles/mapbox/${mapStyle}-v9`}
    />
  </DeckGL>
);

Map.defaultProps = {
  isControllerEnabled: true,
  width: '100%',
  height: '100%',
  mapStyle: 'streets',
  initialViewState: {
    longitude: 0,
    latitude: 30,
    zoom: 1,
    pitch: 0,
    bearing: 0,
  },
};
