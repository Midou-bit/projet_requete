import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(true);
        console.error('erreur lors du chargement des produits :', err);
      } finally {
        setLoading(false);
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
    } catch (err) {
      alert("erreur survenue.");
      console.error('Erreur lors de la création :', err);
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
    } catch (err) {
      alert("erreur survenue.");
      console.error('Erreur lors de la modification :', err);
    }
  };

  const handlePartialUpdate = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ price: 5 }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
    } catch (err) {
      alert("erreur survenue.");
      console.error('Erreur lors du changement de prix :', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été supprimé`);
    } catch (err) {
      alert("erreur survenue.");
      console.error('Erreur lors de la supression :', err);
    }
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={handleAddProduct} className="mb-4">
        Ajouter un produit
      </Button>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">erreur lors du chargement des produit.</Alert>}

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
                  className="mb-2"
                >
                  Modifier le produit complet
                </Button>
                <Button
                  variant="success"
                  onClick={() => handlePartialUpdate(product.id)}
                  className="mb-2"
                >
                  Modifier le prix du produit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Supprimer le produit
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
