import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateLayerOpacityDecayMessage} from '../../interfaces';
import {SettingsSlider} from './common';

export const LayerOpacityDecaySlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleOpacityDecayChange = useCallback((decay: number) => {
    if (worker) {
      worker.postMessage(getUpdateLayerOpacityDecayMessage(decay));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Opacity Decay:"
      value={appProps.layerOpacityDecay}
      min={0.1}
      max={0.9}
      step={0.1}
      onChange={handleOpacityDecayChange}
      formatValue={(value) => `${(value * 100).toFixed(0)}%`}
      fullWidth={true}
    />
  );
};
