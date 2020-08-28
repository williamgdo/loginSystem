"use strict"

const User = use("App/Models/User")
const Helpers = use('Helpers')


class UserController {

  async create ({ request }) {

    try {
      let data = request.only(["name", "cpf", "email", "password"])
      const image_name = data.cpf + '.jpg'
  
      const profilePic = request.file('profile_pic', {
        types: ['image'],
        size: '2mb'
      })
      
      await profilePic.move(Helpers.tmpPath('images'), {
        name: image_name,
        overwrite: true
      })
      
      if (!profilePic.moved()) {
        return profilePic.error()
      }
      
      data = {...data, level: '1', imgName: image_name}
      const user = await User.create(data)
      return user
    } catch (err) {
      console.warn(err)
    }
  }

  
  async index ({ auth, response }) {
    if (auth.user.level !== 999) {
      return response.status(401).send({ error: 'Not authorized' })
    }
    
    const users = User.all()

    return users
  }
  
  async show ({ params, auth, response }) {
    try {
      if (auth.user.level === 999 || params.id == auth.user.id) {
        let user = await User.findOrFail(params.id)
        return user
      } 
      else {
        return response.status(401).send({ error: 'Not authorized' })
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  
  async update ({ params, auth, request, response }) {
    try {
        if (auth.user.level === 999 || params.id == auth.user.id) {
          const user = await User.findOrFail(params.id)
          let data = request.only(["name", "cpf", "email", "password", "level"])
          data = {...data, imgName: data.cpf + '.jpg'}
          user.merge(data)
          await user.save()
          return user
        } 
        else {
          return response.status(401).send({ error: 'Not authorized' })
        }
    } catch (err) {
      console.log(err);
    }
  }

  async updatePicture ({ params, auth, request, response }) {
    try {
        if (auth.user.level === 999 || params.id == auth.user.id) {
          const user = await User.findOrFail(params.id)
          const image_name = user.cpf + '.jpg'
  
          const profilePic = request.file('profile_pic', {
            types: ['image'],
            size: '2mb'
          })
          
          await profilePic.move(Helpers.tmpPath('images'), {
            name: image_name,
            overwrite: true
          })
          
          if (!profilePic.moved()) {
            return profilePic.error()
          }
      
          return response.status(200).send({ msg: 'Photo updated' })
        } 
        else {
          return response.status(401).send({ error: 'Not authorized' })
        }
    } catch (err) {
      console.log(err);
    }
  }

  async download ({ params, response }) {
    const filePath = `images/${params.fileName}`;
    return response.download(Helpers.tmpPath(filePath));
  }
}

module.exports = UserController