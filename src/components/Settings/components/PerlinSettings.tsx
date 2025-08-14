import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import {SettingsSlider} from '../common';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';

export const PerlinSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.PERLIN.defaultConfig);

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.PERLIN) {
      setConfig(appProps.effectConfigurations.PERLIN);
    }
  }, [appProps?.effectConfigurations?.PERLIN]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'PERLIN',
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
        label="Drift Speed"
        value={config.driftSpeed}
        min={0.0001}
        max={0.002}
        step={0.0001}
        onChange={(value) => handleValueChange('driftSpeed', value)}
      />

      <SettingsSlider
        label="Effect Strength"
        value={config.effectStrength}
        min={0.5}
        max={10}
        step={0.1}
        onChange={(value) => handleValueChange('effectStrength', value)}
      />

      <SettingsSlider
        label="Noise Scale"
        value={config.noiseScale}
        min={100}
        max={1500}
        step={50}
        onChange={(value) => handleValueChange('noiseScale', value)}
      />

      <SettingsSlider
        label="Orbit Distance"
        value={config.constantSpacing}
        min={20}
        max={300}
        step={10}
        onChange={(value) => handleValueChange('constantSpacing', value)}
      />

      <SettingsSlider
        label="Scale Multiplier"
        value={config.scaleMultiplier}
        min={0.5}
        max={5}
        step={0.1}
        onChange={(value) => handleValueChange('scaleMultiplier', value)}
      />
    </div>
  );
};
