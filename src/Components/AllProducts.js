import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from "react-bootstrap";


const AllProducts = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state)
    
    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch])


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
                                <Button variant="primary">Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default AllProducts;