import React from 'react';
import styles from '../Settings.module.css';

export interface PresetOption<T> {
  name: string;
  config: T;
}

export interface PresetsProps<T> {
  presets: PresetOption<T>[];
  onPresetSelect: (config: T) => void;
  gridColumns?: number;
}

export function Presets<T>({
  presets,
  onPresetSelect,
  gridColumns = 3
}: PresetsProps<T>): React.ReactElement {
  return (
    <div className={styles['setting-row']}>
      <label className={styles['setting-label']}>Presets:</label>
      <div
        className={styles['settings-grid']}
        style={{gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: '8px'}}
      >
        {presets.map((preset, index) => (
          <button
            key={index}
            className={styles['setting-button']}
            onClick={() => onPresetSelect(preset.config)}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}
