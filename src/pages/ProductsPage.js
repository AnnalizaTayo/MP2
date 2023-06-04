import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
    // eslint-disable-next-line
    const userString = localStorage.getItem("user");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedPetType, setSelectedPetType] = useState('');

    useEffect(() => {
    fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products')
        .then(response => response.json())
        .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        })
        .catch(error => {
        console.log('Error fetching products:', error);
        });
    }, []);

    const handleCategoryChange = event => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterProducts(category, selectedSubcategory, selectedPetType);
    };

    const handleSubcategoryChange = event => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
    filterProducts(selectedCategory, subcategory, selectedPetType);
    };

    const handlePetTypeChange = event => {
    const petType = event.target.value;
    setSelectedPetType(petType);
    filterProducts(selectedCategory, selectedSubcategory, petType);
    };

    const filterProducts = (category, subcategory, petType) => {
    let filtered = products;

    if (category) {
        filtered = filtered.filter(product => product.productcategory === category);
    }

    if (subcategory) {
        filtered = filtered.filter(product => product.subcategory === subcategory);
    }

    if (petType) {
        filtered = filtered.filter(product => product.pettype === petType);
    }

    setFilteredProducts(filtered);
    };

    const handleAddToCart = (productId) => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            const existingProductIndex = user.cart.findIndex(item => item.id === productId);
            if (existingProductIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                const updatedCart = [...user.cart];
                updatedCart[existingProductIndex].qty += 1;
                const updatedUser = { ...user, cart: updatedCart };
                updateUser(updatedUser);
            } else {
                // If the product is not in the cart, add it as a new object
                const newProduct = { id: productId, qty: 1 };
                const updatedUser = { ...user, cart: [...user.cart, newProduct] };
                updateUser(updatedUser);
            }
            alert("Product has been added to the cart");
        }
    };

    const handleAddToWishlist = (productId) => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            const existingProductIndex = user.wishlist.findIndex(item => item.id === productId);
            if (existingProductIndex !== -1) {
                // If the product already exists in the wishlist, update the quantity
                const updatedWishlist = [...user.wishlist];
                updatedWishlist[existingProductIndex].qty += 1;
                const updatedUser = { ...user, wishlist: updatedWishlist };
                updateUser(updatedUser);
            } else {
                // If the product is not in the wishlist, add it as a new object
                const newProduct = { id: productId, qty: 1 };
                const updatedUser = { ...user, wishlist: [...user.wishlist, newProduct] };
                updateUser(updatedUser);
            }
            alert("Product has been added to the wishlist");
        }
    };
      
    const updateUser = (user) => {
        const userId = user.id;
        fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
            // Update the local storage with the updated user data
            localStorage.setItem("user", JSON.stringify(data));
            console.log('User updated:', data);
            })
            .catch(error => {
            console.log('Error updating user:', error);
            });
    };

    return (
        <div>
            <h1>Products</h1>
            <div>
            <label htmlFor="category">Category:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="Food and Nutrition">Food and Nutrition</option>
                <option value="Toys and Enrichment">Toys and Enrichment</option>
                <option value="Care and Well-being">Care and Well-being</option>
            </select>
            </div>
            <div>
            <label htmlFor="subcategory">Subcategory:</label>
            <select id="subcategory" value={selectedSubcategory} onChange={handleSubcategoryChange}>
                <option value="">All</option>
                {selectedCategory === 'Food and Nutrition' && (
                <>
                    <option value="Food">Food</option>
                    <option value="Treats">Treats</option>
                    <option value="Supplements">Supplements</option>
                </>
                )}
                {selectedCategory === 'Toys and Enrichment' && <option value="Toys">Toys</option>}
                {selectedCategory === 'Care and Well-being' && (
                <>
                    <option value="Grooming Tools">Grooming Tools</option>
                    <option value="Bedding">Bedding</option>
                    <option value="Leashes and Collars">Leashes and Collars</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Aquarium">Aquarium</option>
                </>
                )}
            </select>
            </div>
            <div>
            <label htmlFor="petType">Pet Type:</label>
            <select id="petType" value={selectedPetType} onChange={handlePetTypeChange}>
                <option value="">All</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="fish">Fish</option>
                <option value="bird">Bird</option>
                <option value="reptile">Reptile</option>
                <option value="small animals">Small Animals</option>
                <option value="others">Others</option>
            </select>
            </div>
            <div>
            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                {filteredProducts.map(product => (
                    <li key={product.productid}>
                    <img src={product.productimage} alt={product.productname} />
                    <h3>{product.productname}</h3>
                    <p>{product.productdescription}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <button onClick={() => handleAddToCart(product.productid)}>Add to Cart</button>
                    <button onClick={() => handleAddToWishlist(product.productid)}>Add to Wishlist</button>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
    );
};

export default ProductsPage;
