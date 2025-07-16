import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { CoinObject } from '../functions/ConvertObject';
import List from '../components/Dashboard/List';
import Coininfo from '../components/Coin/Coininfo';
import { GetcoinData } from '../functions/Getcoindata';
import { Getcoinprice } from '../functions/Getcoinprices';
import LineChart from '../components/Coin/Linechart';
import { convertDate } from '../functions/convertDate';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function ComparePage() {
    const [crypto1, setCrypto1] = useState('bitcoin');
    const [crypto2, setCrypto2] = useState('ethereum');
    const [days, setDays] = useState(30);

    const [allCoins, setAllCoins] = useState([]);
    const [crypto1Data, setCrypto1Data] = useState(null);
    const [crypto2Data, setCrypto2Data] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((response) => {
                setAllCoins(response.data);
            })
            .catch((error) => {
                console.error("Error fetching all coins:", error);
            });
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true); 
            try {
                const data1 = await GetcoinData(crypto1);
                const data2 = await GetcoinData(crypto2);

                if (data1) CoinObject(setCrypto1Data, data1);
                if (data2) CoinObject(setCrypto2Data, data2);

                if (data1 && data2) {
                    const prices1 = await Getcoinprice(crypto1, days);
                    const prices2 = await Getcoinprice(crypto2, days);

                    if (prices1 && prices2) {
                        setChartData({
                            labels: prices1.map((price) => convertDate(price[0])),
                            datasets: [
                                { label: data1.name, data: prices1.map(p => p[1]), borderColor: "#3a80e9", borderWidth: 2, fill: false, tension: 0.25, pointRadius: 0 },
                                { label: data2.name, data: prices2.map(p => p[1]), borderColor: "#61c96f", borderWidth: 2, fill: false, tension: 0.25, pointRadius: 0 },
                            ],
                        });
                    }
                }
            } catch (e) {
                console.error("Failed to fetch data:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [crypto1, crypto2, days]);

    const handleCoinChange = (event, isCoin1) => {
        if (isCoin1) {
            setCrypto1(event.target.value);
        } else {
            setCrypto2(event.target.value);
        }
    };

    const handleDaysChange = (event) => {
        setDays(event.target.value);
    };

    const selectStyles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--white)" },
        "& .MuiSvgIcon-root": { color: "var(--white)" },
        "&:hover": { "&& fieldset": { borderColor: "#3a80e9" } },
    };

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <p>Crypto 1</p>
                    <Select sx={selectStyles} value={crypto1} onChange={(e) => handleCoinChange(e, true)}>
                        {allCoins.filter(c => c.id !== crypto2).map((coin) => (
                            <MenuItem key={coin.id} value={coin.id}>{coin.name}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <p>Crypto 2</p>
                    <Select sx={selectStyles} value={crypto2} onChange={(e) => handleCoinChange(e, false)}>
                        {allCoins.filter(c => c.id !== crypto1).map((coin) => (
                            <MenuItem key={coin.id} value={coin.id}>{coin.name}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <p>Days</p>
                    <Select sx={selectStyles} value={days} onChange={handleDaysChange}>
                        <MenuItem value={7}>7 Days</MenuItem>
                        <MenuItem value={30}>30 Days</MenuItem>
                        <MenuItem value={60}>60 Days</MenuItem>
                        <MenuItem value={90}>90 Days</MenuItem>
                    </Select>
                </div>
            </div>

            {isLoading || !crypto1Data || !crypto2Data || !chartData ? (
                <Loader />
            ) : (
                <div>
                    <div className='grey-wrapper'>
                        <List coin={crypto1Data} />
                    </div>
                    <div className='grey-wrapper'>
                        <List coin={crypto2Data} />
                    </div>
                    <div className='grey-wrapper'>
                        <LineChart chartData={chartData} />
                    </div>
                    <Coininfo heading={crypto1Data.name} description={crypto1Data.desc} />
                    <Coininfo heading={crypto2Data.name} description={crypto2Data.desc} />
                </div>
            )}
        </div>
    );
}

export default ComparePage;
