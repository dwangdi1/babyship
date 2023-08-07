import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addToCart, fetchProducts } from "../store";
import { deleteProduct, updateProductQuantity } from "../store";

const SingleProduct = () => {
   const { products, auth, cart } = useSelector((state) => state);
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(1);
   const [inventory, setInventory] = useState(0);
   const [oneProd, setOneProd] = useState({});
   const isAdmin = auth.isAdmin;
   const [limitExceeded, setLimiteExceeded] = useState(false);
   const [showPopUp, setShowPopUp] = useState(false);


   useEffect(() => {
        dispatch(fetchProducts());
   },[dispatch]);
   
   useEffect(() => {
      const foundProd = products.find((product) => product.id === id);
      console.log("foundProd " + foundProd)
      if (foundProd) {
         setOneProd(foundProd);
         setInventory(foundProd.quantity);
      }
   }, [products, id]);

   const decrementQ = (value) => {
      if (value > 1) {
         setQuantity(value - 1);
      }
   };

   const incrementQ = (value) => {
      if (value < 5) {
         setQuantity(value + 1);
      }
   };

   const handleQuantityChange = (ev) => {
      const value = Number(ev.target.value);
      if (value >= 1 && value <= 5) {
         setQuantity(value);
      }
   };

   const handleDelete = () => {
      dispatch(deleteProduct(oneProd));
      navigate("/");
   };

         
      return (
         <> 
            <div className="container vertical-center">
               <div className="row justify-content-center">
                  <div className="col-md-6">
                  <div className="card">
                        {oneProd.images?.length > 0 ? (
                            <img src={oneProd.images[0]} alt="Access Image" className="card-img-top img-fluid" />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6">
                     <h2> {oneProd.name}</h2>

                     <p className="product-detail">
                        <strong>Description:</strong>
                     </p>
                     <p
                        className="description"
                        style={{
                           fontSize: "1rem",
                           color: "dark grey"
                        }}>
                        {oneProd.description}
                     </p>
                     <p className="product-detail">
                        <strong>Price:</strong> ${oneProd.price}
                     </p>
                        <div className="d-flex justify-content-start">
                           <div className="mt-3">
                              <div className="input-group text-center">
                                 <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => decrementQ(quantity)}>
                                    -
                                 </button>
                                 <input
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="form-control border-0 text-center"
                                    style={{ maxWidth: "40px" }}
                                 />
                                 <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => incrementQ(quantity)}
                                    disabled={quantity >= oneProd.quantity}>
                                    +
                                 </button>
                              </div>
                           </div>
                           <div className="d-flex justify-content-start">
                              <button
                                 className="btn btn-outline-dark mt-3 me-2 ms-2"
                                 onClick={() => {
                                    dispatch(updateProductQuantity({ product: oneProd, quantity: quantity }));
                                    dispatch(addToCart({ product: oneProd, quantity }));
                                 }}>
                                 Add to Cart
                              </button>
                              <Link to="/">
                                 <button className="btn btn-outline-dark mt-3">CONTINUE SHOPPING</button>
                              </Link>
                           </div>
                        </div>
                  </div>
               </div>
               
            </div>
         </>
         
      );
   };

export default SingleProduct;