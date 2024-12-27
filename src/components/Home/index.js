import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import WatchDetails from '../WatchDetails'
//import {Link} from 'react-router-dom'
import './index.css'

// Replace your code here
const Home = () => {
  const handleClick = () => {
    history.push('/buy-watch/apple-watch')
  }
  return (
    <div className="main-container">
      <div className="website-img-container">
        <a href="https://www.apple.com/shop/buy-watch/apple-watch">
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-design-studio-logo?wid=236&hei=52&fmt=jpeg&qlt=90&.v=1566849941844"
            alt="website logo"
            className="website-logo"
          />
        </a>
      </div>
      <div className="remaining-container">
        <h1>
          <span className="watch-studio-head">Apple Watch Studio</span>
          <span className="content-heading">Choose a case.</span>
          <span className="content-heading">Pick a band.</span>
          <span className="content-heading">Create your own style.</span>
        </h1>
        <button
          type="button"
          className="get-started-button"
          onClick={handleClick}
        >
          Get Started
        </button>
        <div>
          <img src="" />
        </div>
      </div>
    </div>
  )
}
export default Home
