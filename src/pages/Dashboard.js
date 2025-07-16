import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/common/Loader';
import BacktoTop from '../components/BacktoTop';


function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousind = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousind, previousind + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  var filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) || (item.symbol.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {

    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&price_change_percentage=24h&precision=4'
      )
      .then((response) => {
        console.log(response);
        setCoins(response.data);
        setPaginatedCoins(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  return (
    <>
    <Header />
    <BacktoTop />
    {isLoading ?( <Loader />): 
    (<div>
      <Search search={search} onSearchChange={onSearchChange} />
      <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
      {!search && (
        <PaginationComponent page={paginatedCoins} handlePageChange={handlePageChange} />
      )}
    </div>
    )}
    </>
  )
}

export default DashboardPage