import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { loaderStart, loaderStop } from '@/stores/loader.store'
import { successNotification } from '@/stores/notification.store'
import useBlogAPI from '@/modules/blog/api/blog.api.js'

const validateSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
  description: Yup.string().max(500, 'Content must be at most 1000 characters'),
})

const ManageForm = ({ isUpdate, editItem, onClose }) => {
  const dispatch = useDispatch()
  const blogAPI = useBlogAPI()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateSchema),
    mode: 'onChange',
  })

  const onCreate = async (data) => {
    try {
      dispatch(loaderStart())
      await blogAPI.create({
        title: data.title,
        description: data.description,
      })
      dispatch(successNotification('Create blog successfully'))
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(loaderStop())
    }
  }
  const onUpdate = async (data) => {
    try {
      dispatch(loaderStart())
      await blogAPI.update(editItem._id, {
        title: data.title,
        description: data.description,
      })
      dispatch(successNotification('Update blog successfully'))
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(loaderStop())
    }
  }
  const onSubmit = async (data) => {
    if (isUpdate) {
      onUpdate(data)
    } else {
      onCreate(data)
    }
  }

  useEffect(() => {
    if (isUpdate) {
      reset({
        title: editItem.title,
        description: editItem.description,
      })
    }
  }, [])

  return (
    <Form
      className="tw-flex tw-flex-col tw-space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Control
              placeholder="Title"
              isInvalid={!!errors.title}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Control
              as="textarea"
              placeholder="Description"
              isInvalid={!!errors.description}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="tw-flex tw-flex-row tw-space-x-2">
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
      </Form.Group>
    </Form>
  )
}

export default ManageForm
