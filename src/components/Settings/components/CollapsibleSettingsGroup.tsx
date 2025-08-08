import React, {ReactNode} from 'react';
import styles from '../Settings.module.css';

interface CollapsibleSettingsGroupProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

export const CollapsibleSettingsGroup: React.FC<CollapsibleSettingsGroupProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
  icon
}) => {
  return (
    <div className={styles['collapsible-group']}>
      <button
        className={styles['collapsible-group__header']}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`settings-group-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className={styles['collapsible-group__title']}>
          {icon}
          <span>{title}</span>
        </div>
        <ChevronIcon
          className={`${styles['collapsible-group__icon']} ${isExpanded ? styles['collapsible-group__icon--expanded'] : ''
            }`}
        />
      </button>
      <div
        className={`${styles['collapsible-group__content']} ${isExpanded
          ? styles['collapsible-group__content--expanded']
          : styles['collapsible-group__content--collapsed']
          }`}
        id={`settings-group-${title.toLowerCase().replace(/\s+/g, '-')}`}
        role="region"
        aria-labelledby={`settings-group-header-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className={styles['collapsible-group__inner']}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Simple chevron icon component
const ChevronIcon: React.FC<{className?: string}> = ({className}) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
    />
  </svg>
);
