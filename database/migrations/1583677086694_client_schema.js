'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('representative_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('cnpj', 14).notNullable().unique()
      table.string('store_name').notNullable().unique()
      table.string('state').notNullable()
      table.string('address').notNullable()
      table.string('telephone_number_1', 9).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
