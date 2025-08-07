import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';

export const BuildEffectSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.BUILD.defaultConfig);

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.BUILD) {
      setConfig(appProps.effectConfigurations.BUILD);
    }
  }, [appProps?.effectConfigurations?.BUILD]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'BUILD',
        configuration: newConfig
      }));
    }
  }, [worker]);

  const handleValueChange = useCallback((key: keyof typeof config, value: number) => {
    const newConfig = {...config, [key]: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      {/* Phase Timing */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Phase Timing</label>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Horizontal Phase End:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0.1"
          max="0.8"
          step="0.01"
          value={config.horizontalPhaseEnd}
          onChange={(e) => handleValueChange('horizontalPhaseEnd', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.horizontalPhaseEnd.toFixed(2)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Bounce End Point:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0.5"
          max="1.5"
          step="0.01"
          value={config.bounceEndPoint}
          onChange={(e) => handleValueChange('bounceEndPoint', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.bounceEndPoint.toFixed(2)}</span>
      </div>

      {/* Compression Controls */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Compression Controls</label>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Vertical Compression:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0.1"
          max="0.8"
          step="0.01"
          value={config.verticalCompressionFactor}
          onChange={(e) => handleValueChange('verticalCompressionFactor', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.verticalCompressionFactor.toFixed(2)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Decompression Start:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0.2"
          max="0.9"
          step="0.01"
          value={config.decompressionStart}
          onChange={(e) => handleValueChange('decompressionStart', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.decompressionStart.toFixed(2)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Decompression Easing:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={config.decompressionEasing}
          onChange={(e) => handleValueChange('decompressionEasing', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.decompressionEasing.toFixed(1)}</span>
      </div>

      {/* Scale Effects */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Scale Effects</label>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Horizontal Scale Shrink:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={config.horizontalScaleShrink}
          onChange={(e) => handleValueChange('horizontalScaleShrink', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.horizontalScaleShrink.toFixed(2)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Vertical Scale Shrink:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={config.verticalScaleShrink}
          onChange={(e) => handleValueChange('verticalScaleShrink', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.verticalScaleShrink.toFixed(2)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Scaling Boost:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={config.scalingBoost}
          onChange={(e) => handleValueChange('scalingBoost', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.scalingBoost.toFixed(2)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Scaling Phase End:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={config.scalingPhaseEnd}
          onChange={(e) => handleValueChange('scalingPhaseEnd', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.scalingPhaseEnd.toFixed(2)}</span>
      </div>

      {/* Bouncy Easing */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Bouncy Easing</label>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Bouncy Intensity:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={config.bouncyIntensity}
          onChange={(e) => handleValueChange('bouncyIntensity', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.bouncyIntensity.toFixed(1)}</span>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Bouncy Offset:</label>
        <input
          className={`${styles['setting-slider']}`}
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={config.bouncyOffset}
          onChange={(e) => handleValueChange('bouncyOffset', Number(e.target.value))}
        />
        <span className={styles['setting-value']}>{config.bouncyOffset.toFixed(2)}</span>
      </div>
    </div>
  );
};
