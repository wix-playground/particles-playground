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
      <SettingsSlider
        label="Horizontal vs Vertical Movement:"
        value={config.horizontalPhaseEnd}
        min={0.1}
        max={0.8}
        step={0.01}
        onChange={(value) => handleValueChange('horizontalPhaseEnd', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Squeeze Effect Strength:"
        value={config.verticalCompressionFactor}
        min={0.1}
        max={0.8}
        step={0.01}
        onChange={(value) => handleValueChange('verticalCompressionFactor', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Size Burst Effect:"
        value={config.scalingBoost}
        min={0}
        max={1}
        step={0.01}
        onChange={(value) => handleValueChange('scalingBoost', value)}
        formatValue={(value) => value.toFixed(2)}
      />

      <SettingsSlider
        label="Bounce Strength:"
        value={config.bouncyIntensity}
        min={1}
        max={20}
        step={0.5}
        onChange={(value) => handleValueChange('bouncyIntensity', value)}
        formatValue={(value) => value.toFixed(1)}
      />

      <SettingsSlider
        label="Bounce Timing:"
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
