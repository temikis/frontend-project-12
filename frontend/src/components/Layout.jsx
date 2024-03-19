import { Outlet } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Button variant="primary">Выйти</Button>
      </Container>
    </Navbar>
    <Outlet />
  </div>
);

export default Layout;
