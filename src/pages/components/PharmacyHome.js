import React from 'react';
import './PharmacyHome.css';

const PharmacyHome = () => {
    const careCategories = [
        "Bone & Joint care",
        "Diabetes Care",
        "Kidney Care",
        "Liver Care",
        "Respiratory Care",
        "Eye Care"
    ];

    const handleUploadPrescriptionClick = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return (
        <div className="pharmacy-container">
            {/* Header Section */}
            <header className="header">
                <div className='pharmacy-text'>Pharmacy</div>
                <p className="description">
                    ONLINE MEDICINE DELIVERY IS THE PROCESS OF ORDERING MEDICATIONS THROUGH A WEBSITE OR APP AND HAVING THEM DELIVERED TO YOUR DOORSTEP.
                </p>

                <div className="features">
                    <ul>
                        <li>Delivery to your doorstep</li>
                        <li>100% Genuine Medicines</li>
                    </ul>
                </div>

                {/* Medicare Section */}
                <div className="medicare-section">
                    <h2>Y: Medicare</h2>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="upload-btn" onClick={handleUploadPrescriptionClick}>
                        Upload prescription
                    </button>
                    <button className="order-btn">
                        Order Via Prescription
                    </button>
                </div>
            </header>

            {/* Care Categories Grid */}
            <div className="care-grid">
                {careCategories.map((category, index) => (
                    <div key={index} className="care-card">
                        {category}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PharmacyHome;