export interface Token {
  address: string;
}

export interface Tokens {
  [key: string]: Token;
}

export interface TokenPair {
  symbols: string;
  pairs: string[];
}

export interface ArbitragePair {
  symbols: string;
  pairs: [string, string];
}

export interface Dexes {
  [dexName: string]: string;
}
