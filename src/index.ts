import { processing } from "./processing/process";
const main = async () => {
  try {
    processing();
  } catch (error) {
    console.log("error on main function", error);
  }
};

main();
