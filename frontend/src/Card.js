import Card from 'react-bootstrap/Card';

function CardComponent({header, title, text}) {
  return (
    
        <Card
          bg="info"
          text='white'
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>{header}</Card.Header>
          <Card.Body>
            <Card.Title>{title} </Card.Title>
            <Card.Text>
              {text}
            </Card.Text>
          </Card.Body>
        </Card>
      
  );
}

export default CardComponent