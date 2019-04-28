const categoryList = []
const addCategoryToList = (title, items = []) => {
  categoryList.push([title, items])
}

export { categoryList, addCategoryToList }
