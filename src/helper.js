import React from 'react';
import { render } from 'react-dom';

const hasWindow = (typeof window !== 'undefined');

export const isFun = (arg) => {
  return !!arg && (typeof arg === 'function');
};

export const toCapitalString = (str) => {
  return str[0].toUpperCase() + str.slice(1, str.length);
};

export const getAMapPosition = (pos) => {
  if (!pos) {
    return pos;
  }
  if ('getLng' in pos) {
    return pos;
  }
  return hasWindow ? new window.AMap.LngLat(pos.longitude, pos.latitude) : null;
};

export const getAMapPixel = (ofst) => {
  if (!ofst) {
    return ofst;
  }
  if ('getX' in ofst) {
    return ofst;
  }
  return hasWindow ? new window.AMap.Pixel(ofst[0], ofst[1]) : null;
};

export const MarkerConfigurableProps = [
  'position',
  'offset',
  'icon',
  'content',
  'draggable',
  'visible',
  'zIndex',
  'angle',
  'animation',
  'shadow',
  'title',
  'clickable',
  'extData',
  'label'
];

export const MarkerAllProps = MarkerConfigurableProps.concat([
  'topWhenClick',
  'bubble',
  'raiseOnDrag',
  'cursor',
  'autoRotation',
  'shape'
]);

export const getPropValue = (key, value) => {
  if (MarkerAllProps.indexOf(key) === -1) {
    return null;
  }
  if (key === 'position') {
    return getAMapPosition(value);
  } else if (key === 'offset') {
    return getAMapPixel(value);
  }
  return value;
};


export const renderMarkerComponent = (component, marker) => {
  let child = component;
  if (isFun(component)) {
    const extData = marker.getExtData();
    child = component(extData);
  }
  render(<div>{child}</div>, marker.getContent());
};
