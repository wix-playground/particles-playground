import React from 'react';
import {MultiColorPicker} from '../MultiColorPicker';
import styles from '../Settings.module.css';

export const ColorSettings: React.FC = () => {
  return (
    <div className={styles['setting-group']}>
      <MultiColorPicker />
    </div>
  );
};
