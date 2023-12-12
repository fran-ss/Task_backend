import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { HttpContext } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    const users = await User.query().preload('tasks')
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    const userExist = await User.findBy('email', email)
    if (userExist) {
      return response.status(400).json({ error: 'Usuario já existe' })
    }
    const user = await User.create({
      name,
      email,
      password,
    })
    return user
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.load('tasks')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User não encontrado' })
    }
  }
  public async update({ request, params, response }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    try {
      const user = await User.findByOrFail('id', params.id)
      user.merge({
        name,
        email,
        password,
      })
      await user.save()
      return user
    } catch (error) {
      return response.status(400).json({ error: 'usuario não existe' })
    }
  }
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(204).json({ error: 'Usuario DELETADO' })
    } catch (error) {
      return response.status(400).json({ error: 'Usuario não encontrado' })
    }
  }
}
