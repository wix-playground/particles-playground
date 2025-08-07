import React, {useContext} from 'react';
import {AppContext} from '../../../contexts/AppContext';
import {FunctionSelectorModal} from '../../FunctionSelectorModal/FunctionSelectorModal';
import {PulseColorSettings} from '../PulseColorSettings';
import {TimeDistortionSettings} from '../TimeDistortionSettings';
import {ElasticPlopSettings} from '../ElasticPlopSettings';
import {editor} from 'monaco-editor';
import styles from '../Settings.module.css';

interface MovementSettingsProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
}

export const MovementSettings: React.FC<MovementSettingsProps> = ({editorRef}) => {
  const appProps = useContext(AppContext);

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles['setting-group']}>
      <div className={styles['setting-row']}>
        <div className={styles['setting-label--full-width']}>
          Predefined movement functions
        </div>
        <FunctionSelectorModal
          onSelect={() => {
            if (editorRef.current) {
              editorRef.current
                .getAction('editor.action.formatDocument')
                ?.run();
            }
          }}
        />
      </div>

      {appProps.selectedMovementFunction === 'pulseColorCycle' && (
        <div className={styles['setting-row']}>
          <PulseColorSettings />
        </div>
      )}

      {appProps.selectedMovementFunction === 'timeDistortion' && (
        <div className={styles['setting-row']}>
          <TimeDistortionSettings />
        </div>
      )}

      {appProps.selectedMovementFunction === 'elasticPlop' && (
        <div className={styles['setting-row']}>
          <ElasticPlopSettings />
        </div>
      )}
    </div>
  );
};
