import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Form, InputGroup, Button } from 'react-bootstrap'
import { EnvelopeFill, KeyFill } from 'react-bootstrap-icons'
import { loaderStart, loaderStop } from '@/stores/loader.store'
import useAuthAPI from '@/modules/auth/api/auth.api.js'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const LoginPage = () => {
  const auth = useSelector((state) => state.auth)
  const authAPI = useAuthAPI()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      await authAPI.login({
        email: data.email,
        password: data.password,
      })
      navigate('/home')
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
            <h2>Login</h2>
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
                      type="email"
                      placeholder="Email"
                      isInvalid={errors.email}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
                      isInvalid={errors.password}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="tw-m-auto">
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
              <Link to="/register">
                <Button variant="link">Register</Button>
              </Link>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage
