import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from 'react-bootstrap';

function NumberedList({items, listName}) {
  return (
    <Container>
    <h2>Your Top 10 {listName}</h2>
    <ListGroup as="ol" numbered>
      {items.map( item => <ListGroup.Item as="li">{item}</ListGroup.Item>)}
    </ListGroup>
    </Container>
  );
}

export default NumberedList;