"use strict"

const User = use("App/Models/User")
const Helpers = use('Helpers')


class UserController {
  async create ({ request }) {
    let data = request.only(["name", "cpf", "email", "password"])
    data = {...data, level: '1', imgPath: data.cpf + '.jpg'}
    
    const profilePic = request.file('profile_pic', {
      types: ['image'],
      size: '2mb'
    })
    
    
    await profilePic.move(Helpers.tmpPath('images'), {
      name: data.cpf + '.jpg',
      overwrite: true
    })
    
    if (!profilePic.moved()) {
      return profilePic.error()
    }
    
    const user = await User.create(data)
    return user
  }

  
  async index ({ auth, response }) {
    if (auth.user.level !== 999) {
      return response.status(401).send({ error: 'Not authorized' })
    }
    
    const users = User.all()

    return users
  }
  
  async show ({ params, request, response }) {
    const requestUser = await User.findOrFail(params.id)

    if (auth.user.level === 999 || requestUser.user_id === auth.user.id) {
      const user = await User.findOrFail(params.id)
      return user
    } 
    else {
      return response.status(401).send({ error: 'Not authorized' })
    }
  }
  
  async update ({ params, request, response }) {
    const requestUser = await User.findOrFail(params.id)

    if (auth.user.level === 999 || requestUser.user_id === auth.user.id) {
      const user = await User.findOrFail(params.id)
      const data = request.only(["name", "cpf", "email", "password", "level"])
      data = {...data, imgPath: data.cpf + '.jpg'}
      user.merge(data)
      await user.save()
      return user
    } 
    else {
      return response.status(401).send({ error: 'Not authorized' })
    }
  }
}

module.exports = UserController