import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const {products} = useSelector(state => state);
    const {id} = useParams();
    const [oneProd, setOneProd] = useState({});

    useEffect(() => {
        const singleProd = products.find((product) => product.id === id);
        if(singleProd) {
            setOneProd(singleProd);
        }
    }, [products, id])

  return (
    <div>{oneProd.name}</div>
  )
}

export default SingleProduct