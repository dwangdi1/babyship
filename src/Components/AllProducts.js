import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store";


const AllProducts = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state)
    
    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch])

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <img 
                        src={product.images[0]}
                    />
                    <p>{product.price}</p>
                </div>
            ))}
        </div> 
    )
}

export default AllProducts;