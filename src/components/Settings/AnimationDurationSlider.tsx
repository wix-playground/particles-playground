import {useCallback, useContext} from 'react';
import {getUpdateAnimationDurationMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {DEFAULT_ANIMATION_DURATION} from '../../constants';
import {SettingsSlider} from './common';

export const AnimationDurationSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);
  const duration = appProps?.animationDuration ?? DEFAULT_ANIMATION_DURATION;

  const handleDurationChange = useCallback(
    (duration: number) => {
      if (worker && !isNaN(duration)) {
        worker.postMessage(getUpdateAnimationDurationMessage(duration));
      }
    },
    [worker]
  );

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Animation Duration"
      value={duration}
      min={500}
      max={5000}
      step={100}
      onChange={handleDurationChange}
      formatValue={(value) => `${(value / 1000).toFixed(1)}s`}
      fullWidth={true}
    />
  );
};
