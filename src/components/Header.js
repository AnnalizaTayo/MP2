import React, { useState, useEffect, useRef } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaSyringe , FaSearch } from "react-icons/fa";
import { BsFillBagHeartFill , BsFillCartFill , BsFillTelephoneFill} from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import logo1 from "../imgs/brownLogo.png";
import logo2 from "../imgs/whiteLogo.png";
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [firstName, setFirstName] = useState('');
    const [activeItem, setActiveItem] = useState('');
    const [showCollapse, setShowCollapse] = useState(false);
    const hamburgerRef = useRef(null);

    const handleClick = (event) => {
      event.preventDefault();
      setShowCollapse((prevState) => !prevState);
    };

    useEffect(() => {
      // Check if user data exists in localStorage
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setFirstName(user.firstName);
      };

      const handleDocumentClick = (event) => {
        if (!hamburgerRef.current.contains(event.target)) {
          setShowCollapse(false);
        }
      };
  
      document.addEventListener('click', handleDocumentClick);
  
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, []);

    return (
        <header>
            <nav className="nav-container">
                <div className="navbar">
                    <Link to="/" className="navi hamburger-button" onClick={handleClick} ref={hamburgerRef}>
                        <ImMenu id="hamburgerlines" />
                    </Link>
                    <div className="navi brand">
                        <Link to="/" className={`brand-name nav-item ${activeItem === 'home' ? '' : ''}`} onClick={() => setActiveItem('home')}>
                            <img className="logo" id="brandlogo" src={logo1} alt="logo" />
                            <img className="logo" id="hover-logo" src={logo2} alt="logo" />
                            <h3>PawOrder Pet Shop</h3>
                        </Link>
                    </div>
                    <div className="movable-nav">
                        <div className="navi searchbar">
                            <form className="search-form">
                                <input type="text" name="search" id="search" placeholder="search for products.." />
                                <button className="lense-icon">
                                    <FaSearch className="icon"/>
                                </button>
                            </form> 
                        </div>
                        <div className="navi home">
                            <Link to="/" className={`home-icon nav-item ${activeItem === 'home' ? 'active' : ''}`} onClick={() => setActiveItem('home')}>
                                <AiFillHome className="icon"/>
                                <span className="navilabel"><h4>Home</h4></span>
                            </Link>
                        </div>
                        <div className="navi lense">
                            <Link to="/products" className={`lense-icon nav-item ${activeItem === 'products' ? 'active' : ''}`} onClick={() => setActiveItem('products')}>
                                <FaSearch className="icon"/>
                                <span className="navilabel" style={{ display: 'none' }}><h4>find</h4></span>
                            </Link>
                        </div>
                        <div className="navi consult">
                            <Link to="/consultation" className={`syringe-icon nav-item ${activeItem === 'consultation' ? 'active' : ''}`} onClick={() => setActiveItem('consultation')}>
                                <FaSyringe className="icon"/>
                                <span className="consult navilabel" id="consult"><h4>Vet</h4></span>
                            </Link>
                        </div>
                        <div className="navi wishlist">
                            <Link to="/wishlist" className={`heart-icon nav-item ${activeItem === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveItem('wishlist')}>
                                <BsFillBagHeartFill className="icon"/>
                                <span className="wishlist navilabel" id="wishlist"><h4>Wish list</h4></span>
                            </Link>
                        </div>
                        <div className="navi cart">
                            <Link to="/cart" className={`cart-icon nav-item ${activeItem === 'cart' ? 'active' : ''}`} onClick={() => setActiveItem('cart')}>
                                <BsFillCartFill className="icon"/>
                                <span className="cart navilabel" id="cart"><h4>Cart</h4></span>
                            </Link>
                        </div>
                        <div className="navi login" style={{ display: firstName ? 'none' : 'grid' }}>
                            <Link to="/login" className={`login-icon nav-item ${activeItem === 'login' ? 'active' : ''}`} onClick={() => setActiveItem('login')}>
                                <CgProfile className="icon" />
                                <span className="username navilabel">
                                <h4>Log-in</h4>
                                </span>
                            </Link>
                        </div>
                        <div className="navi profile" style={{ display: firstName ? 'grid' : 'none' }}>
                            <Link to="/profile" className={`profile-icon nav-item ${activeItem === 'profile' ? 'active' : ''}`} onClick={() => setActiveItem('profile')}>
                                <CgProfile className="icon" />
                                <span className="username navilabel" id="username">
                                <h4>Hi {firstName ? firstName : 'User'}</h4>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="collapse">
                <div className={`collapse ${showCollapse ? 'show' : 'hide'}`}>
                    <div className="categories">
                        <Link to="/home"><h3>All Products</h3></Link>
                        <br />
                        <h3>Categories</h3>
                        <br />
                        <ul>
                            <li>
                                <Link to="/home"><h4>Dog</h4></Link>
                                <ul>
                                    <Link to="/home"><li>Food and Nutrition</li></Link>
                                    <Link to="/home"><li>Toys and Enrichment</li></Link>
                                    <Link to="/home"><li>Care and Well-being</li></Link>
                                </ul>
                            </li>
                            <li>
                                <Link to="/home"><h4>Cat</h4></Link>
                                <ul>
                                    <Link to="/home"><li>Food and Nutrition</li></Link>
                                    <Link to="/home"><li>Toys and Enrichment</li></Link>
                                    <Link to="/home"><li>Care and Well-being</li></Link>
                                </ul>
                            </li>
                            <li>
                                <Link to="/home"><h4>Fish</h4></Link>
                                <ul>
                                    <Link to="/home"><li>Food and Nutrition</li></Link>
                                    <Link to="/home"><li>Toys and Enrichment</li></Link>
                                    <Link to="/home"><li>Care and Well-being</li></Link>
                                </ul>
                            </li>
                            <li>
                                <Link to="/home"><h4>Others</h4></Link>
                                <ul>
                                    <Link to="/home"><li>Food and Nutrition</li></Link>
                                    <Link to="/home"><li>Toys and Enrichment</li></Link>
                                    <Link to="/home"><li>Care and Well-being</li></Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="lineSeparator"></div>

                    <div className="needhelp">
                        <h3>Need Help?</h3>
                        <br />
                        <ul>
                            <li>
                                <Link className="needhelp-item hotline" to="tel:+6386509201">
                                    <BsFillTelephoneFill className="icon" />
                                    <span><h4>CALL US</h4></span>
                                </Link>
                            </li>
                            <li>
                                <Link className="needhelp-item email" to="mailto:autorcastmere@gmail.com?subject=Your%20Subject" 
                                target="_blank" rel="noopener noreferrer">
                                    <MdEmail className="icon" />
                                    <span><h4>Email Us</h4></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;