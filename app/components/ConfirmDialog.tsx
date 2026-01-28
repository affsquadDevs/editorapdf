'use client';

import { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
  showCancel?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning',
  showCancel = true,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the confirm button when dialog opens
    setTimeout(() => confirmButtonRef.current?.focus(), 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      iconBg: 'bg-error-500/10 border-error-500/20',
      iconColor: 'text-error-400',
      buttonClass: 'btn-danger',
    },
    warning: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      iconBg: 'bg-warning-500/10 border-warning-500/20',
      iconColor: 'text-warning-400',
      buttonClass: 'bg-gradient-to-r from-warning-600 to-warning-500 text-white hover:from-warning-500 hover:to-warning-400 shadow-lg shadow-warning-500/25',
    },
    info: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
      iconBg: 'bg-primary-500/10 border-primary-500/20',
      iconColor: 'text-primary-400',
      buttonClass: 'btn-primary',
    },
  };

  const config = typeConfig[type];

  return (
    <div className="modal" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="overlay animate-fade-in"
        onClick={onCancel}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div
        ref={dialogRef}
        className="modal-content animate-scale-in"
        role="alertdialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl ${config.iconBg} border flex items-center justify-center mb-4`}>
          <div className={config.iconColor}>
            {config.icon}
          </div>
        </div>
        
        {/* Content */}
        <h3
          id="dialog-title"
          className="text-lg font-semibold text-surface-100 mb-2"
        >
          {title}
        </h3>
        
        <p
          id="dialog-description"
          className="text-surface-400 text-sm leading-relaxed mb-6"
        >
          {message}
        </p>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end">
          {showCancel && (
            <button
              onClick={onCancel}
              className="btn-md btn-secondary"
            >
              {cancelText}
            </button>
          )}
          
          <button
            ref={confirmButtonRef}
            onClick={onConfirm}
            className={`btn-md ${config.buttonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
