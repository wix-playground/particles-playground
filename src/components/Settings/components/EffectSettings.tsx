import React, {useContext, useCallback} from 'react';
import {EffectTypes} from '../../../animation-utils/interfaces';
import {effectOptions} from '../../../animation-utils/animation-config';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateSelectedEffectMessage} from '../../../interfaces';
import {SuperSwirlSettings} from './SuperSwirlSettings';
import {BuildEffectSettings} from './BuildEffectSettings';
import {OppenheimerSettings} from './OppenheimerSettings';
import {ScanningSettings} from './ScanningSettings';
import {ExplosionSettings} from './ExplosionSettings';
import {HelixSpiralSettings} from './HelixSpiralSettings';
import {StartPosition} from '../StartPosition';
import {SettingsButton} from '../common';
import styles from '../Settings.module.css';
import {AnimationDurationSlider} from '../AnimationDurationSlider';
import {DelaySlider} from '../DelaySlider';

export const EffectSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleEffectSelection = useCallback(
    (effectId: string) => {
      if (worker) {
        const isCurrentlySelected = appProps?.selectedEffect === effectId;
        const newSelection = isCurrentlySelected ? null : effectId;
        worker.postMessage(getUpdateSelectedEffectMessage(newSelection as any));
      }
    },
    [worker, appProps?.selectedEffect]
  );

  const effects = Object.entries(effectOptions).map(([key, option]) => ({
    id: key as keyof typeof EffectTypes,
    name: key.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' '),
    option
  })).filter((effect) => effect.id !== 'HELIX_SPIRAL');

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <div className={styles['setting-row']}>
        <AnimationDurationSlider />
      </div>

      {/* Hide effects selection when static mode is enabled */}
      {!appProps.enableStaticMode && (
        <div className={`${styles['settings-grid']} ${styles['settings-grid--auto']}`}>
          {effects.map((effect) => (
            <SettingsButton
              key={effect.id}
              selected={appProps.selectedEffect === effect.id}
              onClick={() => handleEffectSelection(effect.id)}
            >
              <div className={styles['effect-option']}>
                <div className={styles['effect-option__name']}>
                  {effect.name}
                </div>
                <div className={styles['effect-option__description']}>
                  {effect.id === 'SUPER_SWIRL' && 'Spiral animation with configurable turns'}
                  {effect.id === 'BUILD' && 'Multi-phase build animation with bouncy effects'}
                  {effect.id === 'OPPENHEIMER' && 'Wind-driven particle animation with turbulence effects'}
                  {effect.id === 'SCANNING' && 'Oscillating scan line that settles particles progressively'}
                  {effect.id === 'EXPLOSION' && '3D explosion with configurable depth and orbital settling'}
                  {effect.id === 'HELIX_SPIRAL' && '3D helical spiral with rotating depth and customizable turns'}
                </div>
              </div>
            </SettingsButton>
          ))}
        </div>
      )}

      {/* Hide effect-specific controls when static mode is enabled */}
      {!appProps.enableStaticMode && (
        <>
          {/* Show start position control if selected effect supports it */}
          {appProps.selectedEffect && effectOptions[appProps.selectedEffect]?.commonControls?.startPosition && (
            <div className={styles['setting-row']}>
              <StartPosition />
            </div>
          )}

          {/* Show delay control if selected effect supports it */}
          {appProps.selectedEffect && effectOptions[appProps.selectedEffect]?.commonControls?.delay && (
            <div className={styles['setting-row']}>
              <DelaySlider />
            </div>
          )}

          {/* Show configuration UI for selected effect */}
          {appProps.selectedEffect === 'SUPER_SWIRL' && (
            <div className={styles['setting-row']}>
              <SuperSwirlSettings />
            </div>
          )}

          {appProps.selectedEffect === 'BUILD' && (
            <div className={styles['setting-row']}>
              <BuildEffectSettings />
            </div>
          )}

          {appProps.selectedEffect === 'OPPENHEIMER' && (
            <div className={styles['setting-row']}>
              <OppenheimerSettings />
            </div>
          )}

          {appProps.selectedEffect === 'SCANNING' && (
            <div className={styles['setting-row']}>
              <ScanningSettings />
            </div>
          )}

          {appProps.selectedEffect === 'EXPLOSION' && (
            <div className={styles['setting-row']}>
              <ExplosionSettings />
            </div>
          )}

          {appProps.selectedEffect === 'HELIX_SPIRAL' && (
            <div className={styles['setting-row']}>
              <HelixSpiralSettings />
            </div>
          )}
        </>
      )}
    </div>
  );
};
