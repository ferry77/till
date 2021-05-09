import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { UpdateCustomerDto } from './dto/update.customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: '001',
      merchantId: '001',
      name: 'Alfred Jones',
    },
    {
      id: '002',
      merchantId: '001',
      name: 'Sally Brian',
    },
    {
      id: '003',
      merchantId: '001',
      name: 'Jeffery Shorts',
    },
    {
      id: '004',
      merchantId: '002',
      name: 'Hugo Boss',
    },
    {
      id: '005',
      merchantId: '002',
      name: 'Paul Notpete',
    },
    {
      id: '006',
      merchantId: '002',
      name: 'Maggy Spencer',
    },
    {
      id: '007',
      merchantId: '003',
      name: 'Dave Telle',
    },
    {
      id: '008',
      merchantId: '003',
      name: 'Simon Pegstine',
    },
    {
      id: '009',
      merchantId: '003',
      name: 'Andrew Dahoot',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: string) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  create(createCustomerDto: CreateCustomerDto) {
    const lastNode = this.customers[this.customers.length - 1];

    let newId: string = '00' + (parseInt(lastNode.id) + 1);
    newId = newId.substring(newId.length - 3);

    this.customers.push({
      id: newId,
      ...createCustomerDto,
    });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customerIndex = this.customers.findIndex((item) => item.id === id);
    if (customerIndex === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    this.customers[customerIndex] = Object.assign(
      {},
      this.customers[customerIndex],
      updateCustomerDto,
    );
  }

  remove(id: string) {
    const customerIndex = this.customers.findIndex((item) => item.id === id);
    if (customerIndex >= 0) {
      this.customers.splice(customerIndex, 1);
    }
  }
}
