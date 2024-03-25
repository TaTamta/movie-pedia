import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'icon'; // Type of button
  text?: string; // Button text (for primary and secondary buttons)
  icon?: React.ReactNode; // Icon component (for icon button)
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

export default function Button({ type, text, icon, onClick }: ButtonProps) {
  const buttonClass =
    type === 'primary' ? styles.primary :
    type === 'secondary' ? styles.secondary :
    styles.icon;

  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {type !== 'icon' && text}
      {type === 'icon' && icon}
    </button>
  );
}
