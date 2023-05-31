import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { CalculatePollutants } from './logic';
import { clearPollutant } from '../redux/details/detailsSlice';
import settings from '../assets/settings.png';
import forward from '../assets/forward.png';
import back from '../assets/back.png';
import '../App.css';

export default function Details() {
  const dispatch = useDispatch();
  const details = useSelector((store) => store.details.details);
  window.addEventListener('load', () => {
    window.location.assign('/');
  });
  return (
    <>
      <nav className="home-nav">
        <div className="nav-container">
          <div className="left-nav">
            <button onClick={() => dispatch(clearPollutant())} type="button" className="back-button">
              <Link to="/">
                <img className="arrow" src={back} alt="arrow back" />
              </Link>
            </button>
            <p className="nav-year">2023</p>
          </div>
          <div>
            <p className="nav-header">Air Pollution</p>
          </div>
          <div className="right-nav">
            <img className="settings-image" src={settings} alt="settings" />
          </div>
        </div>
      </nav>
      <div className="header">
        <div className="map">
          <div className="map-overlay" />
        </div>
        <div className="header-text">
          <h2>Ghana</h2>
          <h2 className="detail-time"><Moment unix format="HH:MM">{details.dt}</Moment></h2>
          <p className="rate">
            {CalculatePollutants(details.components)}
            <span> &#181;</span>
            g/m
            <sup>3</sup>
          </p>
          <p className="air-quality">
            Air Quality:
            { details.main.aqi}
          </p>
        </div>
      </div>
      <p className="main-header">Pollution rate</p>
      <div className="detail-container">
        {
          Object.entries(details.components).map(([key, value]) => (
            <div className="pollutant-detail" key={crypto.randomUUID}>
              <p className="left-col">{key.toUpperCase()}</p>
              <div className="right-col">
                <p>
                  {value}
                  <span> &#181;</span>
                  g/m
                  <sup>3</sup>
                </p>
              </div>
              <img className="foward-img" src={forward} alt="forward" />
            </div>
          ))
        }
      </div>
    </>
  );
}
