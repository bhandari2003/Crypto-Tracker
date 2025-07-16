import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { CoinObject } from '../functions/ConvertObject';
import List from '../components/Dashboard/List';
import Coininfo from '../components/Coin/Coininfo';
import { GetcoinData } from '../functions/Getcoindata';
import { Getcoinprice } from '../functions/Getcoinprices';
import LineChart from '../components/Coin/Linechart';
import { convertDate } from '../functions/convertDate';

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [CoinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (id) {

      getdata();

    }
  }, [id])

  async function getdata() {
    const data = await GetcoinData(id);
    if (data) {
      CoinObject(setCoinData, data);
      const prices = await Getcoinprice(id, days);
      if (prices.length > 0) {
        console.log("prices");
        setChartData({
          labels: prices.map((price) => new Date(price[0])),
          datasets: [
            {
              label: 'Dataset 1',
              data: prices.map((price) => convertDate(price[0])),
              borderColor: "#2067d1",
              backgroundColor:"rgba(58,128,233,0.1)",
              borderWidth:2,
              fill:true,
              tension:0.25,
              pointRadius:0,
            }]
        });
        setIsLoading(false);
      }
    }

  }

  return (
    <div>
      <Header />
      {isLoading ? <Loader /> : <>
        <>
          <div className='grey-wrapper'>
            <List coin={CoinData} />
          </div>
          <div className='grey-wrapper'>
            <LineChart chartData={chartData}/>
          </div>

          <Coininfo heading={CoinData.name} description={CoinData.desc} />
        </>
      </>}
    </div>
  )
}

export default CoinPage