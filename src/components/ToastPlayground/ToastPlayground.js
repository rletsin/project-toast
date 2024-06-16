import React from 'react';

import Button from '../Button';
import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [selectedVariant, setSelectedVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState('');
  const [toastStack, setToastStack] = React.useState([]);

  function addNewToast() {
    setToastStack([...toastStack, {
      message,
      variant: selectedVariant,
      id: crypto.randomUUID(),
    }]);
    setMessage('');
    setSelectedVariant('notice');
  }

  function closeToast(id) {
    const index = toastStack.findIndex(t => t.id === id);
    console.log(`Closing toast with id ${id} at index ${index}`);
    if (index !== -1) {
      const updatedArray = [...toastStack];
      updatedArray.splice(index, 1)
      setToastStack(updatedArray);
    }
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {
        toastStack.length > 0 && <ToastShelf toasts={toastStack} onCloseToast={closeToast} />
      }
      <form
        onSubmit={(event) => {
          event.preventDefault()
          addNewToast()
        }}
        className={styles.controlsWrapper}
      >
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
                  checked={variant === selectedVariant}
                  onChange={event => {
                    setSelectedVariant(event.target.value);
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
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
