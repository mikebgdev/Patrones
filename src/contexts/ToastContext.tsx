import React, { createContext, useContext, useReducer } from 'react';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

type ToastAction =
  | { type: 'ADD'; toast: Omit<Toast, 'id'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case 'ADD': {
      const id = Math.random().toString(36).substring(2, 9);
      return [...state, { id, ...action.toast }];
    }
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, dispatch] = useReducer(toastReducer, [] as Toast[]);

  const toast = (toastData: Omit<Toast, 'id'>) => {
    dispatch({ type: 'ADD', toast: toastData });
  };

  const dismiss = (id?: string) => {
    if (id) dispatch({ type: 'REMOVE', id });
    else dispatch({ type: 'CLEAR' });
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
