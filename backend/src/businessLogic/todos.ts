import { TodosAccess } from '../dataLayer/todosAccess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'


const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()
const logger = createLogger('Todos')

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  return todosAccess.getTodosForUser(userId)
}

export async function createTodo(request: CreateTodoRequest, userId: string) {

  const itemId = uuid.v4()
  logger.info(`User ${userId} going to create a new todo of Id ${itemId} `)

  return await todosAccess.createTodo({
    userId: userId,
    todoId: itemId,
    createdAt: new Date().toISOString(),
    name: request.name,
    dueDate: request.dueDate,
    done: false
  })
}

export async function updateTodo(request: UpdateTodoRequest, userId: string, todoId: string) {
  return await todosAccess.updateTodo(request, userId, todoId)
}

export async function deleteTodo(todoId: string, userId: string) {
  return await todosAccess.deleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(todoId: string, userId: string) {
  const uploadUrl = attachmentUtils.createAttachmentPresignedUrl(todoId)
  return await todosAccess.addAttachmentToItem(todoId, userId, uploadUrl)
}

