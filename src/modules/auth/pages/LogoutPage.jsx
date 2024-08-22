import { useDispatch } from 'react-redux'
import { logout } from '@/stores/auth.store'

const LogoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    onLogout()
  }, [])

  return <></>
}

export default LogoutPage
