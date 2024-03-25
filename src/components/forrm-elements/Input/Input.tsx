import React, { useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  type: 'text' | 'email' | 'password'; // Type of input
  placeholder?: string; // Placeholder text
  value: string; // Value of the input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange event handler
}

export default function Input(props: InputProps) {
  const { type, placeholder, value, onChange } = props;
  const [inputType, setInputType] = useState(type);
  const [isActive, setIsActive] = useState(false);

  const togglePasswordVisibility = () => {
    if (type === 'password') {
      setInputType(inputType === 'password' ? 'text' : 'password');
    }
  };

  return (
    <div className={`${styles.inputWrapper} ${isActive ? styles.active : ''}`}>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value} // Set value prop
        onChange={onChange} // Set onChange prop
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={styles.input}
      />
      {type === 'password' && (
        <button
          className={styles.toggleButton}
          onClick={togglePasswordVisibility}
        >
          {inputType === 'password' ? 'Show' : 'Hide'}
        </button>
      )}
    </div>
  );
}
