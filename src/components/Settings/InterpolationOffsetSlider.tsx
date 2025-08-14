import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateInterpolationOffsetMessage} from '../../interfaces';
import {DATA_TEST_IDS} from '../../constants';
import {SettingsSlider} from './common';

export const InterpolationOffsetSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleOffsetChange = useCallback((offset: number) => {
    if (worker) {
      worker.postMessage(getUpdateInterpolationOffsetMessage(offset));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Animation Offset:"
      value={appProps.interpolationOffset}
      min={0}
      max={2000}
      step={50}
      onChange={handleOffsetChange}
      formatValue={(value) => `${value}ms`}
      data-testid={DATA_TEST_IDS.INTERPOLATION_OFFSET_SLIDER}
      fullWidth={true}
    />
  );
};
