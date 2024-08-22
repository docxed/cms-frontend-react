import { Modal } from 'react-bootstrap'

const BaseModal = ({ children, isOpen, onClose, title }) => {
  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default BaseModal
