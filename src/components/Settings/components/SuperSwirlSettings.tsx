import React, {useContext, useState, useCallback, useEffect, useMemo} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {EasingType} from '../../../animation-utils/interfaces';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';
import {getEasingOptions} from '../../../animation-utils/easing-config';
import {SettingsButton} from '../common';


export const SuperSwirlSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.SUPER_SWIRL.defaultConfig);
  const easingOptions = useMemo(() => getEasingOptions(), []);

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.SUPER_SWIRL) {
      setConfig(appProps.effectConfigurations.SUPER_SWIRL);
    }
  }, [appProps?.effectConfigurations?.SUPER_SWIRL]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'SUPER_SWIRL',
        configuration: newConfig
      }));
    }
  }, [worker]);

  const handleSwirlTurnsChange = useCallback((value: number) => {
    const newConfig = {...config, swirlTurns: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  const handleSpiralDirectionChange = useCallback((value: number) => {
    const newConfig = {...config, spiralDirection: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  const handleEasingTypeChange = useCallback((value: EasingType) => {
    const newConfig = {...config, easingType: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Swirl Turns:</label>
        <input
          className={`${styles['setting-input']} ${styles['setting-input--number']}`}
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={config.swirlTurns}
          onChange={(e) => handleSwirlTurnsChange(Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.swirlTurns}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Direction:</label>
        <div className={styles['settings-grid']} style={{gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px'}}>
          <SettingsButton
            selected={config.spiralDirection === 1}
            onClick={() => handleSpiralDirectionChange(1)}
          >
            Clockwise
          </SettingsButton>
          <SettingsButton
            selected={config.spiralDirection === -1}
            onClick={() => handleSpiralDirectionChange(-1)}
          >
            Counter-clockwise
          </SettingsButton>
        </div>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Easing:</label>
        <select
          className={styles['setting-input']}
          value={config.easingType}
          onChange={(e) => handleEasingTypeChange(e.target.value as EasingType)}
        >
          {easingOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
