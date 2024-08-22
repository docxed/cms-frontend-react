import NotificationBar from '@/components/App/NotificationBar'
import LoaderBar from '@/components/App/LoaderBar'
import MenuBar from '@/components/App/MenuBar'
import { useSelector } from 'react-redux'

const MainLayout = ({ children }) => {
  const auth = useSelector((state) => state.auth)

  return (
    <div className="tw-min-h-screen tw-bg-[#f1f1f1]">
      {auth.user && <MenuBar />}
      <section className="tw-p-4">{children}</section>
      <NotificationBar />
      <LoaderBar />
    </div>
  )
}

export default MainLayout
