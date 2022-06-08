import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{NavigationControl} from 'react-map-gl';

import DrawControl from './draw-control';
import ControlPanel from './control-panel';

const TOKEN = 'pk.eyJ1IjoibWFobW91ZG1vc3RhZmEiLCJhIjoiY2p1MnV2aGszMGdpbTN6cDhlbTI3NGJzcyJ9.jHD9nS8XYnMjmDBMiQnyNQ'; // Set your mapbox token here

export default function App() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken='pk.eyJ1IjoibWFobW91ZG1vc3RhZmEiLCJhIjoiY2p1MnV2aGszMGdpbTN6cDhlbTI3NGJzcyJ9.jHD9nS8XYnMjmDBMiQnyNQ'
      >
          <NavigationControl position="top-left" />

          <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
