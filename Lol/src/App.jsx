import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des produits.");
        console.error("Erreur fetch produits :", err.message);
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

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été créé`);
    } catch (err) {
      alert("Une erreur est survenue lors de la création du produit.");
      console.error("Erreur création produit :", err.message);
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

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été modifié`);
    } catch (err) {
      alert("Une erreur est survenue lors de la modification du produit.");
      console.error("Erreur modification complète :", err.message);
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

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
    } catch (err) {
      alert("Une erreur est survenue lors de la modification du prix.");
      console.error("Erreur patch prix :", err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été supprimé`);
    } catch (err) {
      alert("Une erreur est survenue lors de la suppression du produit.");
      console.error("Erreur suppression :", err.message);
    }
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={handleAddProduct} className="mb-4">
        Ajouter un produit
      </Button>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

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
