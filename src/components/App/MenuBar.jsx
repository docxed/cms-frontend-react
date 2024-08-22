import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const MenuBar = () => {
  const auth = useSelector((state) => state.auth)

  return (
    <Navbar className="bg-primary navbar-primary">
      <Container>
        <Navbar.Brand>
          <img
            src="./public/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="d-inline-block align-top tw-mr-2"
          />
          CMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            <NavDropdown
              title={`${auth.user.firstname} ${auth.user.lastname}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Divider />
              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MenuBar
