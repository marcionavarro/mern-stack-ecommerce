import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import "../CartStyles/Shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { set } from "mongoose";

function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);
  console.log(shippingInfo);

  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const shippingInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping Info Submitted");
  };

  return (
    <>
      <PageTitle title="Shipping Info" />
      <NavBar />
      <CheckoutPath activePath={0} />
      <div className="shipping-form-container">
        <div className="shipping-form-header">Shipping Details</div>
        <form className="shipping-form" onSubmit={shippingInfoSubmit}>
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="pinCode">Pincode</label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                placeholder="Enter your pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                id="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                  setCity("");
                }}
              >
                <option value="">Select a country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="shipping-form-group">
                <label htmlFor="state">State</label>
                <select
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                >
                  <option value="">Select a State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {state && (
              <div className="shipping-form-group">
                <label htmlFor="city">City</label>
                <select
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select a City</option>
                  {City &&
                    City.getCitiesOfCountry(country, state).map((item) => (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Shipping;
