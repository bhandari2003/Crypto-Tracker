import React from 'react'
import style from './style.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
function Grid({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>

        <div className='info-flex'>
          <img src={coin.image} className='coin-logo'></img>
          <div className='name-sym'>
            <p className='coin-sym'>{coin.symbol}</p>
            <p className='coin-name'>{coin.name}</p>
          </div>
        </div>

        {
          coin.price_change_percentage_24h > 0 ? (
            <div className='chip-flex'>
              <div className='price-chip'>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className='price-chip'>
                <TrendingUpRoundedIcon />
              </div>
            </div>
          ) : (
            <div className='chip-flex'>
              <div className='price-chip chip-red'>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className='icon-chip'>
                <TrendingDownRoundedIcon />
              </div>
            </div>
          )}
        <div className='info-container'>
          <h3 className='coin-price' style={{ color: coin.price_change_percentage_24h > 0 ? "rgb(3, 189, 3)" : "var(--red)", }}>${coin.current_price.toLocaleString()}</h3>

          <p className='total-vol'>Total Volume : {coin.total_volume.toLocaleString()}</p>
          <p className='market-cap'>Market Cap : ${coin.market_cap.toLocaleString()}</p>

        </div>

      </div>
    </Link>
  )
}

export default Grid