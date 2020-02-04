import React from 'react';
import {usePosition} from './usePosition';
const GeoLoc = () => {
  const {latitude, longitude, error} = usePosition();
  return (
    <code>
      latitude: {latitude}<br/>
      longitude: {longitude}<br/>
      error: {error}
    </code>
  );
};

export default GeoLoc
