import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateLayerOffsetDistanceMessage} from '../../interfaces';
import {SettingsSlider} from './common';

export const LayerOffsetDistanceSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleOffsetDistanceChange = useCallback((distance: number) => {
    if (worker) {
      worker.postMessage(getUpdateLayerOffsetDistanceMessage(distance));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Layer Distance:"
      value={appProps.layerOffsetDistance}
      min={1}
      max={20}
      step={1}
      onChange={handleOffsetDistanceChange}
      formatValue={(value) => `${value}px`}
      fullWidth={true}
    />
  );
};
