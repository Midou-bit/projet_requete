import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors du fetch :', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {products.map(product => (
          <Col xs={1} md={3} key={product.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} />
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
