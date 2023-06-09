import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; 
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import Modals from '../../Reusable/Modals';
import { useSearchParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

function AppNavbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const username = localStorage.getItem('username');
  const [search, setSearch] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const onSearch = (e) => {
    const searchInput = e.target.value;
  
    if (searchInput.length === 0) {
      search.delete('q');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('q', searchInput);
      setSearch(search, {
        replace: true
      });
    }
  }

  const handleLogoutConfirm = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('username')
    localStorage.removeItem('isLoggedIn')
    setShowLogoutModal(false);
    navigate('/User/Home')
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };  

  return (
    <Navbar expand="md">
      <Container>
        <Link to="/User/Home">
          <Navbar.Brand>
            <img
              src="/logo_cart.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!isLoggedIn && ( 
            <Form className="d-flex ms-auto">
              <FormControl type="search" placeholder="Search your product here" onChange={onSearch} className="me-2 search-bar" aria-label="Search" />
            </Form>
          )}
          <Nav className="ms-auto">
            {isLoggedIn && (
              <>
                <Navbar.Text className="username me-3">Hello, {username}!</Navbar.Text>
                <Nav.Link href="/" onClick={handleLogoutClick}>Logout</Nav.Link>
                <Modals
                    show={showLogoutModal}
                    title="Confirm Logout"
                    message="Are you sure you want to log out?"
                    primaryButtonLabel="Logout"
                    primaryButtonVariant="primary"
                    onPrimaryButtonClick={handleLogoutConfirm}
                    secondaryButtonLabel="Cancel"
                    secondaryButtonVariant="secondary"
                    onSecondaryButtonClick={handleLogoutCancel}
                />
              </>
            )}
            {!isLoggedIn && (
              <Link to="/User/Cart" className={`nav-link ${location.pathname === '/User/Cart' ? 'active' : ''}`}>
                Shopping Cart
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
