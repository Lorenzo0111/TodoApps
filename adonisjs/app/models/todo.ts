import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare done: boolean
}
