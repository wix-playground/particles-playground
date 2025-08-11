import React, {useContext, useState, useCallback, useEffect, useMemo} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {EasingType} from '../../../animation-utils/interfaces';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';
import {getEasingOptions} from '../../../animation-utils/easing-config';
import {SettingsSlider, Presets, SettingsButton, type PresetOption} from '../common';

export const HelixSpiralSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.HELIX_SPIRAL.defaultConfig);
  const easingOptions = useMemo(() => getEasingOptions(), []);

  // Preset configurations for different helix styles
  const presets: PresetOption<typeof config>[] = [
    {
      name: 'Classic',
      config: {
        helixRadius: 20, // 20% of canvas
        helixTurns: 3,
        helixHeight: 50, // 50% of canvas height
        rotationSpeed: 1,
        easingType: "ease-in-out-quint",
        perspective: 800,
        affectOpacity: false,
      }
    },
    {
      name: 'Wide',
      config: {
        helixRadius: 50,
        helixTurns: 1,
        helixHeight: 50,
        rotationSpeed: 1.1,
        easingType: "ease-in-out-quint",
        perspective: 800,
        affectOpacity: false,
      }
    },
    {
      name: 'Tornado',
      config: {
        helixRadius: 20, // 15% of canvas
        helixTurns: 2.5,
        helixHeight: 60, // 65% of canvas height
        rotationSpeed: 1.9,
        easingType: "ease-in-out-quint",
        perspective: 400,
        affectOpacity: false,
      }
    }
  ];

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.HELIX_SPIRAL) {
      setConfig(appProps.effectConfigurations.HELIX_SPIRAL);
    }
  }, [appProps?.effectConfigurations?.HELIX_SPIRAL]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'HELIX_SPIRAL',
        configuration: newConfig
      }));
    }
  }, [worker]);

  const handleValueChange = useCallback((key: keyof typeof config, value: number | EasingType | boolean) => {
    const newConfig = {...config, [key]: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <SettingsSlider
        label="Helix Radius:"
        value={config.helixRadius}
        min={5}
        max={50}
        step={2.5}
        onChange={(value) => handleValueChange('helixRadius', value)}
        formatValue={(value) => `${value}%`}
      />

      <SettingsSlider
        label="Spiral Turns:"
        value={config.helixTurns}
        min={0.5}
        max={10}
        step={0.5}
        onChange={(value) => handleValueChange('helixTurns', value)}
        formatValue={(value) => `${value} turns`}
      />

      <SettingsSlider
        label="Rotation Speed:"
        value={config.rotationSpeed}
        min={0.2}
        max={3}
        step={0.1}
        onChange={(value) => handleValueChange('rotationSpeed', value)}
        formatValue={(value) => `${value}x`}
      />

      <SettingsSlider
        label="Height Range:"
        value={config.helixHeight}
        min={20}
        max={100}
        step={5}
        onChange={(value) => handleValueChange('helixHeight', value)}
        formatValue={(value) => `${value}%`}
      />

      <SettingsSlider
        label="3D Depth:"
        value={config.perspective}
        min={300}
        max={2000}
        step={100}
        onChange={(value) => handleValueChange('perspective', value)}
        formatValue={(value) => `${value}`}
      />

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Easing type:</label>
        <select
          className={styles['setting-input']}
          value={config.easingType}
          onChange={(e) => handleValueChange('easingType', e.target.value as EasingType)}
        >
          {easingOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Easing affects opacity:</label>
        <div className={styles['settings-grid']} style={{gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px'}}>
          <SettingsButton
            selected={config.affectOpacity === true}
            onClick={() => handleValueChange('affectOpacity', true)}
          >
            Yes
          </SettingsButton>
          <SettingsButton
            selected={config.affectOpacity === false}
            onClick={() => handleValueChange('affectOpacity', false)}
          >
            No
          </SettingsButton>
        </div>
      </div>

      <Presets
        presets={presets}
        onPresetSelect={updateConfig}
        gridColumns={4}
      />
    </div>
  );
};
