import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { addToCart, fetchProducts, fetchTopSellers, updateProductQuantity } from '../store';
import { Button } from 'react-bootstrap';

const Home = ()=> {
  const { auth, topSellers } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTopSellers());
    dispatch(fetchProducts());
  },[dispatch])

  const handleAddToCart = (product) => {
    dispatch(updateProductQuantity({product: product, quantity: 1}));
    dispatch(addToCart({product:product, quantity: 1}));
};

  return (
    <div>
      <h1>Home, Welcome {auth.username}</h1>
        <div>
          <Row xs={1} md={2} className="g-4">
          {topSellers.map((product) => (
            <Col key={product.id}>
              <Card>
                <Card.Img variant="top" style={{ height: '200px', objectFit: 'scale-down' }} src={product.images[0]} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Button href={`#/${product.id}`}variant="primary">Details</Button>
                  <Button onClick={() => handleAddToCart(product)} variant="primary">Add To Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
        
      <button onClick={() => navigate("/all-products")}>Click For All Products</button>
    </div>
  );
};

export default Home;
