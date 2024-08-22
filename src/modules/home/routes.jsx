import PrivateRoute from '@/middlewares/PrivateRoute'
import HomePage from './pages/HomePage'

const AuthRoutes = () => {
  return (
    <>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </>
  )
}

export default AuthRoutes
