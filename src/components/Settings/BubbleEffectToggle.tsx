import {useCallback, useContext} from 'react';
import {getUpdateEnableBubblesMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import styles from './Settings.module.css';

export const BubbleEffectToggle = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleToggleBubbles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (worker) {
        worker.postMessage(getUpdateEnableBubblesMessage(event.target.checked));
      }
    },
    [worker]
  );

  if (!appProps) return null;

  return (
    <label className={styles['setting-toggle']}>
      <span>Bubble Effect</span>
      <input
        className={styles['setting-checkbox']}
        type="checkbox"
        id="bubble-toggle"
        checked={appProps.enableBubbles}
        onChange={handleToggleBubbles}
      />
    </label>
  );
};
