import { Container, Button, Pagination } from 'react-bootstrap'
import { loaderStart, loaderStop } from '@/stores/loader.store'
import { useDispatch } from 'react-redux'
import useBlogAPI from '@/modules/blog/api/blog.api.js'
import { useTitle } from '@reactuses/core'
import { successNotification } from '@/stores/notification.store'

import BaseModal from '@/components/Base/BaseModal.jsx'
import ManageForm from '@/modules/blog/components/BlogPage/ManageForm.jsx'
import Blog from '@/modules/blog/components/BlogPage/Blog.jsx'
import { useEffect } from 'react'

const BlogPage = () => {
  const blogAPI = useBlogAPI()
  const dispatch = useDispatch()
  useTitle(`Blog`)

  const [showCreate, setShowCreate] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [itemsLength, setItemsLength] = useState(0)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [showEdit, setShowEdit] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const getBlog = async () => {
    try {
      dispatch(loaderStart())
      const data = await blogAPI.getAll({
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        is_active: true,
      })
      setBlogs(data.results)
      setItemsLength(data.count)
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(loaderStop())
    }
  }
  const onEdit = (blog) => {
    setEditItem(blog)
    setShowEdit(true)
  }
  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        dispatch(loaderStart())
        await blogAPI.remove(id)
        dispatch(successNotification('Delete blog successfully'))
        getBlog()
      } catch (err) {
        console.error(err)
      } finally {
        dispatch(loaderStop())
      }
    }
  }

  useEffect(() => {
    if (!showEdit) {
      getBlog()
    }
  }, [showEdit])
  useEffect(() => {
    if (!showCreate) {
      getBlog()
    }
  }, [showCreate])
  useEffect(() => {
    getBlog()
  }, [page])

  return (
    <Container>
      <section className="tw-flex tw-flex-wrap tw-justify-between tw-mb-5">
        <span className="h2">Blog</span>
        <Button variant="success" onClick={() => setShowCreate(true)}>
          Create
        </Button>
      </section>

      <section className="tw-flex tw-flex-col tw-space-y-2">
        {blogs.map((blog) => (
          <Blog
            key={blog._id}
            blog={blog}
            onEdit={() => onEdit(blog)}
            onDelete={() => onDelete(blog._id)}
          />
        ))}
      </section>
      <Pagination className="tw-my-2">
        <Pagination.Prev
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1))
          }}
          disabled={page === 1}
        />
        {Array.from({ length: Math.ceil(itemsLength / itemsPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === page}
              onClick={() => {
                setPage(index + 1)
              }}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => {
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(itemsLength / itemsPerPage))
            )
          }}
          disabled={page === Math.ceil(itemsLength / itemsPerPage)}
        />
      </Pagination>

      <BaseModal
        title="Edit Blog"
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        children={
          <ManageForm
            isUpdate={true}
            editItem={editItem}
            onClose={() => setShowEdit(false)}
          />
        }
      />
      <BaseModal
        title="Create Blog"
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        children={<ManageForm onClose={() => setShowCreate(false)} />}
      />
    </Container>
  )
}

export default BlogPage
