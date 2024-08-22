import { useDispatch, useSelector } from 'react-redux'
import { Modal, Spinner } from 'react-bootstrap'
const LoaderBar = () => {
  const loader = useSelector((state) => state.loader)
  return (
    <>
      <Modal show={loader.isLoading} centered backdrop="static" size="sm">
        <Modal.Body>
          <div className="tw-flex tw-flex-wrap">
            <Spinner animation="border" role="status" className="tw-mr-2">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="tw-my-auto">{loader.message}</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default LoaderBar
