import React from "react";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

// PUBLIC_INTERFACE
const ConfirmDialog: React.FC<Props> = ({ open, onConfirm, onCancel, children }) =>
  !open ? null : (
    <div className="modal-backdrop show" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-dialog confirm show" onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );

export default ConfirmDialog;
