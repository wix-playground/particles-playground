import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateSizeInterpolationPercentageMessage} from '../../interfaces';
import {DATA_TEST_IDS} from '../../constants';
import {SettingsSlider} from './common';

export const SizeInterpolationSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleSizeInterpolationChange = useCallback((percentage: number) => {
    if (worker) {
      worker.postMessage(getUpdateSizeInterpolationPercentageMessage(percentage));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Size Interpolation:"
      value={appProps.sizeInterpolationPercentage}
      min={0}
      max={100}
      step={1}
      onChange={handleSizeInterpolationChange}
      formatValue={(value) => `${value}%`}
      data-testid={DATA_TEST_IDS.SIZE_INTERPOLATION_SLIDER}
      fullWidth={true}
    />
  );
};
