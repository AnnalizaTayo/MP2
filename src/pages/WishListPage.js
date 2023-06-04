import React, { useState, useEffect } from 'react';
import PawIcon from '../components/PawIcon';

const WishList = () => {
    const [wishlistItems, setwishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            setwishlistItems(user.wishlist);
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
    };

    const updateQuantityInwishlist = (itemId, newQty) => {
        const updatedwishlistItems = wishlistItems.map(item => {
            if (item.id === itemId) {
                return { ...item, qty: newQty };
            }
            return item;
        });
        setwishlistItems(updatedwishlistItems);
        updatewishlistItemsInStorage(updatedwishlistItems); // Update the wishlist items in local storage
        updatewishlistItemsInApi(updatedwishlistItems); // Update the wishlist items in the API
    };

    const handleQuantityChange = (event, itemId) => {
        const newQty = parseInt(event.target.value);
        updateQuantityInwishlist(itemId, newQty);
    };

    const incrementQuantity = (itemId) => {
        const item = wishlistItems.find(item => item.id === itemId);
        if (item) {
            const newQty = item.qty + 1;
            updateQuantityInwishlist(itemId, newQty);
        }
    };

    const decrementQuantity = (itemId) => {
        const item = wishlistItems.find(item => item.id === itemId);
        if (item && item.qty > 1) {
            const newQty = item.qty - 1;
            updateQuantityInwishlist(itemId, newQty);
        }
    };

    const getTotalAmount = () => {
        let total = 0;
        selectedItems.forEach(itemId => {
            const item = wishlistItems.find(item => item.id === itemId);
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
        // Implement your logic for the "Buy Now" functionality
        // For example, you can redirect the user to a checkout page or perform any other desired action
        console.log("Buy Now clicked!");
    };

    const updatewishlistItemsInStorage = (updatedwishlistItems) => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            user.wishlist = updatedwishlistItems;
            localStorage.setItem("user", JSON.stringify(user));
        }
    };

    const updatewishlistItemsInApi = (updatedwishlistItems) => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wishlist: updatedwishlistItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('wishlist items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating wishlist items in API:', error);
                });
        }
    };

    if (loading) {
        return <PawIcon/>;
    }

    return (
        <div>
            <h1>wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div>
                    <ul>
                        {wishlistItems.map(item => {
                            const product = getProductById(item.id);
                            return (
                                <li key={item.id}>
                                    <h3>Product Name: {product ? product.productname : 'Unknown'}</h3>
                                    <p>Quantity: 
                                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                                        <input type="number" min="1" value={item.qty} onChange={(event) => handleQuantityChange(event, item.id)} />
                                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                                    </p>
                                    <p>Price: {product ? `$${product.price}` : 'Unknown'}</p>
                                    <img src={product ? product.productimage : ''} alt={product ? product.productname : 'Unknown'} />
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={(event) => handleCheckboxChange(event, item.id)}
                                        />
                                        Select
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                    <p>Total Amount: ${getTotalAmount()}</p>
                    <button onClick={handleBuyNow}>Buy Now</button>
                </div>
            )}
        </div>
    );
};

export default WishList;
