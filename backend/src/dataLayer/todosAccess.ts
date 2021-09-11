import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')


export class TodosAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly indexName = process.env.TODOS_CREATED_AT_INDEX) {
  }

  async getTodosForUser(userId: string): Promise<TodoItem[]> {

    const result = await this.docClient.query({
      TableName: this.todosTable,
      IndexName: this.indexName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    const items = result.Items
    return items as TodoItem[]
  }

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise()

    return todoItem
  }

  async updateTodo(todoUpdate: TodoUpdate, userId: string, todoId: string) {

    const updatedTodo = await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        'todoId': todoId,
        'userId': userId
      },
      ExpressionAttributeNames: { '#N': 'name' },
      UpdateExpression: 'set #N=:todoName, dueDate=:dueDate, done=:done',
      ExpressionAttributeValues: {
        ':todoName': todoUpdate.name,
        ':dueDate': todoUpdate.dueDate,
        ':done': todoUpdate.done
      },
      ReturnValues: 'UPDATED_NEW'
    })
      .promise()
    logger.info(`User ${userId} updating todoID: ${todoId} to be ${updatedTodo}`)
    return
  }

  async deleteTodo(todoId: string, userId: string) {
    const param = {
      TableName: this.todosTable,
      Key: {
        'todoId': todoId,
        'userId': userId
      }
    }

    await this.docClient.delete(param).promise()
    logger.info(`Deleted todo of ID: ${todoId}`)

    return
  }

  async addAttachmentToItem(todoId: string, userId: string, uploadUrl: string) {
    logger.info(`Adding file attachment for the todo of ID: ${todoId}`)

    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        'todoId': todoId,
        'userId': userId
      },
      UpdateExpression: 'set attachmentUrl=:URL',
      ExpressionAttributeValues: {
        ':URL': uploadUrl.split('?')[0]
      },
      ReturnValues: 'UPDATED_NEW'
    })
      .promise()

    return uploadUrl
  }
}
