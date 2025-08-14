import {useCallback, useContext} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {AppContext} from '../../contexts/AppContext';
import {getUpdateParticleGapMessage} from '../../interfaces';
import {DATA_TEST_IDS} from '../../constants';
import {SettingsSlider} from './common';

export const ParticleGapSlider = () => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleGapChange = useCallback((gap: number) => {
    if (worker) {
      worker.postMessage(getUpdateParticleGapMessage(gap));
    }
  }, [worker]);

  if (!appProps) return null;

  return (
    <SettingsSlider
      label="Particle Gap:"
      value={appProps.particleGap}
      min={0}
      max={100}
      step={1}
      onChange={handleGapChange}
      formatValue={(value) => `${value}px`}
      data-testid={DATA_TEST_IDS.PARTICLE_GAP_SLIDER}
      fullWidth={true}
    />
  );
};
