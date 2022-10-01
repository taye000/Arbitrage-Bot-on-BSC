export const config = {
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",

  buy_amount: 4000,

  default_gas_price: 5 * 10 ** 9, //wei
  default_gas_limit: 1000000,

  pairs: {
    base_url: `https://eigenphi.io/api/v2/arbitrage/stat/lp/hotLp/?chain=_chain_&pageSize=_pageSize_&period=_period_&sortBy=_sortBy_`,
    queryParameters: {
      chain: "bsc",
      pageSize: 100,
      period: 7,
      sortBy: "volume",
    },
    EXCHANGE: {
      shortName: "PancakeSwapV2",
    },
  },

  baseTokensList: {
    WBNB: { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },

    BUSD: { address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" },

    DOGS: { address: "0xDBdC73B95cC0D5e7E99dC95523045Fc8d075Fb9e" },
  },

  dexes: {
    pancakeswapAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    pancakeswapFactoryAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    apeswapAddress: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
    mdexAddress: "0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8",
  },
};
