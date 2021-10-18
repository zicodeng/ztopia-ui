import {
  ArcLayer,
  IconLayer,
  ScatterplotLayer,
} from '@deck.gl/layers/dist/esm';

export type RGB = [number, number, number];

export type RGBA = [number, number, number, number];

/**
 * [Longitude, Latitude]
 */
export type Coordinate = [number, number];

export type Info = {
  x: number;
  y: number;
  object: any;
};

export interface LayerProps {
  pickable?: boolean;
  /**
   * If true, current object pointed by mouse pointer (when hovered over) is highlighted with `highlightColor`
   */
  autoHighlight?: boolean;
  /**
   * Whether the layer is visible. Under most circumstances,
   * using `visible` prop to control the visibility of layers are recommended over doing conditional rendering
   */
  visible?: boolean;
  opacity?: number;
  id: string;
  highlightColor?: RGBA;
  data: any[];
  onHover?: (info: Info) => void;
  onClick?: (info: Info) => void;
}

/*=================================
=            Arc Layer            =
=================================*/
export const createArcLayer = (props: ArcLayerProps): any =>
  new ArcLayer(props);

export interface ArcLayerProps extends LayerProps {
  getWidth?: number;
  getSourcePosition: (datum: any) => Coordinate;
  getTargetPosition: (datum: any) => Coordinate;
  getSourceColor?: (datum: any) => RGB;
  getTargetColor?: (datum: any) => RGB;
}
/*=====  End of Arc Layer  ======*/

/*==================================
=            Icon Layer            =
==================================*/
export const createIconLayer = (props: IconLayerProps): any =>
  new IconLayer(props);

export interface IconLayerProps extends LayerProps {
  sizeScale: number;
  getIcon: (datum: any) => Icon;
  getSize: (datum: any) => number;
  getColor: (datum: any) => RGB;
  getPosition: (datum: any) => Coordinate;
}

export interface Icon {
  width: number;
  height: number;
  /**
   * Horizontal position of icon anchor
   */
  anchorX?: number;
  /**
   * Vertical position of icon anchor
   */
  anchorY?: number;
  url: string;
  id?: string;
}
/*=====  End of Icon Layer  ======*/

/*=========================================
=            Scatterplot Layer            =
=========================================*/
export const createScatterplotLayer = (props: ScatterplotLayerProps): any =>
  new ScatterplotLayer(props);

export interface ScatterplotLayerProps extends LayerProps {
  stroked?: boolean;
  filled?: boolean;
  /**
   * When zooming in and out, meter sizes scale with the base map, and pixel sizes remain the same on screen
   */
  lineWidthUnits?: 'meters' | 'pixels';
  /**
   * A global line width multiplier for all points
   */
  lineWidthScale?: number;
  lineWidthMinPixels?: number;
  lineWidthMaxPixels?: number;
  /**
   * A global radius multiplier for all points
   */
  radiusScale?: number;
  radiusMinPixels?: number;
  radiusMaxPixels?: number;
  getPosition?: (datum: any) => Coordinate;
  getRadius?: number | ((datum: any) => number);
  getFillColor?: RGBA | ((datum: any) => RGBA);
  getLineColor?: RGBA | ((datum: any) => RGBA);
}
/*=====  End of Scatterplot Layer  ======*/
