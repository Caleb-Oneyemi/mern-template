import { Todo } from '../models'
import { TodoAttributes, TodoQueryInput } from '../types'

export const createTodo = (input: TodoAttributes) => {
  return Todo.build(input)
}

/** PAGINATED WITH DEFAULT OF TEN DOCUMENTS PER PAGE */
export const getAllTodos = ({
  page = 1,
  limit = 10,
  sort = 'desc',
  filter,
}: TodoQueryInput & { filter: Record<string, unknown> }) => {
  return Todo.find(filter)
    .sort({ createdAt: sort })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate({
      path: 'owner',
      select: 'firstName lastName photUrl -_id -type',
    })
}

/** PAGINATED WITH DEFAULT OF TEN DOCUMENTS PER PAGE */
export const getUserTodos = ({
  page = 1,
  limit = 10,
  sort = 'desc',
  filter,
}: TodoQueryInput & { filter: Record<string, unknown> }) => {
  return Todo.find(filter)
    .sort({ createdAt: sort })
    .limit(limit)
    .skip((page - 1) * limit)
}

export const getTodoByCustomId = async (customId: string, populate = false) => {
  if (!populate) {
    return Todo.findOne({ customId })
  }

  return Todo.findOne({ customId }).populate({
    path: 'owner',
    select: 'firstName lastName photUrl -_id -type',
  })
}

export const updateTodo = (
  customId: string,
  input: Partial<TodoAttributes>,
) => {
  return Todo.findOneAndUpdate({ customId }, { $set: input }, { new: true })
}

export const deleteTodo = (customId: string) => {
  return Todo.findOneAndDelete({ customId })
}

export const getTotalTodoCount = (filter: Record<string, unknown>) => {
  return Todo.countDocuments(filter)
}

export const getTotalUserTodoCount = (filter: Record<string, unknown>) => {
  return Todo.countDocuments(filter)
}
