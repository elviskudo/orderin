'use strict'

const Database = use('Database')
const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const { validate } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const products = await Product
      .query()
      .fetch()

    await Database.raw('SET sql_mode=""')

    const waitingOrders = await Database
      .table('orders')
      .select('orders.id as id', 'products.name as name', 'products.price as price', 'orders.date as `date`', 'orders.quantity as quantity', 'orders.status as status')
      .count('orders.id as qty')
      .innerJoin('products', 'orders.product_id', 'products.id')
      .where('orders.status', 0)
      .where('orders.user_id', auth.user.id)
      .groupBy('orders.product_id')
    
    const acceptedOrders = await Database
      .table('orders')
      .select('orders.id as id', 'products.name as name', 'products.price as price', 'orders.date as `date`', 'orders.quantity as quantity', 'orders.status as status')
      .count('orders.id as qty')
      .innerJoin('products', 'orders.product_id', 'products.id')
      .where('orders.status', 1)
      .where('orders.user_id', auth.user.id)
      .groupBy('orders.product_id')
    
    const rejectedOrders = await Database
      .table('orders')
      .select('orders.id as id', 'products.name as name', 'products.price as price', 'orders.date as `date`', 'orders.quantity as quantity', 'orders.status as status')
      .count('orders.id as qty')
      .innerJoin('products', 'orders.product_id', 'products.id')
      .where('orders.status', 2)
      .where('orders.user_id', auth.user.id)
      .groupBy('orders.product_id')
    
    return view.render('order', {
      waitingOrders: waitingOrders,
      acceptedOrders: acceptedOrders,
      rejectedOrders: rejectedOrders,
      products: products.toJSON(),
      name: auth.user.username
    })
  }

  async approve ({ request, response, view, session, params }) {
    const order = await Order.find(params.id)
    
    order.status = 1
    order.save()

    session.flash({ successMessage: 'Order was approved!' })

    return response.redirect('orders')
  }

  async reject ({ request, response, view, session, params }) {
    const order = await Order.find(params.id)
    
    order.status = 2
    order.save()

    session.flash({ successMessage: 'Order was rejected!' })

    return response.redirect('orders')
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, session }) {
    const order = await Order.create({
      user_id: auth.user.id,
      product_id: request.input('product_id'),
      quantity: 1
    })

    session.flash({ successMessage: 'Order was added!' })

    return response.redirect('back')
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const order = await Order.find(params.id)
    order.delete()

    session.flash({ successMessage: 'Order was deleted!' })

    return response.redirect('orders')
  }
}

module.exports = OrderController
