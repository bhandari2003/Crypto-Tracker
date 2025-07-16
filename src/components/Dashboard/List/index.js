import React from 'react'
import "./style.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import Tooltip from '@mui/material/Tooltip';
import { convertNumber } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';

function List({coin}) {
  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className='list-row'>

        <Tooltip title={coin.name} placement='top-start'>
         <td className='td-image'>
        <img src={coin.image} className='coin-logo'></img>
        </td>
        </Tooltip>

        <td>
        <div className='name-sym'>
          <p className='coin-sym'>{coin.symbol}</p>
          <p className='coin-name'>{coin.name}</p>
        </div>
      </td>

        <Tooltip title="Price Change in 24h" placement='bottom-start'>

      {
          coin.price_change_percentage_24h > 0 ? (
              <td className='chip-flex'>
            <div className='price-chip'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className='price-chip td-icon'>
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
            <td className='chip-flex'>
            <div className='price-chip chip-red'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className='icon-chip td-icon'>
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
        </Tooltip>

       <Tooltip title="Current Price">
      <td className='info-container'>
       <h3 className='coin-price td-ralign' style={{ color: coin.price_change_percentage_24h > 0 ? "rgb(3, 189, 3)" : "var(--red)", }}>${coin.current_price.toLocaleString()}</h3>      
      </td>
       </Tooltip>

        <Tooltip title="Total Volume">
      <td>
          <p className='total-vol td-ralign td-tv'>{coin.total_volume.toLocaleString()}</p>
      </td>
        </Tooltip>
        <Tooltip title="Market Cap">
      <td className='desktop-td-mkt'>
        <p className='market-cap td-ralign' >{coin.market_cap.toLocaleString()}</p>
      </td>
        </Tooltip>
        <Tooltip title="Market Cap">
      <td className='mobile-td-mkt'>
        <p className='market-cap td-ralign' >${convertNumber(coin.market_cap)}</p>
      </td>
        </Tooltip>
    </tr>
    </Link>
  )
}

export default List