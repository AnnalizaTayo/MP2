import React, { useState, useEffect } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import PawIcon from '../components/PawIcon';
import { Modal, Button } from 'react-bootstrap';

const WishListPage = () => {
    const [wishListItems, setWishListItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [cart, setCart] = useState([]);    
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setCart(user.cart);
            setWishListItems(user.wishlist);
            setLoading(false);
        }
        fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.log('Error fetching products:', error);
            });
    }, []);

    const handleCheckboxChange = (event, itemId) => {
        if (event.target.checked) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, itemId]);
        } else {
            setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== itemId));
        }
    
        // Check if all items are selected
        const allItemIds = wishListItems.map(item => item.id);
        const isAllSelected = allItemIds.every(id => selectedItems.includes(id));
    
        // Update the checkbox in columnLabel
        const columnLabelCheckbox = document.querySelector('.columnLabel input[type="checkbox"]');
        if (columnLabelCheckbox) {
            columnLabelCheckbox.checked = isAllSelected;
        }
    };
    

    const updateQuantityInWishList = (itemId, newQty) => {
        const updatedWishListItems = wishListItems.map(item => {
            if (item.id === itemId) {
                return { ...item, qty: newQty };
            }
            return item;
        });
        setWishListItems(updatedWishListItems);
        updateWishListItemsInStorage(updatedWishListItems); // Update the wish list items in local storage
        updateWishListItemsInApi(updatedWishListItems); // Update the wish list items in the API
    };

    const handleQuantityChange = (event, itemId) => {
        const newQty = parseInt(event.target.value);
        updateQuantityInWishList(itemId, newQty);
    };

    const incrementQuantity = (itemId) => {
        const item = wishListItems.find(item => item.id === itemId);
        if (item) {
            const newQty = item.qty + 1;
            updateQuantityInWishList(itemId, newQty);
        }
    };

    const decrementQuantity = (itemId) => {
        const item = wishListItems.find(item => item.id === itemId);
        if (item && item.qty > 1) {
            const newQty = item.qty - 1;
            updateQuantityInWishList(itemId, newQty);
        }
    };

    const getTotalAmount = () => {
        let total = 0;
        selectedItems.forEach(itemId => {
            const item = wishListItems.find(item => item.id === itemId);
            if (item) {
                const product = getProductById(item.id);
                if (product) {
                    total += parseFloat(product.price) * item.qty;
                }
            }
        });
        return total.toFixed(2);
    };

    const getProductById = (productId) => {
        return products.find(product => product.productid === productId);
    };

    const handleBuyNow = () => {
        setShowCheckoutForm(true);
    };

    const handleSelectAll = () => {
        if (selectedItems.length === wishListItems.length) {
            setSelectedItems([]);
        } else {
            const allItemIds = wishListItems.map(item => item.id);
            setSelectedItems(allItemIds);
        }
    };

    const handleDelete = () => {
        const updatedWishListItems = wishListItems.filter(item => !selectedItems.includes(item.id));
        setWishListItems(updatedWishListItems);
        setSelectedItems([]);
    
        updateWishListItemsInStorage(updatedWishListItems);
        updateWishListItemsInApi(updatedWishListItems);
    };

    const moveToCart = () => {
        const updatedWishListItems = wishListItems.filter(item => !selectedItems.includes(item.id));
        const selectedWishListItems = wishListItems.filter(item => selectedItems.includes(item.id));
    
        const updatedCartItems = [...cart, ...selectedWishListItems];
    
        setWishListItems(updatedWishListItems);
        setCart(updatedCartItems);
        setSelectedItems([]);
    
        updateWishListItemsInStorage(updatedWishListItems);
        updateCartItemsInStorage(updatedCartItems);
        updateWishListItemsInApi(updatedWishListItems);
        updateCartItemsInApi(updatedCartItems);
    };
        

    const updateWishListItemsInStorage = (updatedWishListItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            user.wishlist = updatedWishListItems;
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    const updateWishListItemsInApi = (updatedWishListItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wishlist: updatedWishListItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Wish list items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating wishlist items in API:', error);
                });
        }
    };

    const updateCartItemsInStorage = (updatedCartItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            user.cart = updatedCartItems;
            localStorage.setItem('user', JSON.stringify(user));
        }
    };
    
    const updateCartItemsInApi = (updatedCartItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wishlist: updatedCartItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Wishlist items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating wishlist items in API:', error);
                });
        }
    };
    
    if (loading) {
        return <PawIcon />;
    }

    return (
        <div className="wishlist">
            <h1>My Wish List</h1>
            {wishListItems.length === 0 ? (
                <p>Your wish list is empty.</p>
            ) : (
                <div>
                    <div className="columnLabel">
                        <input type="checkbox" id="columnLabelCheckbox" checked={selectedItems.length === wishListItems.length} onChange={() => handleSelectAll()}/>
                        <h4>Product</h4>
                        <h4>Unit Price</h4>
                        <h4>Quantity</h4>
                        <h4>Total Price</h4>
                        <h4>Action</h4>
                    </div>
                    <ul className="productLists">
                        {wishListItems.map(item => {
                            const product = getProductById(item.id);
                            return (
                                <li key={item.id}>
                                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={(event) => handleCheckboxChange(event, item.id)}/>
                                    <div>
                                        <img src={product ? product.productimage : ''} alt={product ? product.productname : 'Unknown'} />
                                        <div>{product ? product.productname : 'Unknown'}</div>
                                        <div>{product ? product.variant : 'Unknown'}</div>
                                    </div>

                                    <div>{product ? `$${product.price}` : 'Unknown'}</div>
                                    <div>
                                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.qty || 1}
                                            onChange={(event) => handleQuantityChange(event, item.id)}
                                        />
                                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                                    </div>
                                    <div>
                                        {product ? `$${(parseFloat(product.price) * item.qty).toFixed(2)}` : 'Unknown'}
                                    </div>
                                    <div>
                                        <BsTrashFill />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="footing">
                        <div>
                            <input type="checkbox" id="bottomSelectAll" checked={selectedItems.length === wishListItems.length} onChange={() => handleSelectAll()} />
                            <div>
                                <button className="labelButton" onClick={() => handleSelectAll()}>
                                    Select All
                                </button>
                                <button className="labelButton" onClick={handleDelete}>Delete</button>
                                <button className="labelButton" onClick={moveToCart}>Move to Cart</button> 
                            </div>
                        </div>
                        <div>
                            <h4>Total({selectedItems.length} item{selectedItems.length === 1 ? '' : 's'}):</h4>
                            <h4>${getTotalAmount()}</h4>
                            <button onClick={handleBuyNow}>Checkout</button>
                            <Modal show={showCheckoutForm} onHide={() => setShowCheckoutForm(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Checkout Form</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form class="col-address">
                                    <div class="shipping-address">
                                        <fieldset>
                                        <legend><h3>Delivery Address</h3></legend>
                                        <input type="text" id="country" name="country" placeholder="Country/Region" />
                                        <input type="text" id="address" name="address" placeholder="Address" />
                                        <input type="text" id="appartment" name="appartment" placeholder="Appartment, suite, etc. (Optional)" />
                                        <input type="text" id="number" name="number" placeholder="Enter your Number" />
                                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                                        </fieldset>
                                    </div>
                                    </form>

                                    <form class="col-payment">
                                    <div class="payment-details">
                                        <fieldset>
                                        <legend><h3>Card Payment</h3></legend>
                                        <input type="text" id="cardholderName" name="cardholderName" placeholder="Cardholder Name" />
                                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number" />
                                        <input type="text" id="expiryDate" name="expiryDate" placeholder="Expiry Date" />
                                        <input type="text" id="cvv" name="cvv" placeholder="CVV" />
                                        </fieldset>
                                    </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowCheckoutForm(false)}>
                                    Close
                                    </Button>
                                    <Button variant="primary" onClick={() => console.log('Place order clicked')}>
                                    Place Order
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                  </div>
                </div>
            )}
        </div>
    );
};

export default WishListPage;
