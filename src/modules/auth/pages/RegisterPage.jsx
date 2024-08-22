import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Form, Card, Button, InputGroup } from 'react-bootstrap'
import { EnvelopeFill, KeyFill } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { successNotification } from '@/stores/notification.store'
import { loaderStart, loaderStop } from '@/stores/loader.store'
import useAuthAPI from '@/modules/auth/api/auth.api.js'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .max(100, 'Email must be at most 100 characters')
    .email('Enter a valid email address')
    .required('Email is required'),
  firstname: Yup.string()
    .max(100, 'First name must be at most 100 characters')
    .required('First name is required'),
  lastname: Yup.string()
    .max(100, 'Last name must be at most 100 characters')
    .required('Last name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

const RegisterPage = () => {
  const authAPI = useAuthAPI()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      dispatch(loaderStart())
      await authAPI.register({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        confirm_password: data.confirmPassword,
      })
      dispatch(successNotification('Register successfully'))
      navigate('/login')
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(loaderStop())
    }
  }

  return (
    <Container className="tw-flex tw-flex-col tw-min-h-screen">
      <Card className="tw-my-auto">
        <Card.Body>
          <Card.Title>
            <h2>Register</h2>
          </Card.Title>
          <Form
            className="tw-flex tw-flex-col tw-space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <EnvelopeFill />
                </InputGroup.Text>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      placeholder="Email"
                      isInvalid={!!errors.email}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="tw-grid tw-grid-cols-2 tw-gap-2">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Controller
                  name="firstname"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      placeholder="First Name"
                      isInvalid={!!errors.firstname}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstname?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Controller
                  name="lastname"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      placeholder="Last Name"
                      isInvalid={!!errors.lastname}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastname?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <KeyFill />
                </InputGroup.Text>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      isInvalid={!!errors.password}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <KeyFill />
                </InputGroup.Text>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      isInvalid={!!errors.confirmPassword}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="tw-m-auto">
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Register
              </Button>
              <Link to="/login">
                <Button variant="link">Login</Button>
              </Link>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RegisterPage
