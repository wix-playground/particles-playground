import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import {SettingsSlider, Presets, type PresetOption} from '../common';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';

export const OppenheimerSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.OPPENHEIMER.defaultConfig);

  // Preset configurations
  const presets: PresetOption<typeof config>[] = [
    {
      name: 'Gentle Snow',
      config: {
        windStrength: 0.3,
        turbulenceScale: 15,
        oscillationAmount: 0.8,
        settlingSpeed: 0.8,
        particleWeight: 1.2
      }
    },
    {
      name: 'Blizzard',
      config: {
        windStrength: 1.0,
        turbulenceScale: 60,
        oscillationAmount: 1.5,
        settlingSpeed: 1.5,
        particleWeight: 0.7
      }
    },
    {
      name: 'Magical Sparkles',
      config: {
        windStrength: 0.4,
        turbulenceScale: 5,
        oscillationAmount: 2.0,
        settlingSpeed: 0.6,
        particleWeight: 0.5
      }
    }
  ];

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.OPPENHEIMER) {
      setConfig(appProps.effectConfigurations.OPPENHEIMER);
    }
  }, [appProps?.effectConfigurations?.OPPENHEIMER]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'OPPENHEIMER',
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
        label="Wind Strength:"
        value={config.windStrength}
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => handleValueChange('windStrength', value)}
      />

      <SettingsSlider
        label="Turbulence Scale:"
        value={config.turbulenceScale}
        min={0}
        max={100}
        step={5}
        onChange={(value) => handleValueChange('turbulenceScale', value)}
      />

      <SettingsSlider
        label="Oscillation Amount:"
        value={config.oscillationAmount}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => handleValueChange('oscillationAmount', value)}
      />

      <SettingsSlider
        label="Settling Speed:"
        value={config.settlingSpeed}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => handleValueChange('settlingSpeed', value)}
      />

      <SettingsSlider
        label="Particle Weight:"
        value={config.particleWeight}
        min={0}
        max={2}
        step={0.1}
        onChange={(value) => handleValueChange('particleWeight', value)}
      />

      <Presets
        presets={presets}
        onPresetSelect={updateConfig}
      />
    </div>
  );
};
