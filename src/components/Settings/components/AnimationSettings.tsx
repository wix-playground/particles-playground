import React from 'react';
import {StartPosition} from '../StartPosition';
import {AnimationDurationSlider} from '../AnimationDurationSlider';
import styles from '../Settings.module.css';

export const AnimationSettings: React.FC = () => {
  return (
    <div className={styles['setting-group']}>
      <div className={styles['setting-row']}>
        <AnimationDurationSlider />
      </div>
      <div className={styles['setting-row']}>
        <StartPosition />
      </div>
    </div>
  );
};
