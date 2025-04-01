import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Container className="mt-4">
      <Row xs={1} md={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card style={{ height: '100%' }}>
              <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }} 
                />
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price} $</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
