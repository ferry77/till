import React, { useEffect, useState } from 'react'
import { CustomerService } from '../services/customer.service'
import { Customer } from '../contracts/customer.entity'
import { MerchantService } from '../services/merchant.service'
import { Merchant } from '../contracts/merchant.entity'
import { Transaction } from '../contracts/transaction.entity'
import { currencyFormatter } from '../util/formatter'

export default function Customers() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [error, setError] = useState<Error>()
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)

  useEffect(() => {
    async function getPageData() {
      const customerService = new CustomerService()
      const merchantService = new MerchantService()
      try {
        let [customers, merchants] = await Promise.all([
          customerService.findAll(),
          merchantService.findAll(),
        ])
        setMerchants(merchants.data)
        setCustomers(customers.data)
        setIsLoaded(true)
      } catch (err) {
        setError(err)
      }
    }
    
    getPageData()
  }, [])

  const getTotal = (customerId: string) => {
    return merchants.reduce((total: number, merchant: Merchant) => {
      return (
        total +
        merchant.transactions.reduce(
          (subTotal: number, transaction: Transaction) => {
            if (transaction.customerId === customerId) {
              return subTotal + transaction.amount
            }
            return subTotal
          },
          0,
        )
      )
    }, 0)
  }

  const getMerchant = (customerId: string): Merchant | null => {
    const merchant = merchants.filter((merchant) =>
      merchant.transactions.find(
        (transaction) => transaction.customerId === customerId,
      ),
    )

    return merchant.length ? merchant[0] : null
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    const list = []
    for (let customer of customers) {
      const total = getTotal(customer.id)
      const merchant = getMerchant(customer.id)
      const merchantName = merchant ? merchant.name : ''
      const formattedTotal = merchant
        ? currencyFormatter(total, merchant.currency)
        : currencyFormatter(total)

      list.push(
        <div className="card" key={customer.id}>
          <div className="card-content">
            <div className="content">
              #{customer.id}: {customer.name}
            </div>
          </div>
          <footer className="card-footer">
            <span className="card-footer-item">Merchant: {merchantName}</span>
            <span className="card-footer-item">{formattedTotal}</span>
          </footer>
        </div>,
      )
    }
    return <div>{list}</div>
  }
}
