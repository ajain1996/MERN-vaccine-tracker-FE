import React from 'react';
import './HomeDeals.css';

const HomeDeals = () => {
    const products = [
        {
            category: 'Healthcare',
            title: 'Nitrile Disposable gloves 100',
            price: 140,
            rating: 4.5
        },
        {
            category: 'Wellness',
            title: 'Womens multi',
            description: 'Vitamins A, Biotin-cranberry',
            price: 80,
            rating: 4.5
        },
        {
            category: 'Hygiene',
            title: 'Antibacterial Liquid Hand Soap',
            price: 80,
            rating: 4.5
        }
    ];

    return (
        <div className="deals-container">
            {/* Deals Section */}
            <section className="deals-section">
                <h1>Today's best deals for you!</h1>
                <div className="discount-banner">
                    <h2>20% Off</h2>
                    <p>Nutrition · Dietary Supplement · Health Products</p>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <div className="rating">({product.rating})</div>
                            <h3>{product.category}</h3>
                            <h4>{product.title}</h4>
                            {product.description && <p>{product.description}</p>}
                            <div className="price-container">
                                <button className="add-to-cart">+ Add to Cart</button>
                                <span className="price">${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Products />

            {/* Prescription Section */}
            <section className="prescription-section">
                <div className="prescription-box">
                    <h3>Upload prescription to place order</h3>
                    <div className="file-info">
                        <p>Upload only .jpg .png or .pdf files</p>
                        <p>Size limit is 15 MB</p>
                    </div>
                    <button className="upload-btn">Upload prescription</button>
                    <button className="order-btn">Order Via Prescription</button>
                    <a href="#help" className="help-link">How to order?</a>
                </div>

                <div className="consultation-box">
                    <h3>Don’t have a Prescription?</h3>
                    <div className="file-info">
                        <p>Upload only .jpg .png or .pdf files</p>
                        <p>Size limit is 15 MB</p>
                    </div>
                    <button className="consult-btn">Start Consultations</button>
                </div>
            </section>
        </div>
    );
};

const Products = () => {
    const products = [
        {
            category: 'Healthcare',
            name: 'Nitrile Disposable gloves 100',
            price: 140,
            originalPrice: null,
            rating: 4.5
        },
        {
            category: 'Wellness',
            name: 'Womens multi',
            description: 'Vitamins A, Biotin-cranberry',
            price: 80,
            originalPrice: null,
            rating: 4.5
        },
        {
            category: 'Nutrition',
            name: 'Dietary Supplement',
            description: 'Health Products',
            price: 64,
            originalPrice: 80,
            rating: 4.5
        },
        {
            category: 'Hygiene',
            name: 'Antibacterial Liquid Hand Soap',
            price: 80,
            originalPrice: null,
            rating: 4.5
        }
    ];

    const productImages = {
        nutrition: 'https://plus.unsplash.com/premium_photo-1712849057465-0471cc1de415?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        healthcare: 'https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        wellness: 'https://images.unsplash.com/photo-1622484211828-17230f29dfa8?q=80&w=3233&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        hygiene: 'https://images.unsplash.com/photo-1622485831313-2560faea8e6e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    };

    return (
        <div className="products-container">
            <h1>Today's Best Deals</h1>
            <div className="products-grid">
                {products.map((product, index) => (
                    <article key={index} className="product-card">
                        <div className="product-image">
                            <img
                                src={productImages[product.category.toLowerCase()]}
                                alt={product.name}
                            />
                        </div>
                        <div className="rating">({product.rating})</div>
                        <h3 className="category">{product.category}</h3>
                        <h4 className="product-name">{product.name}</h4>
                        {product.description && <p className="description">{product.description}</p>}
                        <div className="price-container">
                            <button className="add-to-cart">
                                + Add to Cart
                            </button>
                            <div className="prices">
                                {product.originalPrice && (
                                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                                )}
                                <span className="current-price">${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default HomeDeals;