import {useCallback, useContext} from 'react';
import {getUpdateEnableImageParticlesMessage} from '../../interfaces';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';

export const ImageParticleToggle = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleToggleImageParticles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (worker) {
        worker.postMessage(getUpdateEnableImageParticlesMessage(event.target.checked));
      }
    },
    [worker]
  );

  if (!appProps) return null;

  return (
    <div className="settings-item">
      <div className="settings-item-header">
        <span>Image Particles</span>
        <input
          className="userInput"
          type="checkbox"
          id="image-particle-toggle"
          checked={appProps.enableImageParticles}
          onChange={handleToggleImageParticles}
        />
      </div>
    </div>
  );
};
