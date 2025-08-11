import {useCallback, useContext, useState} from 'react';
import {getUpdateParticleColorsMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {SettingsButton} from './common';
import styles from './Settings.module.css';

export const MultiColorPicker = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);
  const [newColor, setNewColor] = useState('#ffffff');

  const handleColorsChange = useCallback(
    (colors: string[]) => {
      if (worker) {
        worker.postMessage(getUpdateParticleColorsMessage(colors));
      }
    },
    [worker]
  );

  const particleColors = appProps?.particleColors || [];

  const addColor = () => {
    if (!appProps) return;

    const newColors = [...particleColors, newColor];
    handleColorsChange(newColors);
  };

  const removeColor = (index: number) => {
    if (!appProps) return;

    const newColors = [...particleColors];
    newColors.splice(index, 1);
    handleColorsChange(newColors);
  };

  if (!appProps) return null;

  return (
    <div className="card">
      <span className="innerTitle">Particle Colors Gradient</span>
      <div className={styles['setting-group']}>
        <div className={styles['setting-row']} style={{flexWrap: 'wrap', gap: 'var(--settings-gap-sm)'}}>
          {particleColors.map((color, index) => (
            <div
              key={index}
              className={styles['color-chip']}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--settings-bg)',
                border: '1px solid var(--settings-border)',
                padding: 'var(--settings-gap-xs)',
                borderRadius: 'var(--settings-radius-sm)',
                gap: 'var(--settings-gap-xs)'
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  border: '1px solid var(--settings-border)',
                  borderRadius: 'var(--settings-radius-sm)'
                }}
              />
              <span style={{
                color: 'var(--settings-text)',
                fontSize: '0.85em',
                fontFamily: 'monospace'
              }}>{color}</span>
              <button
                onClick={() => removeColor(index)}
                className={styles['color-remove-button']}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ff4d4d',
                  fontSize: '16px',
                  padding: '2px 4px',
                  borderRadius: 'var(--settings-radius-sm)',
                  transition: 'background-color var(--settings-transition)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className={styles['setting-row']} style={{gap: 'var(--settings-gap-sm)'}}>
          <input
            type="color"
            className={`userInput ${styles['setting-input']}`}
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={{width: '60px', height: '36px'}}
          />
          <SettingsButton onClick={addColor}>
            Add Color
          </SettingsButton>
        </div>
      </div>

      {particleColors.length > 0 && (
        <div style={{
          height: '20px',
          marginTop: 'var(--settings-gap-md)',
          width: '100%',
          background: `linear-gradient(to right, ${particleColors.join(', ')})`,
          borderRadius: 'var(--settings-radius-sm)',
          border: '1px solid var(--settings-border)'
        }} />
      )}
    </div>
  );
};
