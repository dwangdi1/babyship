import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addToCart, createReview, fetchProducts } from "../store";
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
   const [submittedReview, setSubmittedReview] = useState({
        title: "",
        rating: 1,
        comment: "",
        userId: auth.id
   });


   useEffect(() => {
        dispatch(fetchProducts());
   },[dispatch]);
   
   useEffect(() => {
      const foundProd = products.find((product) => product.id === id);
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

   const onChange = (ev) => {
        setSubmittedReview({...submittedReview, [ev.target.name]: ev.target.value })
   }

   const handleReviewSubmit = async (ev) => {
        const reviewWithUser = { ...submittedReview, userId: auth.id };
        dispatch(createReview({ newReview: reviewWithUser, prodId: oneProd.id }));
        dispatch(fetchProducts());
    }

   if(!oneProd) {
        return <div> Loading...</div>
   }


         
      return (
         <> 
            <div className="container vertical-center">
               <div className="row justify-content-center">
                  <div className="col-md-5">
                  <div className="card">
                        {oneProd.images?.length > 1 ? (
            
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                            {oneProd.images.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                            </div>
                            <div className="carousel-inner">
                                {oneProd.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    >
                                        <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next"
                            >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        ) : (
                            oneProd.images?.length === 1 ? (
                                <img src={oneProd.images[0]} alt="Access Image" className="card-img-top img-fluid" />
                            ) : (
                                <p>No image Available</p>

                            )
                        )}
                        </div>
                    </div>
                  <div className="col-md-7">
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
                              <div className="d-flex input-group text-center">
                                 <button
                                    className="btn btn-outline-secondary"
                                    style={{backgroundColor:"white"}}
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
                                    style={{backgroundColor:"white"}}
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
                                 disabled={oneProd.quantity <= 0}
                                 onClick={() => {
                                    dispatch(updateProductQuantity({ product: oneProd, quantity: quantity }));
                                    dispatch(addToCart({ product: oneProd, quantity }));
                                 }}>
                                 {oneProd.quantity <= 0 ? "Sold Out" : "Add to Cart"}
                              </button>
                              <Link to="/">
                                 <button className="btn btn-outline-dark mt-3">CONTINUE SHOPPING</button>
                              </Link>
                           </div>
                        </div>
                  </div>
               </div>
               
            </div>
            <div>
                {auth.id ? (
                    <div>
                        <h1>Leave a Review </h1>
                        <form onSubmit={(ev) => handleReviewSubmit(ev)}>
                            <div class="form-group">
                                <label for="FormTitle">Add a Headline</label>
                                <input type="text"  value={submittedReview.title} name="title" onChange={onChange} class="form-control" id="FormTitle" placeholder="What's most important to know?" />
                            </div>
                            <div className="form-group">
                                <label for="formSelectRating">Select Overall Rating</label>
                                <select value={submittedReview.rating} name="rating" onChange={onChange} className="form-control" id="formSelectRating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="reviewFormTextArea">Add a Written Review</label>
                                <textarea value={submittedReview.comment} name="comment" onChange={onChange} className="form-control" id="reviewFormTextArea" rows="3" placeholder="What did you like or dislike?"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                ): (
                    <div><h1>Please Login To Leave A Review</h1></div>
                    
                ) }
            </div>
            <div>      
                {oneProd && oneProd.reviews ? (
                    oneProd.reviews.length === 0 ? (
                        <div>
                            <h3>No Reviews</h3>
                        </div>
                    ) : (
                        oneProd.reviews?.map((review) => (
                        
                            <div key={review.id}>
                                <h1>{review.title}</h1>
                                {review.user && <h3>{review.user.username}</h3>}                            
                                <p>Rating: {review.rating}</p>
                                <p>{review.comment}</p>
                            </div>
                           
                        ))
                    )
                ) : (
                    <div>Loading reviews...</div>
                )}
            </div>
         </>
         
      );
   };

export default SingleProduct;