import cron from "node-cron";
import { config } from "../config/config";
import { getAmountsOut, getPair } from "../utils/common/common";

//A cron job inside processing function
export const processing = async () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      console.log("Running a cron job every minute", new Date());

      await getAmountsOut(config.buy_amount, [
        config.baseTokensList.BUSD.address,
        config.baseTokensList.WBNB.address,
        config.baseTokensList.DOGS.address,
        config.baseTokensList.BUSD.address,
      ]);
      console.log("getting pair");
      await getPair(
        config.baseTokensList.WBNB.address,
        config.baseTokensList.BUSD.address
      );
    } catch (error) {
      console.error("error processing", error);
    }
  });
};
