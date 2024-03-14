import { Outlet } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const Layout = () => (
  <>
    <Navbar bg="light" expand="lg" shadow="true">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
    <Outlet />
  </>
);

export default Layout;
