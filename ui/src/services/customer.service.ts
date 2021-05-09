import axios from 'axios'
import { Customer } from '../contracts/customer.entity'
import { GenericResponse } from '../contracts/generic.response'

export class CustomerService {
  async findOne(id: string): Promise<GenericResponse<Customer>> {
    return axios.get(`http://localhost:3000/customers/${id}`)
  }

  async findAll(): Promise<GenericResponse<Customer[]>> {
    return axios.get(`http://localhost:3000/customers`)
  }

  // async create(createCustomerDto: CreateCustomerDto) {
  //   const lastNode = this.customers[this.customers.length - 1];

  //   let newId: string = '00' + (parseInt(lastNode.id) + 1);
  //   newId = newId.substring(newId.length - 3);

  //   this.customers.push({
  //     id: newId,
  //     ...createCustomerDto,
  //   });
  // }

  // async update(id: string, updateCustomerDto: UpdateCustomerDto) {
  //   const customerIndex = this.customers.findIndex((item) => item.id === id);
  //   if (customerIndex === -1) {
  //     throw new NotFoundException(`Customer ${id} not found`);
  //   }

  //   this.customers[customerIndex] = Object.assign(
  //     {},
  //     this.customers[customerIndex],
  //     updateCustomerDto,
  //   );
  // }

  // async remove(id: string) {
  //   const customerIndex = this.customers.findIndex((item) => item.id === id);
  //   if (customerIndex >= 0) {
  //     this.customers.splice(customerIndex, 1);
  //   }
  // }
}
