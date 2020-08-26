"use strict"

const User = use("App/Models/User")

class UserController {
  async create ({ request }) {
    const data = request.only(["name", "cpf", "email", "password"])

    const user = await User.create(data)

    return user
  }

  async index () {
    // if (auth.user.level !== 999) {
    //   return response.status(401).send({ error: 'Not authorized' })
    // }

    const users = User.all()

    return users
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)
  
    return user
  }

  async update ({ params, request, response }) {
    const user = await User.findOrFail(params.id)
  
    const data = request.only(["name", "cpf", "email", "password"])
  
    user.merge(data)
  
    await user.save()
  
    return user
  }
}

module.exports = UserController