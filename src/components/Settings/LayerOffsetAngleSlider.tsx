import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateLayerOffsetAngleMessage} from '../../interfaces';
import {SettingsSlider} from './common';

export const LayerOffsetAngleSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleOffsetAngleChange = useCallback((angle: number) => {
    if (worker) {
      worker.postMessage(getUpdateLayerOffsetAngleMessage(angle));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Shadow Direction:"
      value={appProps.layerOffsetAngle}
      min={0}
      max={360}
      step={15}
      onChange={handleOffsetAngleChange}
      formatValue={(value) => `${value}°`}
      fullWidth={true}
    />
  );
};
