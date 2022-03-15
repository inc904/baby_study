/**
 * 将价格从分转换为元
 * @param {number} fPrice 单位分
 * @param {?boolean} cents 是否保留分位的0
 */
export default function transformPrice (fPrice: number, cents: boolean = true): string {
  let yPrice = (fPrice / 100).toFixed(2)

  if (!fPrice) {
    return '0'
  }

  if (!cents) {
    yPrice = yPrice.replace(/([.]?[0]+)$/, '')

    return yPrice
  }

  return yPrice
}
