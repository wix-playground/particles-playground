import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {WorkerContext} from '../../../contexts/WorkerContext';
import {getUpdateEffectConfigurationMessage} from '../../../interfaces';
import styles from '../Settings.module.css';
import {effectOptions} from '../../../animation-utils/animation-config';
import {SettingsSlider, Presets, type PresetOption} from '../common';

export const ScanningSettings: React.FC = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const [config, setConfig] = useState(effectOptions.SCANNING.defaultConfig);

  // Preset configurations
  const presets: PresetOption<typeof config>[] = [
    {
      name: 'Original',
      config: {
        oscillationFrequency: 3,
        settlementThreshold: 12,
        scanningRange: 30,
        passDistribution: 0.85,
        settlementTiming: 'distributed'
      }
    },
    {
      name: 'Deep Scan',
      config: {
        oscillationFrequency: 1.5,
        settlementThreshold: 20,
        scanningRange: 60,
        passDistribution: 0.85,
        settlementTiming: 'late'
      }
    },
    {
      name: 'Precision',
      config: {
        oscillationFrequency: 4,
        settlementThreshold: 5,
        scanningRange: 15,
        passDistribution: 0.9,
        settlementTiming: 'distributed'
      }
    }
  ];

  // Initialize with current app config
  useEffect(() => {
    if (appProps?.effectConfigurations?.SCANNING) {
      setConfig(appProps.effectConfigurations.SCANNING);
    }
  }, [appProps?.effectConfigurations?.SCANNING]);

  const updateConfig = useCallback((newConfig: typeof config) => {
    setConfig(newConfig);
    if (worker) {
      worker.postMessage(getUpdateEffectConfigurationMessage({
        effectType: 'SCANNING',
        configuration: newConfig
      }));
    }
  }, [worker]);

  const handleValueChange = useCallback((key: keyof typeof config, value: number) => {
    const newConfig = {...config, [key]: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  const handleSettlementTimingChange = useCallback((value: 'early' | 'distributed' | 'late') => {
    const newConfig = {...config, settlementTiming: value};
    updateConfig(newConfig);
  }, [config, updateConfig]);

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <SettingsSlider
        label="Oscillation Frequency:"
        value={config.oscillationFrequency}
        min={1}
        max={8}
        step={0.5}
        onChange={(value) => handleValueChange('oscillationFrequency', value)}
        formatValue={(value) => value.toFixed(1)}
      />

      <SettingsSlider
        label="Settlement Threshold:"
        value={config.settlementThreshold}
        min={5}
        max={30}
        step={1}
        onChange={(value) => handleValueChange('settlementThreshold', value)}
        formatValue={(value) => `${value}px`}
      />

      <SettingsSlider
        label="Scanning Range:"
        value={config.scanningRange}
        min={10}
        max={100}
        step={5}
        onChange={(value) => handleValueChange('scanningRange', value)}
        formatValue={(value) => `${value}px`}
      />

      <SettingsSlider
        label="Pass Distribution:"
        value={config.passDistribution}
        min={0.2}
        max={1.0}
        step={0.05}
        onChange={(value) => handleValueChange('passDistribution', value)}
        formatValue={(value) => `${Math.round(value * 100)}%`}
      />

      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Settlement Timing:</label>
        <div className={styles['settings-grid']} style={{gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px'}}>
          <button
            className={`${styles['setting-button']} ${config.settlementTiming === 'early' ? styles['setting-button--selected'] : ''}`}
            onClick={() => handleSettlementTimingChange('early')}
          >
            Early
          </button>
          <button
            className={`${styles['setting-button']} ${config.settlementTiming === 'distributed' ? styles['setting-button--selected'] : ''}`}
            onClick={() => handleSettlementTimingChange('distributed')}
          >
            Distributed
          </button>
          <button
            className={`${styles['setting-button']} ${config.settlementTiming === 'late' ? styles['setting-button--selected'] : ''}`}
            onClick={() => handleSettlementTimingChange('late')}
          >
            Late
          </button>
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
