import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, fetchProducts, fetchTopSellers, updateProductQuantity } from '../store';
import { Button } from 'react-bootstrap';

const Home = ()=> {
  const { auth, products, topSellers } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTopSellers());
    dispatch(fetchProducts());
  },[dispatch])

  const handleAddToCart = (product) => {
    dispatch(updateProductQuantity({ product: product, quantity: 1 }))
      .then(() => {
        return dispatch(addToCart({ product: product, quantity: 1 }));
      })
      .then(() => {
        dispatch(fetchTopSellers());
        toast.success(`${product.name} added to cart!`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div>
        <div className="text-center position-relative">
          <img
              src="https://images.pexels.com/photos/15880584/pexels-photo-15880584/free-photo-of-little-baby-in-yellow-rompers-on-a-fuzzy-blanket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="#"
              className="img-fluid w-100 h-60 opacity-85 mb-5"
          />
          <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                padding: "10px",
                borderRadius: "5px",
              }}
          >
              <h1
                className="fas fa-cat"
                style={{
                    fontSize: "3.5rem",
                    letterSpacing: "3px",
                    color: "black",
                    fontWeight: "bold",
                    fontBorder: "1px solid black",
                }}
              >
                Beanies & Blankets
              </h1>
          </div>
        </div>

      <h2 style={{marginLeft: "20px"}}> Best Sellers: </h2>
        <div style={{marginLeft:"20px", marginRight:"20px"}}>
          <Row xs={1} md={2} className="g-4">
          {topSellers.map((product) => (
            <Col key={product.id}>
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" style={{ backgroundColor:"white", height: '300px', objectFit: 'contain' }} src={product.images[0]} />
                <Card.Body style={{backgroundColor:"white", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>                  <div>
                    <Card.Title className="p-2" style={{backgroundColor:"white", marginBottom: "0"}}>{product.name}</Card.Title>
                    <Card.Text style={{backgroundColor:"white"}}>
                      {product.description}
                    </Card.Text>
                  </div>
                  <div style={{backgroundColor:"white"}} class="d-grid gap-2 d-md-flex justify-content-md-center mt-2 ">
                    <Button href={`#/${product.id}`} variant="primary">Details</Button>
                    <Button disabled={product.quantity <= 0} onClick={() => handleAddToCart(product)} variant="primary">
                      {product.quantity > 0 ? 'Add To Cart': 'Sold Out'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
      <div style={{display: "flex", justifyContent:"center", margin: "20px"}}>
        <button class="btn btn-secondary"  onClick={() => navigate("/all-products")}>Click For All Products</button>
      </div>
      <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
  );
};

export default Home;
