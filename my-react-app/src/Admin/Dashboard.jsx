import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const [username, setUsername] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalShops, setTotalShops] = useState(0);
  const [totalGrounds, setTotalGrounds] = useState(0);
  const [groundsToVerify, setGroundsToVerify] = useState([]);
  const [appliedGrounds, setAppliedGrounds] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/checksession', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);

          setPercentage(data.admin.revenuepercentage || 0);  // Set initial percentage value

          setTotalUsers(data.details?.users?.length || 0);
          setTotalShops(data.details?.shops?.length || 0);

          let totalGroundsCount = 0;
          let allGroundsToVerify = [];
          let allAppliedGrounds = [];

          data.details.shops.forEach(shop => {
            shop.availablesports.forEach(ground => {
              totalGroundsCount++;
              if (ground.appliedforverification && !ground.verify) {
                allGroundsToVerify.push(ground);
              }
              if (ground.appliedforverification) {
                allAppliedGrounds.push(ground);
              }
            });
          });

          setTotalGrounds(totalGroundsCount);
          setGroundsToVerify(allGroundsToVerify);
          setAppliedGrounds(allAppliedGrounds);
        } else {
          navigate('/login');
          setUsername(null);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    checkSession();
  }, [navigate]);

  // Function to handle the platform percentage form submission
  const fixpercentage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/fixpercentage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ percentage: percentage }), // Send the updated percentage
        credentials: 'include'
      });

      if (response.ok) {
        alert("Percentage updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update percentage.");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const logout = async () => {
    await fetch('http://localhost:5000/admin/logout', { credentials: 'include', method: 'POST' });
    navigate('/');
};

  return (
    <div className="dashboard3">
      <header className="upperbar">
        <h1>Boxplay Admin Panel</h1>
        <span className="logout" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </span>
      </header>

      <h1>Welcome Admin {username} </h1>
      <section className="dashboard-summary">
        <div className="summary-item">
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="summary-item">
          <h2>Total Shops</h2>
          <p>{totalShops}</p>
        </div>
        <div className="summary-item">
          <h2>Total Grounds</h2>
          <p>{totalGrounds}</p>
        </div>
        <div className="summary-item">
          <h2>Grounds to Verify</h2>
          <p>{groundsToVerify.length}</p>
        </div>
        <div className="summary-item">
          <h2>Applied for Verification</h2>
          <p>{appliedGrounds.length}</p>
        </div>
      </section>

      {/* Form to update the platform fee percentage */}
      <form onSubmit={fixpercentage}>
        <label>Fix Revenue Percentage(%):</label>
        <input
          type='number'
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}  // Update state on input change
        />
        <button type='submit'>Fix</button>
      </form>

      <nav className="navbar1">
        <ul>
          <Link to='ManageUsers'><li>Manage Users</li></Link>
          <Link to='VerifyUsers'><li>Verify Users</li></Link>
          <Link to='ManageShops'><li>Manage Shops</li></Link>
          <Link to='Revenuecheck'><li>Check Revenue</li></Link>
          <Link to='BookingList'><li>All Bookings</li></Link>
          <Link to='AddSports'><li>Add Sports</li></Link>
        </ul>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
