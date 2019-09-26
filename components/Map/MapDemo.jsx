import { useState } from 'react';

export const ViewStateTransitionDemo = ({ children }) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 30,
    zoom: 1,
    pitch: 0,
    bearing: 0,
  });

  const updateViewState = () => {
    setViewState({
      ...viewState,
      longitude: Math.random() * 360 - 180,
      latitude: Math.random() * 180 - 90,
      zoom: Math.random() * 10,
      pitch: Math.random() * 90,
      bearing: Math.random() * 180,
    });
  };

  return children({ viewState, updateViewState });
};
