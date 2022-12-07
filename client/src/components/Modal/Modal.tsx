import React from "react";
import './Modal.css'

const Modal = ({ setIsOpen, children }: { children: React.ReactNode, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <div className={'modal-background'} onClick={() => setIsOpen(false)} />
            <div className='modal-container'>
                <div className='modal'>
                    <button className='modal-close-btn' onClick={() => setIsOpen(false)}>
                       x
                    </button>
                    <div className='modal-content'>
                       {children}
                    </div>
          
                </div>
            </div>
        </>
    );
};

export default Modal;