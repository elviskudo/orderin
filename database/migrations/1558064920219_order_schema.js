'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('product_id')
      table.date('date')
      table.integer('quantity')
      table.integer('status').defaultTo(0).comment('0: waiting, 1: approved, 2: rejected')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
