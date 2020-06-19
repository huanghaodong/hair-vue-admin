import { regFenToYuan, toDecimal2 } from '@/utils/util';

const Fen2YuanFormate = fen => {
  const yuan = regFenToYuan(fen)
  return toDecimal2(yuan)
}

export {
  Fen2YuanFormate
}
