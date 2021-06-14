import React from "react"

const Modal = ({modalImg, onCloseModal}) => (
  <div className="Overlay" onClick={ onCloseModal}>
  <div className="Modal">
    <img src={modalImg} alt="" />
  </div>
</div>
)

export default Modal