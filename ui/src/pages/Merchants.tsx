import React, { useEffect, useState } from 'react'
import { MerchantService } from '../services/merchant.service'
import { Merchant } from '../contracts/merchant.entity'

export default function Merchants() {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant>()
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [error, setError] = useState<Error>()
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)

  useEffect(() => {
    async function getPageData() {
      const merchantService = new MerchantService()
      try {
        const returnedMerchants = await merchantService.findAll()
        setMerchants(returnedMerchants.data)
        setSelectedMerchant(returnedMerchants.data[0]) // initial

        setIsLoaded(true)
      } catch (err) {
        setError(err)
      }
    }

    getPageData()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedMerchant(merchants.find((item) => item.id === e.target.value))
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else if (!selectedMerchant) {
    return <div>No merchant selected</div>
  } else {
    const list = []
    for (let item of selectedMerchant.transactions) {
      list.push(
        <tr key={selectedMerchant.id + item.id}>
          <td>{item.id}</td>
          <td>{item.amount}</td>
          <td>{item.description}</td>
          <td>{item.ccLastFour}</td>
          <td>{item.ccExpiry}</td>
          <td>{item.ccToken}</td>
          <td>{item.customerId}</td>
          <td>{item.date}</td>
        </tr>,
      )
    }
      
    return (
      <div>
        <div>
          <select name="" id="" onChange={handleChange}>
            {merchants.map((merchant) => (
              <option value={merchant.id}>{merchant.name}</option>
            ))}
          </select>
          <div>Merchant: {selectedMerchant.name}</div>
        </div>
        <h2>Transactions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>CC Last Four</th>
              <th>Expiry</th>
              <th>Token</th>
              <th>Customer ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>{list}</tbody>
        </table>
      </div>
    )
  }
}
