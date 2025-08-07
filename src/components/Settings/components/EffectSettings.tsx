import React, {useContext, useCallback} from 'react';
import {EffectTypes} from '../../../animation-utils/interfaces';
import {effectOptions} from '../../../animation-utils/animation-config';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateSelectedEffectMessage} from '../../../interfaces';
import {SuperSwirlSettings} from './SuperSwirlSettings';
import {BuildEffectSettings} from './BuildEffectSettings';
import styles from '../Settings.module.css';

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
  }));

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <div className={`${styles['settings-grid']} ${styles['settings-grid--auto']}`}>
        {effects.map((effect) => (
          <button
            key={effect.id}
            className={`${styles['setting-button']} ${appProps.selectedEffect === effect.id ? styles['setting-button--selected'] : ''
              }`}
            onClick={() => handleEffectSelection(effect.id)}
          >
            <div className={styles['effect-option']}>
              <div className={styles['effect-option__name']}>
                {effect.name}
              </div>
              <div className={styles['effect-option__description']}>
                {effect.id === 'SUPER_SWIRL' && 'Spiral animation with configurable turns'}
                {effect.id === 'BUILD' && 'Multi-phase build animation with bouncy effects'}
              </div>
            </div>
          </button>
        ))}
      </div>

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
    </div>
  );
};
