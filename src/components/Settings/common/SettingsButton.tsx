import React from 'react';
import styles from '../Settings.module.css';

export interface SettingsButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'data-testid'?: string;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  children,
  onClick,
  className = '',
  selected = false,
  disabled = false,
  type = 'button',
  'data-testid': dataTestId,
}) => {
  const buttonClass = [
    styles['setting-button'],
    selected ? styles['setting-button--selected'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};
