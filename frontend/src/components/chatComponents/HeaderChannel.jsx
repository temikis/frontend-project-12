import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const HeaderChannel = () => (
  <Container fluid>
    <Row xs="auto" className="mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <Col>
        <b>Каналы</b>
      </Col>
      <Col xs="auto">
        <ButtonGroup vertical>
          <Button variant="text" className="p-0 text-primary">
            <PlusSquare width="20" height="20" />
            <span className="visually-hidden">+</span>
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  </Container>
);

export default HeaderChannel;
