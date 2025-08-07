import {useCallback, useContext} from 'react';
import {getUpdateAnimationDurationMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {DEFAULT_ANIMATION_DURATION} from '../../constants';
import styles from './Settings.module.css';

export const AnimationDurationSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);
  const duration = appProps?.animationDuration ?? DEFAULT_ANIMATION_DURATION;

  const handleDurationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const duration = parseInt(event.target.value, 10);
      if (worker && !isNaN(duration)) {
        worker.postMessage(getUpdateAnimationDurationMessage(duration));
      }
    },
    [worker]
  );

  if (!appProps) return null;

  return (
    <div className={styles['setting-row--column']}>
      <label className={styles['setting-label--full-width']}>
        Animation Duration
      </label>
      <div className={styles['setting-row']}>
        <input
          className={styles['setting-slider']}
          type="range"
          min="500"
          max="5000"
          step="100"
          value={duration}
          onChange={handleDurationChange}
        />
        <span className={styles['setting-value']}>
          {(duration / 1000).toFixed(1)}s
        </span>
      </div>
    </div>
  );
};
