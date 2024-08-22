import { cloneElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from '@/layouts/NotFoundPage'
import { v4 as uuidv4 } from 'uuid'
import MainLayout from '@/layouts/MainLayout.jsx'

const routeModules = import.meta.glob('./modules/**/routes.jsx', {
  eager: true,
})

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {Object.keys(routeModules).map((path) => {
            const ModuleRoutes = routeModules[path].default
            const routes = ModuleRoutes()
            if (routes) {
              return cloneElement(routes, { key: uuidv4() })
            }
          })}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
