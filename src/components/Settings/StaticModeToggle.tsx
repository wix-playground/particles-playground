import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateEnableStaticModeMessage} from '../../interfaces';
import {DATA_TEST_IDS} from '../../constants';
import styles from './Settings.module.css';

export const StaticModeToggle = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleToggleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (worker) {
      worker.postMessage(getUpdateEnableStaticModeMessage(e.target.checked));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <label className={styles['setting-toggle']}>
      <span>Static Rendering Mode</span>
      <input
        className={styles['setting-checkbox']}
        type="checkbox"
        data-testid={DATA_TEST_IDS.STATIC_MODE_TOGGLE}
        checked={appProps.enableStaticMode}
        onChange={handleToggleChange}
      />
    </label>
  );
};
