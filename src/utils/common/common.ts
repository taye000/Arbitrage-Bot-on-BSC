import pancakeswapV2ABI from "../abi/pancakeswapAbi.json";
import pancakeswapFactoryABI from "../abi/pancakeswapFactoryABI.json";
import pancakePairABI from "../abi/pancakePairABI.json";
import { ethers } from "ethers";
import { config } from "../../config";

export const provider = new ethers.providers.WebSocketProvider(
  process.env.WSS_URL!
);

export const pancakeswapV2Contract = new ethers.Contract(
  config.dexes.pancakeswapAddress,
  pancakeswapV2ABI,
  provider
);
export const pancakeswapFactoryContract = new ethers.Contract(
  config.dexes.pancakeswapFactoryAddress,
  pancakeswapFactoryABI,
  provider
);

export const getAmountsOut = async (amountIn: any, path: string[]) => {
  try {
    const [busd, wbnb, dogs, busd_final] =
      await pancakeswapV2Contract.getAmountsOut(amountIn, path);
    const amountsOut = parseInt(busd_final);
    console.log("amountIn", amountIn);
    console.log("amountsOut", amountsOut);

    //check for profitability
    if (busd_final >= amountIn) {
      console.log(
        `Profit margin: , ${((amountsOut - amountIn) / amountIn) * 100} %`
      );
      return { ProfitMargin: amountsOut - amountIn, profitable: true };
    }
    return { amountsOut: amountsOut, profitable: false };
  } catch (error) {
    console.error("error getting amountsOut", error);
  }
};

export const getPair = async (tokenA: string, tokenB: string) => {
  try {
    const pairAddress = await pancakeswapFactoryContract.getPair(
      tokenA,
      tokenB
    );
    console.log("pairAddress", pairAddress);
    const pancakePairContract = new ethers.Contract(
      pairAddress,
      pancakePairABI,
      provider
    );
    const decimals = await pancakePairContract.decimals();
    console.log(`pairAddress ${pairAddress}, decimals ${decimals}`);

    const [reserve0, reserve1] = await pancakePairContract.getReserves();
    let reserves0 = parseInt(reserve0);
    let reserves1 = parseInt(reserve1);
    console.log(`reserves0, ${reserves0}, reserves1 ${reserves1}`);

    let ReservesRatio =
      reserves0 > reserves1 ? reserves0 / reserves1 : reserves1 / reserves0;

    console.log("Reserves Ratio", ReservesRatio);
  } catch (error) {
    console.log("error getting pair address", error);
  }
};
