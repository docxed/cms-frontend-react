import { useSelector } from 'react-redux'

const PublicRoute = ({ redirectPath = '/home' }) => {
  const { accessToken } = useSelector((state) => state.auth)
  const location = useLocation()

  return accessToken ? (
    <Navigate to={redirectPath} state={{ from: location }} />
  ) : (
    <Outlet />
  )
}

export default PublicRoute
