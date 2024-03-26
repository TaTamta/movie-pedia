import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'icon';
  text?: string;
  icon?: React.ReactNode;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  disabled?: boolean;
}

export default function Button({
  type,
  text,
  icon,
  onClick,
  disabled,
}: ButtonProps) {
  const buttonClass =
    type === 'primary'
      ? styles.primary
      : type === 'secondary'
      ? styles.secondary
      : styles.icon;

  return (
    <button
      className={`${styles.button} ${buttonClass}`}
      onClick={onClick}
      disabled={disabled} // Apply disabled attribute
    >
      {type !== 'icon' && text}
      {type === 'icon' && icon}
    </button>
  );
}
