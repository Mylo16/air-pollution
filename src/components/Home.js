import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { TotalPollutants, CalculatePollutants } from './logic';
import settings from '../assets/settings.png';
import forward from '../assets/forward.png';
import search from '../assets/search.png';
import { detailedPollutant } from '../redux/details/detailsSlice';
import { setFilteredTrue } from '../redux/filter/filterSlice';

export default function Home() {
  const { pollutants, isLoading, error } = useSelector((store) => store.pollutants);
  const dispatch = useDispatch();
  const [searchPressed, setSearchPressed] = useState(false);
  const [searchData, setSearchData] = useState('');
  const filter = useSelector((store) => store.filter.filter);
  const [filtered, setFiltered] = useState(false);

  function HandleSearchIcon() {
    setSearchPressed(true);
  }

  function HandleDetails(pollutant) {
    dispatch(detailedPollutant(pollutant));
  }

  function HandleSearch() {
    const jo = [];
    pollutants.list.map((pollutant) => {
      const dateString = moment.unix(pollutant.dt).format('HH:MM');
      if (dateString.includes(searchData.trim())) {
        jo.push(pollutant);
      }
      return pollutant;
    });
    dispatch(setFilteredTrue(jo));
    setFiltered(true);
  }

  function HandleKeyDown(e) {
    if (e.key === 'Enter') {
      HandleSearch();
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="loading">
          Loading...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="error">Error: Please check your connection!</div>
      </>
    );
  }

  if (filtered) {
    return (
      <>
        <nav className="home-nav">
          <div className="nav-container">
            <div className="left-nav">
              <p className="nav-year">2023</p>
            </div>
            <div>
              <p className={searchPressed ? 'no-header' : 'nav-header'}>Air Pollution</p>
            </div>
            <button type="button" onClick={HandleSearchIcon} className={searchPressed ? 'no-header' : 'search-button'}>
              <img src={search} alt="search bar" />
            </button>
            <div className="input">
              <input value={searchData} onKeyDown={HandleKeyDown} onChange={(e) => setSearchData(e.target.value)} required className={searchPressed ? 'search-input' : 'no-header'} placeholder="search" />
              <button onClick={HandleSearch} type="button" className={searchPressed ? 'search' : 'no-header'}><img src={search} alt="search button" /></button>
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
            <h2><Moment unix format="D MMM YYYY">{pollutants.list[0].dt}</Moment></h2>
            <p>
              {TotalPollutants(pollutants.list)}
              <span> &#181;</span>
              g/m
              <sup>3</sup>
            </p>
          </div>
        </div>
        <p className="main-header">Data Collection Time</p>
        <div className="pollutants-container">
          {
            filter.map((pollutant) => (
              <button key={pollutant.dt} type="button" onClick={() => HandleDetails(pollutant)} className="pollutant">
                <Link className="link" to="/details">
                  <img className="forward" src={forward} alt="forward" />
                  <p className="time"><Moment unix format="HH : MM">{pollutant.dt}</Moment></p>
                  <p className="pollutant-data">
                    {CalculatePollutants(pollutant.components)}
                    <span> &#181;</span>
                    g/m
                    <sup>3</sup>
                  </p>
                </Link>
              </button>
            ))
          }
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="home-nav">
        <div className="nav-container">
          <div className="left-nav">
            <p className="nav-year">2023</p>
          </div>
          <div>
            <p className={searchPressed ? 'no-header' : 'nav-header'}>Air Pollution</p>
          </div>
          <button type="button" onClick={HandleSearchIcon} className={searchPressed ? 'no-header' : 'search-button'}>
            <img src={search} alt="search bar" />
          </button>
          <div className="input">
            <input value={searchData} onKeyDown={HandleKeyDown} onChange={(e) => setSearchData(e.target.value)} required className={searchPressed ? 'search-input' : 'no-header'} placeholder="search by time" />
            <button type="button" className={searchPressed ? 'search' : 'no-header'}><img src={search} alt="search button" /></button>
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
          <h2><Moment unix format="D MMM YYYY">{pollutants.list[0].dt}</Moment></h2>
          <p>
            {TotalPollutants(pollutants.list)}
            <span> &#181;</span>
            g/m
            <sup>3</sup>
          </p>
        </div>
      </div>
      <p className="main-header">Data Collection Time</p>
      <div className="pollutants-container">
        {
          pollutants.list.map((pollutant) => (
            <button key={pollutant.td} type="button" onClick={() => HandleDetails(pollutant)} className="pollutant">
              <Link className="link" to="/details">
                <img className="forward" src={forward} alt="forward" />
                <p className="time"><Moment unix format="HH : MM">{pollutant.dt}</Moment></p>
                <p className="pollutant-data">
                  {CalculatePollutants(pollutant.components)}
                  <span> &#181;</span>
                  g/m
                  <sup>3</sup>
                </p>
              </Link>
            </button>
          ))
        }
      </div>
    </>
  );
}
