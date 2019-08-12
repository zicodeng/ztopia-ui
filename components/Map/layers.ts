import { ArcLayer, IconLayer } from '@deck.gl/layers';

export type RGB = [number, number, number];

export type RGBA = [number, number, number, number];

/**
 * [Longitude, Latitude]
 */
export type Coordinate = [number, number];

export type HoverInfo = {
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
  onHover: (hoverInfo: HoverInfo) => void;
}

/*=================================
=            Arc Layer            =
=================================*/
export const createArcLayer = (props: ArcLayerProps) => new ArcLayer(props);

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
export const createIconLayer = (props: IconLayerProps) => new IconLayer(props);

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
