import React, { useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaSyringe , FaSearch } from "react-icons/fa";
import { BsFillBagHeartFill , BsFillCartFill , BsFillTelephoneFill} from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import logo1 from "../imgs/brownLogo.png";
import logo2 from "../imgs/whiteLogo.png";
import './Header.css';


const Nav = () => {
    return (
        <nav className="nav-container">
            <div className="navbar">
                <a className="navi hamburger-button">
                    <ImMenu id="hamburgerlines"/>
                </a>
                <div className="navi brand">
                    <a  href="/" className="brand-name nav-item">
                        <img classNameName="logo" id="brandlogo" src={logo1} alt="logo" />
                        <img classNameName="logo" id="hover-logo" src={logo2} alt="logo" />
                        <h3>PawOrder Pet Shop</h3>
                    </a>
                </div>
                <div className="movable-nav">
                    <div className="navi searchbar">
                        <form className="search-form">
                            <input type="text" name="search" id="search" placeholder="search for products.." />
                            <button clas="lense-icon">
                                <FaSearch className="icon"/>
                            </button>
                        </form> 
                    </div>
                    <div className="navi lense">
                        <a href="./products" className="lense-icon nav-item">
                            <FaSearch className="icon"/>
                            <span className="navilabel"><h4></h4></span>
                        </a>
                    </div>
                    <div className="navi login">
                        <a href="./login" className="login-icon nav-item">
                            <CgProfile className="icon"/>    
                            <span className="username navilabel"><h4>Log-in</h4></span>
                        </a>
                    </div>
                    <div className="navi profile">
                        <a href="/profile" className="profile-icon nav-item">
                            <CgProfile className="icon"/>    
                            <span className="username navilabel" id="username"><h4>Welcome</h4></span>
                        </a>
                    </div>
                    <div className="navi consult">
                        <a href="/consultation" className="heart-icon nav-item">
                            <FaSyringe className="icon"/>
                            <span className="consult navilabel" id="consult"><h4>Vet</h4></span>
                        </a>
                    </div>
                    <div className="navi wishlist">
                        <a href="/wishlist" className="heart-icon nav-item">
                            <BsFillBagHeartFill className="icon"/>
                            <span className="wishlist navilabel" id="wishlist"><h4>Wish list</h4></span>
                        </a>
                    </div>
                    <div className="navi cart">
                        <a href="/cart" className="cart-icon nav-item">
                            <BsFillCartFill className="icon"/>
                            <span className="cart navilabel" id="cart"><h4>Cart</h4></span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const Collapse = () => {
    return (
        <div className="collapse">
            <div className="collapsible">
                <div className="categories">
                    <a href="#"><h3>All Products</h3></a>
                    <br />
                    <h3>Categories</h3>
                    <br />
                    <ul>
                        <li>
                            <a href="#"><h4>Dog</h4></a>
                            <ul>
                                <a href="#"><li>Food and Nutrition</li></a>
                                <a href="#"><li>Toys and Enrichment</li></a>
                                <a href="#"><li>Care and Well-being</li></a>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><h4>Cat</h4></a>
                            <ul>
                                <a href="#"><li>Food and Nutrition</li></a>
                                <a href="#"><li>Toys and Enrichment</li></a>
                                <a href="#"><li>Care and Well-being</li></a>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><h4>Fish</h4></a>
                            <ul>
                                <a href="#"><li>Food and Nutrition</li></a>
                                <a href="#"><li>Toys and Enrichment</li></a>
                                <a href="#"><li>Care and Well-being</li></a>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><h4>Others</h4></a>
                            <ul>
                                <a href="#"><li>Food and Nutrition</li></a>
                                <a href="#"><li>Toys and Enrichment</li></a>
                                <a href="#"><li>Care and Well-being</li></a>
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
                            <a className="needhelp-item hotline" href="tel:+6386509201">
                                <BsFillTelephoneFill className="icon" />
                                <span><h4>CALL US</h4></span>
                            </a>
                        </li>
                        <li>
                            <a className="needhelp-item email" href="mailto:autorcastmere@gmail.com?subject=Your%20Subject" 
                            target="_blank" rel="noopener noreferrer">
                                <MdEmail className="icon" />
                                <span><h4>Email Us</h4></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
)
    
}

const Header = () => {
    useEffect(() => {
        const toggle = document.querySelector('.hamburger-button');
        const show = document.querySelector('.collapsible');
      
        const handleClick = (event) => {
          event.preventDefault();
          if (!show.style.display || show.style.display === 'none') {
            show.style.display = 'block';
          } else {
            show.style.display = 'none';
          }
        };
      
        toggle.addEventListener('click', handleClick);
      
        return () => {
          toggle.removeEventListener('click', handleClick);
        };
      }, []);      
    return (
        <header>
            <Nav />
            <Collapse />
        </header>
    );
};



export default Header;

