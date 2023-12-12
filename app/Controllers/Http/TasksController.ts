import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TasksController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { title, description, status } = request.only(['title', 'description', 'status'])
    const user = await auth.authenticate()
    await user.related('tasks').create({ title, description, status })
    return response.status(204)
  }
}
