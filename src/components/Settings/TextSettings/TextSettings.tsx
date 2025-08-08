import {TextInput} from "./TextInput";
import {FontSettings} from "./FontSettings";
import styles from '../Settings.module.css';

export const TextSettings = () => {
  return (
    <div className={styles['setting-group']}>
      <TextInput />
      <FontSettings />
    </div>
  );
}
