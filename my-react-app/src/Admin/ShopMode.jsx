import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopMode.css';

const ShopMode = () => {
    const [username, setUsername] = useState(null);
    const [users, setUsers] = useState([]);
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isShopModalOpen, setIsShopModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5000/admin/checksession', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setUsers(data.details.users);
                setShops(data.details.shops);

            } else {
                navigate('/login');
                setUsername(null);
            }
        };

        checkSession();
    }, [navigate]);



    const openShopModal = (shop) => {
        setSelectedShop(shop);
        setIsShopModalOpen(true);
    };

    const closeShopModal = () => {
        setIsShopModalOpen(false);
        setSelectedShop(null);
    };



    const deleteground = async (e,shopid, groundName) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/admin/deleteground`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    shopId: shopid,
                    groundName: groundName
                }),
                credentials: 'include'
            });
            console.log(groundName)
            if (response.ok) {
                window.location.reload();

            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    if (!username) {
        return <div className="login-message">You must be logged in as an admin to view this page.</div>;
    }

    return (
        <div className="admin-dashboard">
            <h2 id="ad-shops-title">All Shops</h2>
            <ul id="ad-shops-list">
                {shops.map(shop => (
                    <li key={shop._id} id={`ad-shop-${shop._id}`} onClick={() => openShopModal(shop)}>
                        <p>Shop Name: {shop.shopname}</p>
                        <p>Shop Owner: {shop.owner}</p>
                        <p>Shop Email: {shop.email}</p>
                    </li>
                ))}
            </ul>

        
        {isShopModalOpen && selectedShop && (
                <div id="shop-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeShopModal}>&times;</span>
                        <h2>Edit Shop Details</h2>
                        <div className="shop-details">
                            <p><strong>Shop Name:</strong> {selectedShop.shopname}</p>
                            <p><strong>Shop Owner:</strong> {selectedShop.owner}</p>
                            <p><strong>Shop Email:</strong> {selectedShop.email}</p>
                            <p><strong>Address:</strong> {selectedShop.address}</p>
                            <p><strong>Contact:</strong> {selectedShop.contact}</p>
                        </div>
                        {selectedShop.availablesports.map((sport, index) => (
                 <div key={index} className="sport-verification-section">
            <p><strong>Ground Name:</strong> {sport.groundname}</p>
            <p><strong>Price Per Hour:</strong> {sport.priceperhour}</p>
            <p><strong>Max Players:</strong> {sport.maxplayers.join(", ")}</p>
            <p><strong>Ground Dimensions:</strong> {sport.grounddimensions.length}m x {sport.grounddimensions.width}m</p>
            <p><strong>Surface Type:</strong> {sport.surfacetype}</p>
            <p><strong>Status:</strong> {sport.status}</p>
            <p><strong>Verified:</strong> {sport.verify ? "Yes" : "No"}</p>
            <p><strong>Applied for Verification:</strong> {sport.appliedforverification ? "Yes" : "No"}</p>
            <h3>Facilities:</h3>
        <ul>
            {sport.facilities.map((facility, i) => (
                <li key={i}>{facility}</li>
            ))}
        </ul>
        <h3>Availability:</h3>
        <ul>
            {sport.availability.map((avail, i) => (
                <li key={i}>
                    {avail.day}: {avail.times.map(time => `${time.start} - ${time.end}`).join(", ")}
                </li>
            ))}
        </ul>
        <h3>Reviews:</h3>
        <ul>
            {sport.reviews.map((review, i) => (
                <li key={i}>
                    <p><strong>User:</strong> {review.user}</p>
                    <p><strong>Rating:</strong> {review.rating}</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                    <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                </li>
            ))}
        </ul>

<button type="submit" className="submit-button" onClick={(e) => deleteground(e,selectedShop._id, sport.groundname)}>Delte Ground</button>


    </div>
))}

                    </div>
                </div>
            )}
        </div>
    )
}

export default ShopMode;