import {useCallback, useContext} from 'react';
import {getUpdateDelayMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {DEFAULT_DELAY} from '../../constants';
import {SettingsSlider} from './common';

export const DelaySlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);
  const delay = appProps?.delay ?? DEFAULT_DELAY;

  const handleDelayChange = useCallback(
    (delay: number) => {
      if (worker && !isNaN(delay)) {
        worker.postMessage(getUpdateDelayMessage(delay));
      }
    },
    [worker]
  );

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Staggered emission"
      value={delay}
      min={0}
      max={3000}
      step={100}
      onChange={handleDelayChange}
      formatValue={(value) => `${(value / 1000).toFixed(1)}s`}
      fullWidth={true}
    />
  );
};
