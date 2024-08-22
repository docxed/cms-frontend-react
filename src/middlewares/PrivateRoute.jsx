import { useSelector } from 'react-redux'

const PrivateRoute = ({ redirectPath = '/login' }) => {
  const { accessToken } = useSelector((state) => state.auth)
  const location = useLocation()

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} />
  )
}

export default PrivateRoute
