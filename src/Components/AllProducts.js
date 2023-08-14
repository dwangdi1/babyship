import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts, updateProductQuantity } from "../store";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "react-bootstrap";


const AllProducts = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state)
    
    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch])

    const handleAddToCart = (product) => {
        dispatch(updateProductQuantity({ product: product, quantity: 1 }))
          .then(() => {
            return dispatch(addToCart({ product: product, quantity: 1 }));
          })
          .then(() => {
            dispatch(fetchProducts());
            toast.success(`${product.name} added to cart!`);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    if(!products) {
        return null;
    }

    return (
        <div>
            <h1>All Products: </h1>
            <Row xs={1} md={2} className="g-4">
            {products.map((product) => (
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
    )
}

export default AllProducts;