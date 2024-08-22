import PublicRoute from '@/middlewares/PublicRoute'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage'
import LogoutPage from './pages/LogoutPage'

const AuthRoutes = () => {
  return (
    <>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />,
        <Route path="/register" element={<RegisterPage />} />,
      </Route>
      <Route path="/logout" element={<LogoutPage />} />,
    </>
  )
}

export default AuthRoutes
