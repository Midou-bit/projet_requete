import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
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

  const handleAddProduct = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Produit fictif',
          price: 29.99,
          description: 'Ceci est un produit factice pour test',
          image: 'https://via.placeholder.com/150',
          category: 'test',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été créé`);
    } catch (error) {
      console.error('Erreur lors de la création :', error);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: 'Produit modifié',
          price: 49.99,
          description: 'Ceci est une mise à jour complète du produit',
          image: 'https://via.placeholder.com/200',
          category: 'modifié',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été modifié`);
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
    }
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={handleAddProduct} className="mb-4">
        Ajouter un produit
      </Button>
      <Row className="g-4">
        {products.map(product => (
          <Col xs={1} md={3} key={product.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price} €</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleUpdateProduct(product.id)}
                >
                  Modifier le produit complet
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
