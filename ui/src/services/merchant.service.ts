import axios from 'axios'
import { GenericResponse } from '../contracts/generic.response'
import { Merchant } from '../contracts/merchant.entity'

export class MerchantService {
  async findOne(id: string): Promise<GenericResponse<Merchant>> {
    return axios.get(`http://localhost:3000/merchants/${id}`)
  }

  async findAll(): Promise<GenericResponse<Merchant[]>> {
    return axios.get(`http://localhost:3000/merchants`)
  }
}
