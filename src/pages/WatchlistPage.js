import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { GetcoinData } from '../functions/Getcoindata';
import { Getcoinprice } from '../functions/Getcoinprices';
import { convertDate } from '../functions/convertDate';
import List from '../components/Dashboard/List';
import Coininfo from '../components/Coin/Coininfo';
import LineChart from '../components/Coin/Linechart';
import Button from '../components/common/Button';

function WatchlistPage() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [days, setDays] = useState(30);

    useEffect(() => {
        const fetchAllCoins = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
                setCoins(response.data);
            } catch (error) {
                console.error("Error fetching all coins:", error);
            }
            setIsLoading(false);
        };

        fetchAllCoins();
    }, []);

    useEffect(() => {
        if (selectedCoin) {
            const fetchCoinDetails = async () => {
                setIsLoading(true);
                const data = await GetcoinData(selectedCoin.id);
                if (data) {
                    setSelectedCoinData(data);
                    const prices = await Getcoinprice(selectedCoin.id, days);
                    if (prices && prices.length > 0) {
                        setChartData({
                            labels: prices.map((price) => convertDate(price[0])),
                            datasets: [
                                {
                                    label: 'Price',
                                    data: prices.map((price) => price[1]),
                                    borderColor: "#3a80e9",
                                    borderWidth: 2,
                                    fill: false,
                                    tension: 0.25,
                                    pointRadius: 0,
                                },
                            ],
                        });
                    }
                }
                setIsLoading(false);
            };
            fetchCoinDetails();
        }
    }, [selectedCoin, days]);

    const handleCoinClick = (coin) => {
        setSelectedCoinData(null);
        setChartData(null);
        setSelectedCoin(coin);
    };

    const handleGoBack = () => {
        setSelectedCoin(null);
        setSelectedCoinData(null);
        setChartData(null);
    };

    return (
        <div>
            <Header />
            {isLoading && !coins.length ? (
                <Loader />
            ) : (
                <div style={{ minHeight: '90vh', padding: '1rem' }}>
                    {selectedCoin ? (
                        <div>
                            <Button text="< Back to All Coins" onClick={handleGoBack} />
                            {isLoading || !selectedCoinData ? (
                                <Loader />
                            ) : (
                                <>
                                    <div className='grey-wrapper' style={{ marginTop: '1rem' }}>
                                        <List coin={selectedCoinData} />
                                    </div>
                                    <div className='grey-wrapper'>
                                        {chartData && <LineChart chartData={chartData} key={`${selectedCoin.id}-${days}`} />}
                                    </div>
                                    <Coininfo heading={selectedCoinData.name} description={selectedCoinData.desc} />
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Explore All Coins</h1>
                            {coins.length > 0 ? (
                                <div>
                                    {coins.map((coin) => (
                                        <div key={coin.id} onClick={() => handleCoinClick(coin)}>
                                            <List coin={coin} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                !isLoading && <div>
                                    <h2 style={{ textAlign: 'center', color: 'var(--grey)' }}>
                                        Could not fetch coins.
                                    </h2>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default WatchlistPage;
