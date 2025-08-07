import {useCallback, useContext} from 'react';
import {getUpdateEnableImageParticlesMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import styles from './Settings.module.css';

export const ImageParticleToggle = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleToggleImageParticles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (worker) {
        worker.postMessage(getUpdateEnableImageParticlesMessage(event.target.checked));
      }
    },
    [worker]
  );

  if (!appProps) return null;

  return (
    <label className={styles['setting-toggle']}>
      <span>Image Particles</span>
      <input
        className={styles['setting-checkbox']}
        type="checkbox"
        id="image-particle-toggle"
        checked={appProps.enableImageParticles}
        onChange={handleToggleImageParticles}
      />
    </label>
  );
};
