import cron from "node-cron";
import { config } from "./config/config";
import { getAmountsOut } from "./utils/common/common";

//A cron job inside main function
const main = async () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      console.log("Running a cron job every minute", new Date());
      console.log("baseTokensList", config.baseTokensList);

      await getAmountsOut(config.buy_amount, [
        config.baseTokensList.BUSD.address,
        config.baseTokensList.WBNB.address,
        config.baseTokensList.DOGS.address,
        config.baseTokensList.BUSD.address,
      ]);
    } catch (error) {
      console.error("error", error);
    }
  });
};

main();
