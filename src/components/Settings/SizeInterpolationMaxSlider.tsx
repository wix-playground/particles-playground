import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateSizeInterpolationMaxMessage} from '../../interfaces';
import {DATA_TEST_IDS} from '../../constants';
import {SettingsSlider} from './common';

export const SizeInterpolationMaxSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleMaxSizeChange = useCallback((maxSize: number) => {
    if (worker) {
      worker.postMessage(getUpdateSizeInterpolationMaxMessage(maxSize));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Max Size:"
      value={appProps.sizeInterpolationMax}
      min={0.5}
      max={3.0}
      step={0.1}
      onChange={handleMaxSizeChange}
      formatValue={(value) => `${value.toFixed(1)}x`}
      data-testid={DATA_TEST_IDS.SIZE_INTERPOLATION_MAX_SLIDER}
      fullWidth={true}
    />
  );
};
