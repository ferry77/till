/**
    {
        "id": "001",
        "amount": 2000,
        "description": "1 Lap",
        "ccLastFour": "4234",
        "ccExpiry": "11/04",
        "ccToken": "GH:D54356JJ$#2>GERG",
        "customerId": "004",
        "date": "2020-10-21 02:56:58.701972"
      }
 */
export interface Transaction {
  id: string
  amount: number
  description: string
  ccLastFour: string
  ccExpiry: string
  ccToken: string
  customerId: string
  date: Date
}
