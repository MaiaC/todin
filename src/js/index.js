import { addNewItem } from "./todos"
import { categoryList, addCategoryToList } from "./categories"
import { displayCategories, eventListeners } from "./display"
import './../styles/style.scss';

addCategoryToList("At work")
addCategoryToList("At home")
addCategoryToList("Shopping list")
addNewItem("Bananas", 2, "High")
addNewItem("Wash the dishes", 1)
addNewItem("Buy coffee", 0)
addNewItem("Tidy desk", 0)
displayCategories(categoryList)
eventListeners()