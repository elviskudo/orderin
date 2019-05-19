'use strict'

class ProductStore {
  get rules () {
    return {
      // validation rules
      name: 'required|min:5',
      price: 'required|number'
    }
  }

  get messages () {
    return {
      'name.required': 'The product name field is required',
      'name.min': 'The product name field requires at least 5 characters',
      'price.required': 'The product price field is required',
      'price.number': 'The product price field must be a number',
    }
  }
}

module.exports = ProductStore
