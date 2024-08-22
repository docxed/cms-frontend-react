import { useDispatch, useSelector } from 'react-redux'
import { Toast, ToastContainer } from 'react-bootstrap'
import {
  CheckCircleFill,
  ExclamationCircleFill,
  ExclamationTriangleFill,
  InfoCircleFill,
} from 'react-bootstrap-icons'
import { removeNotification } from '@/stores/notification.store'

const NotificationBar = () => {
  const notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  const icon = {
    success: <CheckCircleFill />,
    danger: <ExclamationCircleFill />,
    warning: <ExclamationTriangleFill />,
    info: <InfoCircleFill />,
  }

  const handleClose = (id) => {
    dispatch(removeNotification(id))
  }

  return (
    <ToastContainer position="top-end">
      {notifications.map((noti) => (
        <Toast
          className="m-2"
          key={noti.id}
          onClose={() => handleClose(noti.id)}
          delay={noti.timeout}
          bg={noti.type}
          autohide
          onClick={() => handleClose(noti.id)}
        >
          <Toast.Body className="tw-flex tw-flex-wrap">
            <span className="tw-my-auto tw-mr-1 tw-text-lg">
              {icon[noti.type]}
            </span>
            {noti.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}

export default NotificationBar
