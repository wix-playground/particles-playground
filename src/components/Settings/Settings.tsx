import {useContext} from 'react';
import {AppContext} from '../../contexts/AppContext';
import {editor} from 'monaco-editor';
import {TextSettings} from './TextSettings';
import {CollapsibleSettingsGroup} from './components/CollapsibleSettingsGroup';
import {ParticleSettings} from './components/ParticleSettings';
import {ColorSettings} from './components/ColorSettings';
import {AnimationSettings} from './components/AnimationSettings';
import {MovementSettings} from './components/MovementSettings';
import {EffectSettings} from './components/EffectSettings';
import {useCollapsibleState} from './hooks/useCollapsibleState';
import styles from './Settings.module.css';

export const Settings = ({
  editorRef,
}: {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
}) => {
  const appProps = useContext(AppContext);

  // Initialize collapsible state with some sections expanded by default
  const {isExpanded, toggle} = useCollapsibleState({
    particles: true,
    colors: false,
    animation: false,
    movement: true,
    effects: false,
    text: false
  });

  if (!appProps) {
    return null;
  }

  return (
    <div className={styles.settings}>
      <h2 className={styles.settings__title}>Settings</h2>
      <div className={styles.settings__content}>

        <CollapsibleSettingsGroup
          title="Particles"
          isExpanded={isExpanded('particles')}
          onToggle={() => toggle('particles')}
        >
          <ParticleSettings />
        </CollapsibleSettingsGroup>

        <CollapsibleSettingsGroup
          title="Fill colors"
          isExpanded={isExpanded('colors')}
          onToggle={() => toggle('colors')}
        >
          <ColorSettings />
        </CollapsibleSettingsGroup>

        <CollapsibleSettingsGroup
          title="Animation"
          isExpanded={isExpanded('animation')}
          onToggle={() => toggle('animation')}
        >
          <AnimationSettings />
        </CollapsibleSettingsGroup>

        <CollapsibleSettingsGroup
          title="Movement Functions"
          isExpanded={isExpanded('movement')}
          onToggle={() => toggle('movement')}
        >
          <MovementSettings editorRef={editorRef} />
        </CollapsibleSettingsGroup>

        <CollapsibleSettingsGroup
          title="Effects"
          isExpanded={isExpanded('effects')}
          onToggle={() => toggle('effects')}
        >
          <EffectSettings />
        </CollapsibleSettingsGroup>

        <CollapsibleSettingsGroup
          title="Text"
          isExpanded={isExpanded('text')}
          onToggle={() => toggle('text')}
        >
          <TextSettings />
        </CollapsibleSettingsGroup>

      </div>
    </div>
  );
};
