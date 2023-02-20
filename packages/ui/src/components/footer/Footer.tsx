import {useShortcuts} from '../../contexts/shorcuts';
import styles from './Footer.module.scss';

export function Footer() {
  const shortcuts = useShortcuts();
  return (
    <div className={styles.root}>
      {shortcuts.map(({key, action}, index) => (
        <div className={styles.shortcut}>
          <span className={styles.key}>{key}</span>
          <span className={styles.action}>{action}</span>
          {index < shortcuts.length - 1 && (
            <span className={styles.separator}>|</span>
          )}
        </div>
      ))}
    </div>
  );
}
