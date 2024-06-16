import React from 'react';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addNewToast = React.useCallback((message, variant) => {
    const nextToasts = [
      ...toasts,
      {
        message,
        variant,
        id: crypto.randomUUID(),
      },
    ];

    setToasts(nextToasts);
  }, [toasts]);

  const closeToast = React.useCallback((id) => {
    const index = toasts.findIndex(t => t.id === id);
    console.log(`Closing toast with id ${id} at index ${index}`);

    if (index !== -1) {
      const updatedArray = [...toasts];
      updatedArray.splice(index, 1)
      setToasts(updatedArray);
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addNewToast, closeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
