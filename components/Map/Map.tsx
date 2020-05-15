import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import { FlyToInterpolator } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';

// The current mapbox-gl release requires its stylesheet be included at all times.
// The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

const DEFAULT_VIEW_STATE = {
  longitude: 0,
  latitude: 30,
  zoom: 1,
  pitch: 0,
  bearing: 0,
};

export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  /**
   * The bearing is the compass direction that is "up";
   * for example, a bearing of 90° orients the map so that east is up
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
   * <@default=`'dark'`>
   */
  mapStyle?: 'light' | 'dark' | 'streets' | 'outdoors' | 'satellite';
  /**
   * <@default=`{ longitude: 0, latitude: 30, zoom: 1, pitch: 0, bearing: 0 }`>
   */
  viewState?: ViewState;
  layers?: any[];
}

const VIEW_STATE_TRANSITION = {
  transitionDuration: 2500,
  transitionInterpolator: new FlyToInterpolator(),
};

export const Map: FC<MapProps> = memo(
  ({
    isControllerEnabled = true,
    width = '100%',
    height = '100%',
    mapStyle = 'streets',
    viewState: initialViewState = DEFAULT_VIEW_STATE,
    layers,
  }) => {
    const [viewState, setViewState] = useState({
      ...initialViewState,
      ...VIEW_STATE_TRANSITION,
    });

    useEffect(() => {
      setViewState({
        ...viewState,
        ...initialViewState,
        ...VIEW_STATE_TRANSITION,
      });
    }, [initialViewState]);

    const handleViewStateChange = useCallback(({ viewState }) => {
      setViewState(viewState);
    }, []);

    return (
      <DeckGL
        width={width}
        height={height}
        controller={isControllerEnabled}
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        layers={layers}
      >
        <StaticMap
          reuseMap
          preventStyleDiffing
          width={width}
          height={height}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapStyle}-v9`}
        />
      </DeckGL>
    );
  },
);
