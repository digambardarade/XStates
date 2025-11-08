/** @format */

import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
const XStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const fetchStates = async (countryName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      );

      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState(""); // Reset state selection
    setSelectedCity(""); // Reset city selection
    setStates([]); // Clear states array
    setCities([]); // Clear cities array
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedCity(""); // Reset city selection
    setCities([]); // Clear cities array
    if (selectedState) {
      fetchCities(selectedCountry, selectedState);
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  return (
    <div>
      <h1> Select Location</h1>
      <select id="country" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity ? (
        <h1>
          You selected {selectedCity},{" "}
          <span className="city">
            {selectedState}, {selectedCountry}
          </span>
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};

export default XStates;
