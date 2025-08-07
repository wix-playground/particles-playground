import React, {useCallback, useContext} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getResizeParticleRadiusMessage} from '../../../interfaces';
import {BubbleEffectToggle} from '../BubbleEffectToggle';
import {ImageParticleToggle} from '../ImageParticleToggle';
import styles from '../Settings.module.css';

export const ParticleSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleResizeParticleRadius = useCallback(
    (radius: number) => {
      if (worker) worker.postMessage(getResizeParticleRadiusMessage(radius));
    },
    [worker]
  );

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Particle radius:</label>
        <input
          className={`${styles['setting-input']} ${styles['setting-input--number']}`}
          value={appProps.particleRadius}
          type="number"
          min="1"
          max="20"
          onChange={(e) => {
            const numberValue = Number(e.target.value);
            if (!Number.isNaN(numberValue) && numberValue > 0) {
              handleResizeParticleRadius(numberValue);
            }
          }}
        />
      </div>

      <div className={styles['setting-row']}>
        <BubbleEffectToggle />
        <ImageParticleToggle />
      </div>
    </div>
  );
};
