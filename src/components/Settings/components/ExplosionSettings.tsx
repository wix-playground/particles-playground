import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';
import {SettingsSlider, Presets, type PresetOption} from '../common';

export const ExplosionSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.EXPLOSION.defaultConfig);

  // Preset configurations
  const presets: PresetOption<typeof config>[] = [
    {
      name: 'Classic',
      config: {
        explosionStrength: 1000,
        deconstructionPhase: 0.4,
        orbitalRadius: 15,
        depthOffset: -500,
      }
    },
    {
      name: 'Contained',
      config: {
        explosionStrength: 500,
        deconstructionPhase: 0.75,
        orbitalRadius: 0,
        depthOffset: 1200,
      }
    },
    {
      name: 'Quick Snap',
      config: {
        explosionStrength: 600,
        deconstructionPhase: 0.2,
        orbitalRadius: 5,
        depthOffset: -200,
      }
    },
    {
      name: 'Deep Space',
      config: {
        explosionStrength: 1800,
        deconstructionPhase: 0.7,
        orbitalRadius: 40,
        depthOffset: -800,
      }
    }
  ];

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.EXPLOSION) {
      setConfig(appProps.effectConfigurations.EXPLOSION);
    }
  }, [appProps?.effectConfigurations?.EXPLOSION]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'EXPLOSION',
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
        label="Explosion Strength:"
        value={config.explosionStrength}
        min={300}
        max={3000}
        step={100}
        onChange={(value) => handleValueChange('explosionStrength', value)}
        formatValue={(value) => `${value}px`}
      />
      <SettingsSlider
        label="Explosion Phase:"
        value={config.deconstructionPhase}
        min={0.1}
        max={0.8}
        step={0.05}
        onChange={(value) => handleValueChange('deconstructionPhase', value)}
        formatValue={(value) => `${Math.round(value * 100)}%`}
      />
      <SettingsSlider
        label="Orbital Radius:"
        value={config.orbitalRadius}
        min={0}
        max={50}
        step={2}
        onChange={(value) => handleValueChange('orbitalRadius', value)}
        formatValue={(value) => `${value}px`}
      />

      <SettingsSlider
        label="3D Depth:"
        value={config.depthOffset}
        min={-1000}
        max={1200}
        step={100}
        onChange={(value) => handleValueChange('depthOffset', value)}
        formatValue={(value) => `${value}`}
      />

      <Presets
        presets={presets}
        onPresetSelect={updateConfig}
        gridColumns={4}
      />
    </div>
  );
};
