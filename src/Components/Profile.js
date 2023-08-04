import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserProfile, loginWithToken } from "../store";

const Profile = () => {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state);
   const [username, setUsername] = useState(auth.username || "");
   const [email, setEmail] = useState(auth.email || "");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e, setFunction) => {
      setFunction(e.target.value);
   };

   const handleShowPasswordChange = (e) => {
      setShowPassword(e.target.checked);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const updatedProfile = {
         username,
         email,
         password
      };
      dispatch(updateUserProfile(updatedProfile));
      setUsername("");
      setEmail("");
      setPassword("");
   };

   useEffect(() => {
      dispatch(loginWithToken());
   }, [dispatch]);

   if (!auth.username || !auth.email) {
      return (
         <h2 className="text-center mt-5">
            Please <Link to="/login">login</Link> to view the profile
         </h2>
      );
   }

   return (
      <div className="registration-form">
         <form onSubmit={handleSubmit}>
            <div className="form-icon">
               <span className="username">{auth.username.slice(0, 1).toUpperCase()}</span>
            </div>
            <div className="form-group">
               <label htmlFor="username" className="form-label"></label>
               <input
                  type="text"
                  className="form-control item"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => handleChange(e, setUsername)}
               />
            </div>
            <div className="form-group">
               <input
                  type={showPassword ? "text" : "password"}
                  className="form-control item"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handleChange(e, setPassword)}
               />
            </div>
            <div className="form-group">
               <input
                  type="text"
                  className="form-control item"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleChange(e, setEmail)}
               />
            </div>
            <div className="form-group form-check">
               <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPasswordChange}
               />
               <label className="form-check-label" htmlFor="showPassword">
                  Show Password
               </label>
            </div>
            <div className="form-group">
               <button type="submit" className="btn btn-outline-dark save-changes">
                  Save Changes
               </button>
            </div>
         </form>
         <div className="social-media">
            <div className="social-icons"></div>
         </div>
      </div>
   );
};

export default Profile;