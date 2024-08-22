import PrivateRoute from '@/middlewares/PrivateRoute'
import BlogPage from './pages/BlogPage/BlogPage'

const AuthRoutes = () => {
  return (
    <>
      <Route element={<PrivateRoute />}>
        <Route path="/blog" element={<BlogPage />} />
      </Route>
    </>
  )
}

export default AuthRoutes
