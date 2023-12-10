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
            `https://api.coingecko.com/api/v3/exchanges/`,
            {
              params: {
                per_page: 100,
                page,
              },
            }
          );

          fetchedData = response.data.map((coin: any) => {
            const {
              id,
              image,
              name,
              year_established,
              country,
              trust_score,
              trade_volume_24h_btc,
            } = coin;
            return {
              id,
              image,
              name,
              year_established,
              country,
              trust_score,
              trade_volume_24h_btc,
            };
          });
          cachedData.set(page, fetchedData as Coin[]);
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
