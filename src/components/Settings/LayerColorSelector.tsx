import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateLayerColorsMessage} from '../../interfaces';
import styles from './Settings.module.css';

export const LayerColorSelector = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleLayerColorChange = useCallback((layerIndex: number, color: string) => {
    if (worker && appProps) {
      // Create a new array with the updated color
      const newLayerColors = [...appProps.layerColors];
      
      // Ensure the array is long enough for this layer
      while (newLayerColors.length <= layerIndex) {
        newLayerColors.push('');
      }
      
      newLayerColors[layerIndex] = color;
      worker.postMessage(getUpdateLayerColorsMessage(newLayerColors));
    }
  }, [worker, appProps]);

  const handleClearLayerColor = useCallback((layerIndex: number) => {
    if (worker && appProps) {
      const newLayerColors = [...appProps.layerColors];
      if (newLayerColors.length > layerIndex) {
        newLayerColors[layerIndex] = '';
        worker.postMessage(getUpdateLayerColorsMessage(newLayerColors));
      }
    }
  }, [worker, appProps]);

  const handleClearAllLayerColors = useCallback(() => {
    if (worker) {
      worker.postMessage(getUpdateLayerColorsMessage([]));
    }
  }, [worker]);

  if (!appProps || appProps.layerCount <= 1) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <div className={styles['setting-row']}>
        <label className={styles['setting-label']}>Layer Colors:</label>
        <button 
          className={styles['setting-button']}
          onClick={handleClearAllLayerColors}
          style={{ fontSize: '0.8em', padding: '4px 8px' }}
        >
          Clear All
        </button>
      </div>
      
      {Array.from({ length: appProps.layerCount }, (_, layerIndex) => {
        const currentColor = appProps.layerColors[layerIndex] || '';
        const isUsingDefault = !currentColor;
        
        return (
          <div key={layerIndex} className={styles['setting-row']} style={{ alignItems: 'center', gap: '8px' }}>
            <label className={styles['setting-label']} style={{ minWidth: '60px' }}>
              Layer {layerIndex + 1}:
            </label>
            
            <input
              type="color"
              value={currentColor || '#ffffff'}
              onChange={(e) => handleLayerColorChange(layerIndex, e.target.value)}
              className={styles['setting-input']}
              style={{ 
                width: '40px', 
                height: '30px',
                opacity: isUsingDefault ? 0.5 : 1,
                border: isUsingDefault ? '2px dashed #666' : '1px solid #ccc'
              }}
              title={isUsingDefault ? 'Using default particle colors' : `Layer ${layerIndex + 1} color`}
            />
            
            {!isUsingDefault && (
              <button
                onClick={() => handleClearLayerColor(layerIndex)}
                className={styles['setting-button']}
                style={{ 
                  fontSize: '0.7em', 
                  padding: '2px 6px',
                  background: 'transparent',
                  border: '1px solid #666',
                  color: '#666'
                }}
                title="Use default particle colors for this layer"
              >
                Default
              </button>
            )}
            
            <span style={{ 
              fontSize: '0.8em', 
              color: '#666',
              fontStyle: isUsingDefault ? 'italic' : 'normal'
            }}>
              {isUsingDefault ? 'Using particle colors' : currentColor}
            </span>
          </div>
        );
      })}
    </div>
  );
};
