import React from 'react';
import Button from '../../components/forrm-elements/Button/Button';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <Button type="primary" text="Yes" onClick={onConfirm} />
          <Button type="secondary" text="No" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
