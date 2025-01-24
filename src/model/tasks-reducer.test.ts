import { beforeEach, expect, test } from 'vitest'
import type {TasksState} from '../App'
import { CreateTodolistAC, DeleteTododlistAC } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'
 
let startState: TasksState = {}
 
beforeEach(() => {
  startState = {
    todolistId1: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    todolistId2: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, CreateTodolistAC('New todolist'))
   
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
      throw Error('New key should be added')
    }
   
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
  })

  test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, DeleteTododlistAC('todolistId2'))
   
    const keys = Object.keys(endState)
   
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    expect(endState['todolistId2']).toBeUndefined()
  })