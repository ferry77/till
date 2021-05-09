import { Transaction } from './transaction.entity'

/**
 *  "id": "002",
    "name": "Nurburgring Laps",
    "isTrading": true,
    "currency": "EURO",
    "transactions": []
 */
export interface Merchant {
  id: string
  name: string
  isTrading: boolean
  currency: string
  transactions: Transaction[]
}
