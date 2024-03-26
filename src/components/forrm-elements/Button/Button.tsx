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
  className?: string; // Add className prop
}

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  icon,
  onClick,
  disabled,
  className,
}) => {
  const buttonClass =
    type === 'primary'
      ? styles.primary
      : type === 'secondary'
      ? styles.secondary
      : styles.icon;

  return (
    <button
      className={`${styles.button} ${buttonClass} ${className}`} // Add className here
      onClick={onClick}
      disabled={disabled}
    >
      {type !== 'icon' && text}
      {type === 'icon' && icon}
    </button>
  );
};

export default Button;
