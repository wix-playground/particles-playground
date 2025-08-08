import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import {SettingsSlider} from '../common';
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

      <SettingsSlider
        label="Horizontal Phase End:"
        value={config.horizontalPhaseEnd}
        min={0.1}
        max={0.8}
        step={0.01}
        onChange={(value) => handleValueChange('horizontalPhaseEnd', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Bounce End Point:"
        value={config.bounceEndPoint}
        min={0.5}
        max={1.5}
        step={0.01}
        onChange={(value) => handleValueChange('bounceEndPoint', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      {/* Compression Controls */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Compression Controls</label>
      </div>

      <SettingsSlider
        label="Vertical Compression:"
        value={config.verticalCompressionFactor}
        min={0.1}
        max={0.8}
        step={0.01}
        onChange={(value) => handleValueChange('verticalCompressionFactor', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Decompression Start:"
        value={config.decompressionStart}
        min={0.2}
        max={0.9}
        step={0.01}
        onChange={(value) => handleValueChange('decompressionStart', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Decompression Easing:"
        value={config.decompressionEasing}
        min={0.5}
        max={2}
        step={0.1}
        onChange={(value) => handleValueChange('decompressionEasing', value)}
        formatValue={(value) => value.toFixed(1)}
      />

      {/* Scale Effects */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Scale Effects</label>
      </div>

      <SettingsSlider
        label="Horizontal Scale Shrink:"
        value={config.horizontalScaleShrink}
        min={0}
        max={0.5}
        step={0.01}
        onChange={(value) => handleValueChange('horizontalScaleShrink', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Vertical Scale Shrink:"
        value={config.verticalScaleShrink}
        min={0}
        max={0.5}
        step={0.01}
        onChange={(value) => handleValueChange('verticalScaleShrink', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Scaling Boost:"
        value={config.scalingBoost}
        min={0}
        max={1}
        step={0.01}
        onChange={(value) => handleValueChange('scalingBoost', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Scaling Phase End:"
        value={config.scalingPhaseEnd}
        min={0.1}
        max={1}
        step={0.01}
        onChange={(value) => handleValueChange('scalingPhaseEnd', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      {/* Bouncy Easing */}
      <div className={styles['setting-row']}>
        <label className={styles['setting-label--full-width']}>Bouncy Easing</label>
      </div>

      <SettingsSlider
        label="Bouncy Intensity:"
        value={config.bouncyIntensity}
        min={1}
        max={20}
        step={0.5}
        onChange={(value) => handleValueChange('bouncyIntensity', value)}
        formatValue={(value) => value.toFixed(1)}
      />

      <SettingsSlider
        label="Bouncy Offset:"
        value={config.bouncyOffset}
        min={0}
        max={2}
        step={0.05}
        onChange={(value) => handleValueChange('bouncyOffset', value)}
        formatValue={(value) => value.toFixed(2)}
      />
    </div>
  );
};
