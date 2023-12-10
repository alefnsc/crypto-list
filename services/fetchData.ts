import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Coin } from "types/coin";

export const useCoinData = (page: number) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Coin[]>([]);

  const cachedData = useMemo(() => {
    return new Map<number, Coin[]>();
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        let fetchedData: Coin[] = [];

        if (cachedData.has(page)) {
          fetchedData = cachedData.get(page) as Coin[];
        } else {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets`,
            {
              params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 100,
                page,
              },
            }
          );
          fetchedData = response.data;
          cachedData.set(page, fetchedData);
        }

        setLoading(false);
        setData(fetchedData);
      } catch (error) {
        console.log(error);
        alert(error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page]);

  return { data, loading };
};
