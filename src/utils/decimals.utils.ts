import Big, { BigSource } from 'big.js';

export type Src = BigSource | bigint;

const parse = (v: Src): Big => {
  if (v instanceof Big) {
    return v;
  } else if (typeof v === 'bigint') {
    return Big(v.toString());
  } else {
    return Big(v);
  }
};

export function applyDecimals(value: Src, decimals: BigSource): Big {
  const bDecimals = parse(decimals).toNumber();
  const multiplier = Big(10).pow(bDecimals);
  return parse(value).mul(multiplier);
}

export function removeDecimals(value: Src, decimals: BigSource = 0): Big {
  const bDecimals = parse(decimals).times(-1);
  return applyDecimals(value, bDecimals);
}

