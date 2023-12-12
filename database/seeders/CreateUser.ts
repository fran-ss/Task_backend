import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
export default class CreateUserSeender extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'franciane',
      email: 'franciane@gmail.com',
      password: 'secret',
    })
  }
}
