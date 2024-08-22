import { Card, Button } from 'react-bootstrap'

const Blog = ({ blog, onEdit, onDelete }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="tw-flex tw-flex-row tw-justify-between">
        <small className="text-muted">
          {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </small>
        <small className="tw-flex tw-flex-row tw-flex-wrap tw-space-x-1">
          <Button variant="primary" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Blog
