import React from "react";

export type ModalButtonProps = {
  modalId: string;
  children: React.ReactNode;
  isRed?: boolean;
  onClick?: () => void;
  disableClose?: boolean;
  isPrimary?: boolean;
};

const Modal: React.FC<{
  children: React.ReactNode;
  id: string;
  resetModalState?: () => void;
  confirmButton?: ModalButtonProps;
  cancelButton?: ModalButtonProps;
}> = (props) => {
  return (
    <>
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <label htmlFor={props.id} className="modal cursor-pointer">
        <label className="modal-box relative">
          {
            props.children
          }
          <div className="modal-action">
            {
              props.cancelButton &&
              <ModalActionButton
                {...props.cancelButton}
              />
            }
            {
              props.confirmButton &&
              <ModalActionButton {...props.confirmButton} />
            }
          </div>
        </label>
      </label>
    </>
  )
}

export const ModalActionButton: React.FC<ModalButtonProps> = (props) => {
  return (
    <a onClick={props.onClick}>
      <label htmlFor={!props.disableClose ? props.modalId : 'you are not closing'}
        className={`btn ${props.isPrimary ? 'btn-primary' : ''} ${props.isRed ? 'btn-error' : ''}`}>
        {props.children}
      </label>
    </a>
  )
}


export default Modal;
