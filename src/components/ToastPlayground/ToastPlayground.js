import React from 'react';

import Button from '../Button';
import styles from './ToastPlayground.module.css';
import Toast from '../Toast/Toast';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [selectedToast, setSelectedToast] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {
        showToast && <Toast message={message}
          variant={selectedToast}
          onClose={() => setShowToast(false)}
        />
      }
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message"
              className={styles.messageInput}
              value={message}
              onChange={event => setMessage(event.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(variant => (
              <label
                key={variant}
                htmlFor={`variant-${variant}`}
              >
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={variant === selectedToast}
                  onChange={event => {
                    setSelectedToast(event.target.value);
                  }}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={() => setShowToast(true)}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
