import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ProductsPage.css';

const ProductList = () => {
    const [results, setResults] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate  = useNavigate();
    const [products, setProducts] = useState([]);
    const { pettype } = useParams();
    const { category } = useParams();
    const { search } = useParams();
    const [filters, setFilters] = useState({
        productcategory: '|All Products',
        subcategory: '|All',
        pettype: '|All',
    });

    const [isAllProductsFiltered, setIsAllProductsFiltered] = useState(true);
        const [isAllSubcategoriesFiltered, setIsAllSubcategoriesFiltered] = useState(true);

    const [isFoodAndNutritionFiltered, setIsFoodAndNutritionFiltered] = useState(false);
        const [isFoodFiltered, setIsFoodFiltered] = useState(false);
        const [isTreatsFiltered, setIsTreatsFiltered] = useState(false);
        const [isSupplementsFiltered, setIsSupplementsFiltered] = useState(false);
    
    const [isToysAndEnrichmentFiltered, setIsToysAndEnrichmentFiltered] = useState(false);
        const [isToysFiltered, setIsToysFiltered] = useState(false);
    
    const [isCareAndWellBeingFiltered, setIsCareAndWellBeingFiltered] = useState(false);
        const [isGroomingToolsFiltered, setIsGroomingToolsFiltered] = useState(false);
        const [isBeddingFiltered, setIsBeddingFiltered] = useState(false);
        const [isLeashesAndCollarFiltered, setIsLeashesAndCollarFiltered] = useState(false);
        const [isAccessoriesFiltered, setIsAccessoriesFiltered] = useState(false);
        const [isAquariumFiltered, setIsAquariumFiltered] = useState(false);

    const [isAllPetTypesFiltered, setIsAllPetTypesFiltered] = useState(true);
        const [isDogFiltered, setIsDogFiltered] = useState(false);
        const [isCatFiltered, setIsCatFiltered] = useState(false);
        const [isBirdFiltered, setIsBirdFiltered] = useState(false);
        const [isFishFiltered, setIsFishFiltered] = useState(false);
        const [isReptileFiltered, setIsReptileFiltered] = useState(false);
        const [isSmallAnimalsFiltered, setIsSmallAnimalsFiltered] = useState(false);

    useEffect(() => {
        /* if "All Products" is true*/
        if(isAllProductsFiltered){
            setIsFoodAndNutritionFiltered(false);
            setIsToysAndEnrichmentFiltered(false);
            setIsCareAndWellBeingFiltered(false);
            setIsAllSubcategoriesFiltered(true);
        }
        if( !isFoodAndNutritionFiltered &&
            !isToysAndEnrichmentFiltered &&
            !isCareAndWellBeingFiltered &&
            !isFoodFiltered &&
            !isTreatsFiltered &&
            !isSupplementsFiltered &&
            !isToysFiltered &&
            !isGroomingToolsFiltered &&
            !isBeddingFiltered &&
            !isLeashesAndCollarFiltered &&
            !isAccessoriesFiltered &&
            !isAquariumFiltered){
            setIsAllProductsFiltered(true);
        }
        handleFilterChange('productcategory', '');
    }, [isAllProductsFiltered]);

    useEffect(() => {
        if( isFoodAndNutritionFiltered || 
            isToysAndEnrichmentFiltered || 
            isCareAndWellBeingFiltered ||
            isFoodAndNutritionFiltered ||
            isToysAndEnrichmentFiltered ||
            isCareAndWellBeingFiltered ||
            isFoodFiltered ||
            isTreatsFiltered ||
            isSupplementsFiltered ||
            isToysFiltered ||
            isGroomingToolsFiltered ||
            isBeddingFiltered ||
            isLeashesAndCollarFiltered ||
            isAccessoriesFiltered ||
            isAquariumFiltered){
            setIsAllProductsFiltered(false);
        }
        handleFilterChange('productcategory', '');
    }, [isFoodAndNutritionFiltered,
        isToysAndEnrichmentFiltered,
        isCareAndWellBeingFiltered,
        isFoodFiltered,
        isTreatsFiltered,
        isSupplementsFiltered,
        isToysFiltered,
        isGroomingToolsFiltered,
        isBeddingFiltered,
        isLeashesAndCollarFiltered,
        isAccessoriesFiltered,
        isAquariumFiltered]);

    useEffect(() => {
        if(isAllSubcategoriesFiltered){
            setIsFoodFiltered(false);
            setIsSupplementsFiltered(false);
            setIsTreatsFiltered(false);
            setIsGroomingToolsFiltered(false);
            setIsToysFiltered(false);
            setIsLeashesAndCollarFiltered(false);
            setIsBeddingFiltered(false);
            setIsAquariumFiltered(false);
            setIsAccessoriesFiltered(false);
        }
        if( !isFoodFiltered &&
            !isTreatsFiltered &&
            !isSupplementsFiltered &&
            !isToysFiltered &&
            !isGroomingToolsFiltered &&
            !isBeddingFiltered &&
            !isLeashesAndCollarFiltered &&
            !isAccessoriesFiltered &&
            !isAquariumFiltered){
            setIsAllSubcategoriesFiltered(true);
        }
        handleFilterChange('subcategory', '');
    }, [isAllSubcategoriesFiltered , isFoodAndNutritionFiltered , isToysAndEnrichmentFiltered , isCareAndWellBeingFiltered]);

    useEffect(() => {
        if( isFoodFiltered||
            isTreatsFiltered||
            isSupplementsFiltered||
            isToysFiltered||
            isGroomingToolsFiltered||
            isBeddingFiltered||
            isLeashesAndCollarFiltered||
            isAccessoriesFiltered||
            isAquariumFiltered){
            setIsAllSubcategoriesFiltered(false);
        }
        handleFilterChange('subcategory', '');
    }, [isFoodFiltered,
        isTreatsFiltered,
        isSupplementsFiltered,
        isToysFiltered,
        isGroomingToolsFiltered,
        isBeddingFiltered,
        isLeashesAndCollarFiltered,
        isAccessoriesFiltered,
        isAquariumFiltered]);

    useEffect(() => {
        if(isAllPetTypesFiltered){
            setIsDogFiltered(false);
            setIsCatFiltered(false);
            setIsBirdFiltered(false);
            setIsFishFiltered(false);
            setIsReptileFiltered(false);
            setIsSmallAnimalsFiltered(false);
        }
        if( (!isDogFiltered&&
            !isCatFiltered&&
            !isBirdFiltered&&
            !isFishFiltered&&
            !isReptileFiltered&&
            !isSmallAnimalsFiltered)){
            setIsAllPetTypesFiltered(true);
        }
        handleFilterChange('pettype', '');
    }, [isAllPetTypesFiltered]);

    useEffect(() => {
        if( isDogFiltered||
            isCatFiltered||
            isBirdFiltered||
            isFishFiltered||
            isReptileFiltered||
            isSmallAnimalsFiltered){
            setIsAllPetTypesFiltered(false);
        }
        handleFilterChange('pettype', '');
    }, [isDogFiltered,
        isCatFiltered,
        isBirdFiltered,
        isFishFiltered,
        isReptileFiltered,
        isSmallAnimalsFiltered]);

    useEffect(() => {
        //console.log("hello fetch");
        fetchProducts('');
    }, []);

    useEffect(() => {
        if (results){
        
            const userInput = queryParams.get('search');
            console.log(userInput);
            if (userInput) {
                setSearchInput(userInput);
                //fetchProducts(userInput);//handled below
            }
            
            console.log(results);

            setFiltered(results);
        
            let filteredProducts = results;
            /*if (!pettype && !category && !search) {
                setFiltered(results);
            }*/
            if (pettype != null) {
                filteredProducts = productsFilter(filteredProducts, pettype);
            }
            if (category != null) {
                filteredProducts = productsFilter(filteredProducts, null, category);
            }
            if (search != null) {
                filteredProducts = productsFilter(filteredProducts, null, null, search);
            }
            
            console.log(filtered);
        }
    }, [results, pettype, category, search]);

    useEffect(() => {
        if (results){
            // const [filters, setFilters] = useState({
            //     productcategory: 'All Products',
            //     subcategory: 'All',
            //     pettype: 'All',
            // });

            setFiltered(results);
            let filteredProducts = results;
            if (filters.productcategory != null) {
                filteredProducts = productsFilter(filteredProducts, null,filters.productcategory);
            }
            if (filters.subcategory != null) {
                filteredProducts = productsFilter(filteredProducts, null, null,null,filters.subcategory);
            }
            if (filters.pettype != null) {
                filteredProducts = productsFilter(filteredProducts, filters.pettype);
            }
        
            //setFiltered(filteredProducts);
        }
    }, [filters]);
    


    const fetchProducts = (userInput) => {
        let url = 'https://64803e10f061e6ec4d48e135.mockapi.io/api/v1/products';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setResults(data)
        })
        .catch(error => console.log('Error fetching products:', error));
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchInput.trim() !== '') {
          const userInput = searchInput.trim();
          navigate(`/products/search/${userInput}`); // Update the URL with the new query parameter
          fetchProducts(userInput);
        }
        setSearchInput('');
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
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
            //console.log('User updated:', data);
        })
        .catch(error => {
            //console.log('Error updating user:', error);
        });
    };

    
    const productsFilter = (toFilter = results,pettype=null,category=null,productdescription=null,subcategory=null) => {
        if(toFilter==null) return null;
        //console.log("toFilter");
        //console.log(toFilter);
        if(category!=null && !category.toLowerCase().includes("all products")){
            setFiltered(results);
            return results;
        }

        if(pettype!=null && !pettype.toLowerCase().includes("all")){
            toFilter = toFilter.filter(prod => {
                // Apply filters here
                if (!pettype.toLowerCase().includes(prod.pettype.toLowerCase())) {
                    //console.log(prod);
                    return false; // Skip item if category doesn't match
                }
                // ... other filters
            
                return true; // Include item in filtered list
            });
        }

        if(category!=null && !category.toLowerCase().includes("all")){
            toFilter = toFilter.filter(prod => {
                // Apply filters here
                if (!category.toLowerCase().includes(prod.productcategory.toLowerCase())) {
                    //console.log(prod);
                    return false; // Skip item if category doesn't match
                }
                // ... other filters
            
                return true; // Include item in filtered list
            });
        }

        if(subcategory!=null && !subcategory.toLowerCase().includes("all")){
            toFilter = toFilter.filter(prod => {
                    // Apply filters here
                    if (!subcategory.toLowerCase().includes(prod.subcategory.toLowerCase())) {
                        //console.log(prod);
                        return false; // Skip item if category doesn't match
                    }
                    // ... other filters
                
                    return true; // Include item in filtered list
                }
            );
        }

        if(productdescription!=null){
            toFilter = toFilter.filter(prod => {
                    // Apply filters here
                    if (!prod.productdescription.toLowerCase().includes(productdescription.toLowerCase())) {
                        //console.log(prod);
                        return false; // Skip item if category doesn't match
                    }
                    // ... other filters
                
                    return true; // Include item in filtered list
                }
            );
        }
        //console.log("Filtered");
        //console.log(toFilter);
        setFiltered(toFilter);
        return toFilter;
    };

    // const filteredProducts = results.filter((product) => {
    //     setFiltered([]);
    //     if (filters.productcategory !== 'All Products' && product.productcategory !== filters.productcategory) {
    //       return false;
    //     }
    //     if (filters.subcategory !== 'All' && product.subcategory !== filters.subcategory) {
    //       return false;
    //     }
    //     if (filters.pettype !== 'All' && product.pettype !== filters.pettype) {
    //       return false;
    //     }
    //     return true;
    // });
    
    const handleFilterChange = (filterName, value, filtersNow = filters) => {
        let fval = filtersNow[filterName];// = "|"+value;
        // if(filtersNow[filterName].toLowerCase().includes(value.toLowerCase())){//remove
        //     fval = filtersNow[filterName].replace("|"+value,"");
        // }else{//include
        //     fval = filtersNow[filterName]+"|"+value;
        // }
        if(filterName.includes("productcategory")){
            let str = "All Products";
            if(isAllProductsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Food and Nutrition";
            if(isFoodAndNutritionFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Toys and Enrichment";
            if(isToysAndEnrichmentFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Care and Well-being";
            if(isCareAndWellBeingFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
        }else
        if(filterName.includes("subcategory")){
            let str = "All";
            if(isAllSubcategoriesFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Food";
            if(isFoodFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Treats";
            if(isTreatsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Supplements";
            if(isSupplementsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Toys";
            if(isToysFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Grooming Tools";
            if(isGroomingToolsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Bedding";
            if(isBeddingFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Leashes and Collar";
            if(isLeashesAndCollarFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Accessories";
            if(isAccessoriesFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Aquarium";
            if(isAquariumFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
        }else
        if(filterName.includes("pettype")){
            let str = "All";
            if(isAllPetTypesFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Dog";
            if(isDogFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Cat";
            if(isCatFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Bird";
            if(isBirdFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Fish";
            if(isFishFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Reptile";
            if(isReptileFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Small Animals";
            if(isSmallAnimalsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
        }

        const rawr = { ...filtersNow, [filterName]: fval };
        console.log("rawr");
        console.log(rawr);
        setFilters(rawr);
        return rawr;
    };


    return (
        <div className='productspage'>
            <aside>
                <h3>Filter by:</h3>
                <div>{/* All Categories */}
                    <label>
                        <input type="checkbox" checked={isAllProductsFiltered} onChange={(e)=>{
                            setIsAllProductsFiltered(!isAllProductsFiltered);
                            handleFilterChange('productcategory', 'All Products');
                        }} />
                        All Products
                    </label> {/* All Products */}
                    <label className=''>
                        <input type="checkbox"checked={isAllSubcategoriesFiltered} onChange={(e)=>{
                            setIsAllSubcategoriesFiltered(!isAllSubcategoriesFiltered);
                            handleFilterChange('subcategory', 'All');
                        }} />
                        All Subcategories
                    </label>{/* All Subcategory */}
                    <div>  {/* Categories and Subcategories */}
                        <div className='filterbuttons'> {/* Food and Nutrition */}
                            <label>
                                <input type="checkbox" checked={isFoodAndNutritionFiltered} onChange={(e)=>{
                                    setIsFoodAndNutritionFiltered(!isFoodAndNutritionFiltered);
                                    handleFilterChange('productcategory', 'Food and Nutrition');
                                }} />
                                Food and Nutrition
                            </label>
                            <ul>
                                <li> {/* food */}
                                    <label>
                                        <input type="checkbox" checked={isFoodFiltered} onChange={(e)=>{
                                            setIsFoodFiltered(!isFoodFiltered);
                                            handleFilterChange('subcategory', 'Food');
                                        }} />
                                        Food
                                    </label>
                                </li>
                                <li>{/* treats */}
                                    <label>
                                        <input type="checkbox" checked={isTreatsFiltered} onChange={(e)=>{
                                            setIsTreatsFiltered(!isTreatsFiltered);
                                            handleFilterChange('subcategory', 'Treats');
                                        }} />
                                        Treats
                                    </label>
                                </li>
                                <li> {/* supplements */}
                                    <label>
                                        <input type="checkbox" checked={isSupplementsFiltered} onChange={(e)=>{
                                            setIsSupplementsFiltered(!isSupplementsFiltered);
                                            handleFilterChange('subcategory', 'Supplements');
                                        }} />
                                        Supplements
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className='filterbuttons'> {/* Toys and Enrichment */}
                            <label>
                                <input type="checkbox" checked={isToysAndEnrichmentFiltered} onChange={(e)=>{
                                    setIsToysAndEnrichmentFiltered(!isToysAndEnrichmentFiltered);
                                    handleFilterChange('productcategory', 'Toys and Enrichment');
                                }} />
                                Toys and Enrichment
                            </label>
                            <ul>
                                <li>{/* Toys */}
                                    <label>
                                        <input type="checkbox" checked={isToysFiltered} onChange={(e)=>{
                                            setIsToysFiltered(!isToysFiltered);
                                            handleFilterChange('subcategory', 'Toys');
                                        }} />
                                        Toys
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className='filterbuttons'> {/* Care and Well-being */}
                            <label>
                                <input type="checkbox" checked={isCareAndWellBeingFiltered} onChange={(e)=>{
                                    setIsCareAndWellBeingFiltered(!isCareAndWellBeingFiltered);
                                    handleFilterChange('productcategory', 'Care and Well-being');
                                }} />
                                Care and Well-being
                            </label>
                            <ul>
                                <li>{/* Grooming Tools */}
                                    <label>
                                        <input type="checkbox" checked={isGroomingToolsFiltered} onChange={(e)=>{
                                            setIsGroomingToolsFiltered(!isGroomingToolsFiltered);
                                            handleFilterChange('subcategory', 'Grooming Tools');
                                        }} />
                                        Grooming Tools
                                    </label>
                                </li>
                                <li>{/* Bedding */}
                                    <label>
                                        <input type="checkbox" checked={isBeddingFiltered} onChange={(e)=>{
                                            setIsBeddingFiltered(!isBeddingFiltered);
                                            handleFilterChange('subcategory', 'Bedding');
                                        }} />
                                        Bedding
                                    </label>
                                </li>
                                <li>{/* Leash and Collar */}
                                    <label>
                                        <input type="checkbox" checked={isLeashesAndCollarFiltered} onChange={(e)=>{
                                            setIsLeashesAndCollarFiltered(!isLeashesAndCollarFiltered);
                                            handleFilterChange('subcategory', 'Leashes and Collar');
                                        }} />
                                        Leashes and Collar
                                    </label>
                                </li>
                                <li>{/* Accessories */}
                                    <label>
                                        <input type="checkbox" checked={isAccessoriesFiltered} onChange={(e)=>{
                                            setIsAccessoriesFiltered(!isAccessoriesFiltered);
                                            handleFilterChange('subcategory', 'Accessories');
                                        }} />
                                        Accessories
                                    </label>
                                </li>
                                <li>{/* Aquarium */}
                                    <label>
                                        <input type="checkbox" checked={isAquariumFiltered} onChange={(e)=>{
                                            setIsAquariumFiltered(!isAquariumFiltered);
                                            handleFilterChange('subcategory', 'Aquarium');
                                        }} />
                                        Aquarium
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>                   
                </div>
                <div className='filterbuttons'> {/* Pet Types */}
                    <label>{/* All Pet Types */}
                        <input type="checkbox" checked={isAllPetTypesFiltered} onChange={(e)=>{
                            setIsAllPetTypesFiltered(!isAllPetTypesFiltered);
                            handleFilterChange('pettype', 'All');
                        }} />
                        All Pet Types
                    </label>
                    <ul> {/* Pet Type */}
                        <li> {/* Dog */}
                            <label>
                                <input type="checkbox" checked={isDogFiltered} onChange={(e)=>{
                                    setIsDogFiltered(!isDogFiltered);
                                    handleFilterChange('pettype', 'Dog');
                                }} />
                                Dog
                            </label>
                        </li>
                        <li>{/* Cat */}
                            <label>
                                <input type="checkbox" checked={isCatFiltered} onChange={(e)=>{
                                    setIsCatFiltered(!isCatFiltered);
                                    handleFilterChange('pettype', 'Cat');
                                }} />
                                Cat
                            </label>
                        </li>
                        <li>{/* Bird */}
                            <label>
                                <input type="checkbox" checked={isBirdFiltered} onChange={(e)=>{
                                    setIsBirdFiltered(!isBirdFiltered);
                                    handleFilterChange('pettype', 'Bird');
                                }} />
                                Bird
                            </label>
                        </li>
                        <li>{/* Fish */}
                            <label>
                                <input type="checkbox" checked={isFishFiltered} onChange={(e)=>{
                                    setIsFishFiltered(!isFishFiltered);
                                    handleFilterChange('pettype', 'Fish');
                                }} />
                                Fish
                            </label>
                        </li>
                        <li>{/* Reptile */}
                            <label>
                                <input type="checkbox" checked={isReptileFiltered} onChange={(e)=>{
                                    setIsReptileFiltered(!isReptileFiltered);
                                    handleFilterChange('pettype', 'Reptile');
                                }} />
                                Reptile
                            </label>
                        </li>
                        <li>{/* Small Animals */}
                            <label>
                                <input type="checkbox" checked={isSmallAnimalsFiltered} onChange={(e)=>{
                                    setIsSmallAnimalsFiltered(!isSmallAnimalsFiltered);
                                    handleFilterChange('pettype', 'Small Animals');
                                }} />
                                Small Animals
                            </label>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className='right'>
                <form onSubmit={handleSearchSubmit}>
                    <input
                    type="text"
                    name="search"
                    id="search1"
                    placeholder="Search for products.."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <ul>
                    {(filtered ? filtered : results).map(product => (
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
            </div>
            
        </div>
    );
};

export default ProductList;
