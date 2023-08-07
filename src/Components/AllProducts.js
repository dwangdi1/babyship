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
            <Row xs={1} md={3}>
                {products.map((product) => (
                    <Col key={product.id} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.images[0]} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Button href={`#/${product.id}`} variant="primary">Details</Button>
                                <Button disabled={product.quantity === 0} onClick={() => handleAddToCart(product)} variant="primary">
                                    {product.quantity > 0 ? <span>Add To Cart</span> : <span>Sold Out</span>}
                                </Button>
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