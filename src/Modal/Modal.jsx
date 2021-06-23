import React from "react"

const Modal = ({ modalImg, onCloseModal, onCloseEscape }) => (
  <div className="Overlay" onClick={onCloseModal} onKeyDown={onCloseEscape}>
    <div className="Modal">
      <img src={modalImg} alt="" />
    </div>
  </div>
);

export default Modal