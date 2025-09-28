/**
 * toDollars.ts
 * 
 * Returns string formatted as US dollar formatted price
 */

export const toDollars = (money: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(money)