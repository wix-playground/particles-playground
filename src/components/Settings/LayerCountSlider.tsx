import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateLayerCountMessage} from '../../interfaces';
import {SettingsSlider} from './common';

export const LayerCountSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleLayerCountChange = useCallback((count: number) => {
    if (worker) {
      worker.postMessage(getUpdateLayerCountMessage(count));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Layer Count:"
      value={appProps.layerCount}
      min={1}
      max={5}
      step={1}
      onChange={handleLayerCountChange}
      fullWidth={true}
    />
  );
};
