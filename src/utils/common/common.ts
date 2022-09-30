import abi from "../abi/pancakeswapAbi.json";
import { BigNumber, ethers } from "ethers";
import { dexes } from "../../config";

export const provider = new ethers.providers.WebSocketProvider(
  process.env.WSS_URL!
);

export const contract = new ethers.Contract(dexes.pancakeswap, abi, provider);

export const getAmountsOut = async (amountIn: any, path: string[]) => {
  try {
    const amountOut: any = await contract.getAmountsOut(
      BigNumber.from(amountIn),
      path
    );
    const amountsOut = parseInt(amountOut);
    console.log("amountsOut", amountsOut);

    //check for profitability
    if (amountsOut >= amountIn) {
      console.log("Profit margin: ", amountsOut - amountIn);
      return { ProfitMargin: amountsOut - amountIn, profitable: true };
    }
    return { amountsOut: amountsOut, profitable: false };
  } catch (error) {
    console.error("error", error);
  }
};
