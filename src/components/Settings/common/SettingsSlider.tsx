import React from 'react';
import styles from '../Settings.module.css';

export interface SettingsSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  useModuleStyles?: boolean; // Whether to use CSS modules or plain classes
  'data-testid'?: string;
}

export const SettingsSlider: React.FC<SettingsSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  className = '',
  disabled = false,
  fullWidth = false,
  useModuleStyles = true,
  'data-testid': dataTestId
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const displayValue = formatValue ? formatValue(value) : value.toString();

  // Determine which styles to use
  const containerClass = useModuleStyles
    ? (fullWidth ? styles['setting-row--column'] : styles['setting-row'])
    : 'settingRow';

  const labelClass = useModuleStyles
    ? (fullWidth ? styles['setting-label--full-width'] : styles['setting-label'])
    : undefined;

  const sliderClass = useModuleStyles
    ? `${styles['setting-slider']} ${className}`
    : `${className}`.trim();

  const valueClass = useModuleStyles
    ? styles['setting-value']
    : undefined;

  if (!useModuleStyles) {
    // Simple layout for non-module styles
    return (
      <div className={containerClass}>
        <label>{label}</label>
        <input
          className={sliderClass}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          data-testid={dataTestId}
        />
        <span>{displayValue}</span>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {fullWidth ? (
        <>
          <label className={labelClass}>{label}</label>
          <div className={styles['setting-row']}>
            <input
              className={sliderClass}
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleChange}
              disabled={disabled}
              data-testid={dataTestId}
            />
            <span className={valueClass}>{displayValue}</span>
          </div>
        </>
      ) : (
        <>
          <label className={labelClass}>{label}</label>
          <input
            className={sliderClass}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            data-testid={dataTestId}
          />
          <span className={valueClass}>{displayValue}</span>
        </>
      )}
    </div>
  );
};
