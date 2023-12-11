import styles from "@/pages/index.module.css";

import { Coin } from "types/coin";

import Image from "next/image";

interface CardListProps {
  data: Coin[];
}

export default function CardList({ data }: CardListProps) {
  return (
    <div
      className={`flex flex-col lg:w-[1200px] md:w-[800px] sm:w-[600px] w-[400px]`}
    >
      {data.map((coin) => {
        return (
          <div
            key={coin.id}
            className={`${styles.card} w-full flex flex-row justify-between items-center`}
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                width={50}
                height={50}
                alt={coin.name}
                onError
                src={
                  coin.image === "missing_small.png"
                    ? "/fallback.webp"
                    : coin.image
                }
              />
            </div>
            <div className="flex flex-col w-[60%]">
              <h3 className="font-semibold">{coin.name}</h3>

              <span>
                <span className="font-medium">Year Established: </span>
                {coin.year_established}
              </span>

              <span>
                <span className="font-medium">Country: </span>
                {coin.country}
              </span>

              <span>
                <span className="font-medium">Trust Score: </span>
                {coin.trust_score}
              </span>
              <span>
                <span className="font-medium">Trade Volume: </span>
                {coin.trade_volume_24h_btc
                  ? coin.trade_volume_24h_btc.toFixed(2)
                  : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
