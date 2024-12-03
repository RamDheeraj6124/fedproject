import React, { useEffect, useState, useRef } from "react";
import './AddSports.css';

const AddSports = () => {
  const [sportlist, getSportsList] = useState([]);
  const effectRan = useRef(false);

  useEffect(() => {
    const getSports = async () => { 
      try { 
        const res = await fetch("http://localhost:5000/admin/getsportslist", { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        getSportsList(data.sportslist);
      } catch (err) {
        console.log(err);
      }
    };

    if (!effectRan.current) {
      getSports();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = true; // Cleanup
    };
  }, []);

  const addToSports = async (e) => {
    e.preventDefault();

    const form = e.target;
    const sportName = form.sportName.value;
    const equipmentRequired = form.equipmentRequired.value.split(',').map(item => item.trim()); // Split by comma and trim
    const rules = form.rules.value.split(',').map(item => item.trim()); // Split by comma and trim

    const sportData = {
      sportName,
      equipmentRequired,
      rules
    };

    try {
      const res = await fetch("http://localhost:5000/admin/addsport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sportData), // Send JSON-encoded data
      });

      if (res.ok) {
        alert("Sport Added Successfully");
        window.location.reload();
      } else {
        alert("Failed to Add Sport");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="as-container">
      <h1 id="as-title">Add Sport to the Sport List</h1>
      <form id="as-sport-form" onSubmit={addToSports}> 
        <label htmlFor="as-sportName">Name of the Sport:</label>
        <input 
          type="text" 
          id="as-sportName" 
          name="sportName" 
          placeholder="Enter the name of sport" 
          required 
        />

        <label htmlFor="as-equipmentRequired">Equipments Required for the Sport:</label>
        <input 
          type="text" 
          id="as-equipmentRequired" 
          name="equipmentRequired" 
          placeholder="Enter the equipment required (comma-separated)" 
          required 
        />

        <label htmlFor="as-rules">Rules for the Sport:</label>
        <input 
          type="text" 
          id="as-rules" 
          name="rules" 
          placeholder="Enter the rules of sports (comma-separated)" 
          required 
        />

        <button type="submit" id="as-submit-button">Add Sport</button>
      </form>

      <h1 id="as-existing-sports-title">Existing Sports</h1>
      {sportlist.length > 0 ? (
        <ul id="as-sport-list">
          {sportlist.map((sport) => (
            <li key={sport._id} id={`as-sport-${sport._id}`}>
              <h3 id={`as-sport-name-${sport._id}`}>Name: {sport.name}</h3>
              <h3 id={`as-sport-equipment-${sport._id}`}>
                Equipments Required: {Array.isArray(sport.equipmentRequired) ? sport.equipmentRequired.join(", ") : "No equipment"}
              </h3>
              <h3 id={`as-sport-rules-${sport._id}`}>
                Rules: {Array.isArray(sport.rules) ? sport.rules.join(", ") : "No rules"}
              </h3>
            </li>
          ))}
        </ul>
      ) : (
        <p id="as-no-sports-message">No Sports have been added yet</p>
      )}
    </div>
  );
};

export default AddSports;
