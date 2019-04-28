import { categoryList } from './categories'

const addNewItem = (title, num, priority = 'Low') => {
  // console.log(categoryList[num][1])
  categoryList[num][1].push(todoFactory(title, priority))
}

const todoFactory = (content, priority, completed = false) => {
  return { content, priority, completed }
}

export { addNewItem }
