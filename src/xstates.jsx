/** @format */

import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

const Xstates = () => {
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
      // Ensure unique country names by removing duplicates and filtering out empty values
      const cleanedCountries = response.data
        .filter(country => country && country.trim() !== '') // Remove empty or whitespace-only values
        .map(country => country.trim()); // Trim whitespace
      const uniqueCountries = [...new Set(cleanedCountries)];
      // Sort countries in ascending order
      const sortedCountries = uniqueCountries.sort((a, b) => a.localeCompare(b));
      console.log("Original countries:", response.data.length, "Unique countries:", uniqueCountries.length);
      console.log("Countries data:", sortedCountries);
      setCountries(sortedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const fetchStates = async (countryName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      );
      // Ensure unique state names by removing duplicates and filtering out empty values
      const cleanedStates = response.data
        .filter(state => state && state.trim() !== '') // Remove empty or whitespace-only values
        .map(state => state.trim()); // Trim whitespace
      const uniqueStates = [...new Set(cleanedStates)];
      // Sort states in ascending order
      const sortedStates = uniqueStates.sort((a, b) => a.localeCompare(b));
      setStates(sortedStates);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
      );
      // Ensure unique city names by removing duplicates and filtering out empty values
      const cleanedCities = response.data
        .filter(city => city && city.trim() !== '') // Remove empty or whitespace-only values
        .map(city => city.trim()); // Trim whitespace
      const uniqueCities = [...new Set(cleanedCities)];
      // Sort cities in ascending order
      const sortedCities = uniqueCities.sort((a, b) => a.localeCompare(b));
      setCities(sortedCities);
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
    fetchStates(selectedCountry);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    fetchCities(selectedCountry, selectedState);
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
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select id="state" onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select id="city" onChange={handleCityChange}>
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

export default Xstates;
