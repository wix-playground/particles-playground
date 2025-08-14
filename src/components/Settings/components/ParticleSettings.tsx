import React, {useCallback, useContext} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getResizeParticleRadiusMessage} from '../../../interfaces';
import {BubbleEffectToggle} from '../BubbleEffectToggle';
import {ImageParticleToggle} from '../ImageParticleToggle';
import {StaticModeToggle} from '../StaticModeToggle';
import {ParticleGapSlider} from '../ParticleGapSlider';
import {SizeInterpolationSlider} from '../SizeInterpolationSlider';
import {InterpolationOffsetSlider} from '../InterpolationOffsetSlider';
import {SizeInterpolationMaxSlider} from '../SizeInterpolationMaxSlider';
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
        {/* Hide bubble and image particle toggles when static mode is enabled */}
        {!appProps.enableStaticMode && (
          <>
            <BubbleEffectToggle />
            <ImageParticleToggle />
          </>
        )}
        <StaticModeToggle />
      </div>

      {/* Show extended settings only when static mode is enabled */}
      {appProps.enableStaticMode && (
        <>
          <div className={styles['setting-row']}>
            <ParticleGapSlider />
            <SizeInterpolationSlider />
          </div>
          <div className={styles['setting-row']}>
            <SizeInterpolationMaxSlider />
            <InterpolationOffsetSlider />
          </div>
        </>
      )}
    </div>
  );
};
