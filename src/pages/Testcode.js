<form className="product-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <label>
        Product Name:
        <input
          type="text"
          name="productname"
          value={formData.productname}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Product Description:
        <textarea
          name="productdescription"
          value={formData.productdescription}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
        Product Specification:
        <input
          type="text"
          name="productspecification"
          value={formData.productspecification}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Variant:
        <input
          type="text"
          name="variant"
          value={formData.variant}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Pet Type:
        <select
          name="pettype"
          value={formData.pettype}
          onChange={handleChange}
          required
        >
          <option value="">Select Pet Type</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="fish">Fish</option>
          <option value="bird">Bird</option>
          <option value="reptile">Reptile</option>
          <option value="small animals">Small Animals</option>
          <option value="others">Others</option>
        </select>
      </label>
      <label>
        Product Category:
        <select
          name="productcategory"
          value={formData.productcategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Product Category</option>
          <option value="Food and Nutrition">Food and Nutrition</option>
          <option value="Toys and Enrichment">Toys and Enrichment</option>
          <option value="Care and Well-being">Care and Well-being</option>
        </select>
      </label>
      <label>
        Subcategory:
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Subcategory</option>
          <option value="Food">Food</option>
          <option value="Treats">Treats</option>
          <option value="Supplements">Supplements</option>
          <option value="Toys">Toys</option>
          <option value="Grooming Tools">Grooming Tools</option>
          <option value="Bedding">Bedding</option>
          <option value="Leashes and Collars">Leashes and Collars</option>
          <option value="Accessories">Accessories</option>
          <option value="Aquarium">Aquarium</option>
        </select>
      </label>
      <label>
        Product Image URL:
        <input
          type="url"
          name="productimage"
          value={formData.productimage}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add Product</button>
    </form>