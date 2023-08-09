import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const footerStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    };

    const handleSignUp = () =>{
        navigate('/register');
    }
  
    return (
      <footer className="bg-light text-center">
        <div className="p-4 pb-0">
          <section>
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto pt-2">
                    Contact Us: 
                </div>
                <div className="col-auto pt-2">
                    something@email.com
                </div>
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up with us!</strong>
                  </p>
                </div>
                <div className="col-auto">
                  <button onClick={handleSignUp} type="submit" className="btn btn-dark mb-4 bg-black text-white">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
        <div className="text-center p-3" style={footerStyle}>
          © {new Date().getFullYear()} Copyright: 
          <a className="text-dark" href="">
            Beanies & Blankets
          </a>
        </div>
        
      </footer>
    );
  };


  
  export default Footer;