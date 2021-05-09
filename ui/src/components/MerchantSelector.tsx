import React from 'react'
import { Merchant } from '../contracts/merchant.entity'

type MerchantSelectorProps = {
  merchants: Merchant[]
  handleChange: any
}

export default function MerchantSelector({
  merchants,
  handleChange,
}: MerchantSelectorProps) {
  return (
    <select onChange={handleChange}>
      {merchants.map((merchant) => (
        <option key={merchant.id} value={merchant.id}>{merchant.name}</option>
      ))}
    </select>
  )
}
