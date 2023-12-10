import Head from "next/head";
import styles from "@/pages/index.module.css";

import { useCoinData } from "../services/fetchData";
import { useEffect, useState } from "react";

import { Coin } from "types/coin";

import Footer from "@/components/Footer";
import CardList from "@/components/CardList";
import ShowingResults from "@/components/ShowingResults";
import Header from "@/components/Header";
import ListControl from "@/components/ListControl";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading } = useCoinData(page);
  const [filteredData, setFilteredData] = useState<Coin[]>([]);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    setFilteredData(data);
    if (filterString) {
      setFilterString("");
    }
  }, [data, page]);

  const handleFilterData = (e: any) => {
    const filterValue = e.target.value;
    setFilterString(filterValue);
    if (filterValue === "") {
      setFilteredData(data);
    } else {
      const currentFilteredData: Coin[] = filteredData.filter((coin) => {
        const regex = new RegExp(filterValue, "gi");
        return regex.test(coin.name);
      });
      setFilteredData(currentFilteredData);
    }
  };

  const handleFilterStringChange = (newFilterString: string) => {
    setFilterString(newFilterString);
    if (newFilterString === "") {
      setFilteredData(data);
    } else {
      const currentFilteredData: Coin[] = data.filter((coin) => {
        const regex = new RegExp(newFilterString, "gi");
        return regex.test(coin.name);
      });
      setFilteredData(currentFilteredData);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <ListControl
        handleFilterData={handleFilterData}
        nextDisabled={data.length < 100}
        page={page}
        onPageChange={setPage}
        filterString={filterString}
        onFilterStringChange={handleFilterStringChange}
      />

      {filteredData.length > 0 && filterString && (
        <ShowingResults resultsLength={filteredData.length} />
      )}

      <main>
        {loading && <div>Loading...</div>}

        {!loading && data.length === 0 && <div>No results found</div>}

        {!loading && <CardList data={filteredData} />}
      </main>

      <Footer />
    </div>
  );
}
