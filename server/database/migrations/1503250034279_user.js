'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('cpf', 11).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.integer('level').notNullable()
      table.string('password', 60).notNullable()
      table.string('imgPath').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
