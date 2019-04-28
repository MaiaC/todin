import { categoryList, addCategoryToList } from './categories'
import { addNewItem } from './todos'

const cContainer = document.querySelector('.categories .container')
const iContainer = document.querySelector('.items .container')
const containerMaker = section => {
	const c = document.querySelector(`.${section} .container`)
	return c
}

const displayCategories = list => {
	cContainer.innerHTML = ''
	list.forEach((c, num) => {
		cContainer.appendChild(elementFactory.createCategoryDisplay(c, num))
	})
	toggleFactory.toggleSelected(cContainer.firstChild.firstChild)
	displayController.displayItems(0)
}

const elementFactory = (() => {
	const inputElement = () => {
		const input = document.createElement('input')
		input.setAttribute('type', 'text')
		return input
	}
	const submitButton = () => {
		const button = document.createElement('button')
		button.innerHTML = '&#10004'
		return button
	}
	const selectElement = () => {
		const select = document.createElement('select')
		const priorities = ['Low', 'Medium', 'High']
		priorities.forEach(p => {
			const option = document.createElement('option')
			option.value = p
			option.text = p
			select.appendChild(option)
		})
		return select
	}
	const createInput = section => {
		const div = document.createElement('div')
		const input = inputElement()
		input.setAttribute('placeholder', `New ${section}`)
		const button = submitButton()
		button.className = `${section}Submit`
		div.appendChild(input)
		if (section === 'item') {
			const select = selectElement()
			div.appendChild(select)
		}
		div.appendChild(button)
		div.className = `${section}Input`
		return div
	}
	const deleteButton = num => {
		const button = document.createElement('button')
		button.innerHTML = 'x'
		button.id = `delete-${num}`
		button.className = 'delete'
		return button
	}
	const priorityElement = priority => {
		const priorityDisplay = document.createElement('button')
		priorityDisplay.innerHTML = priority
		priorityDisplay.classList = `priority ${priority}`
		return priorityDisplay
	}
	const itemText = text => {
		const textDisplay = document.createElement('input')
		textDisplay.disabled = true
		textDisplay.value = text
		return textDisplay
	}
	const editButton = num => {
		const button = document.createElement('button')
		button.innerHTML = '&#9998'
		button.id = `edit-${num}`
		button.className = 'edit'
		return button
	}
	const createItemDisplay = (item, num) => {
		const itemContainer = document.createElement('div')
		itemContainer.id = `item-${num}`
		itemContainer.className = 'item'
		itemContainer.appendChild(itemText(item.content))
		itemContainer.appendChild(priorityElement(item.priority))
		itemContainer.appendChild(editButton(num))
		itemContainer.appendChild(deleteButton(num))
		return itemContainer
	}
	const createCategoryDisplay = (category, num) => {
		const categoryContainer = document.createElement('div')
		categoryContainer.id = `category-${num}`
		categoryContainer.className = 'category'
		categoryContainer.appendChild(itemText(category[0]))
		categoryContainer.appendChild(editButton(num))
		categoryContainer.appendChild(deleteButton(num))
		return categoryContainer
	}
	return { createInput, createItemDisplay, createCategoryDisplay }
})()

const toggleFactory = (() => {
	// toggles class names
	const toggleAddNew = clicked => {
		if (clicked.className === 'addNew') {
			clicked.className = 'cancel'
		} else if (clicked.className === 'cancel') {
			clicked.className = 'addNew'
		}
	}

	// toggle selected category
	const toggleSelected = clicked => {
		const categories = document.querySelectorAll('.category input')
		categories.forEach(c => {
			c.className = ''
		})
		clicked.className = 'selected'
	}

	return { toggleAddNew, toggleSelected }
})()

const displayController = (() => {
	// displays items - needs refactoring after adding delete, checkbox, priority etc
	const displayItems = category => {
		const items = categoryList[category][1]
		const section = document.querySelector('#addNewItem')
		if (section.className === 'cancel') {
			toggleFactory.toggleAddNew(section)
		}
		iContainer.innerHTML = ''
		items.forEach((i, num) => {
			iContainer.appendChild(elementFactory.createItemDisplay(i, num))
		})
	}

	// displays input at top of container
	const displayInput = section => {
		const container = containerMaker(section)
		let inputSection = ''
		if (section === 'categories') {
			inputSection = 'category'
		} else {
			inputSection = 'item'
		}
		container.insertBefore(
			elementFactory.createInput(inputSection),
			container.childNodes[0]
		)
	}

	// removes input display from container
	const cancelAddNew = section => {
		const container = containerMaker(section)
		container.removeChild(container.childNodes[0])
	}

	// add category to list and update display
	const addNewCategory = () => {
		const input = document.querySelector('.categories input')
		const cancel = document.querySelector('.categories .cancel')
		if (input.value.length >= 3) {
			addCategoryToList(input.value)
			displayCategories(categoryList)
			toggleFactory.toggleAddNew(cancel)
			toggleFactory.toggleSelected(cContainer.lastChild.firstChild)
			displayItems(parseInt(cContainer.lastChild.id.match(/\d+/)))
		} else {
			alert('must be at least 3 characters')
		}
	}

	// gets info from form, finds selected category array num, creates new item, updates display
	const addItem = () => {
		const input = document.querySelector('.itemInput input')
		const select = document.querySelector('.itemInput select')
		const cancel = document.querySelector('.items .cancel')
		const categories = document.querySelectorAll('.category input')
		let category = ''
		categories.forEach(c => {
			if (c.className === 'selected') {
				category = parseInt(c.parentElement.id.match(/\d+/))
			}
		})
		if (input.value.length >= 3) {
			addNewItem(input.value, category, select.value)
			toggleFactory.toggleAddNew(cancel)
			displayItems(category)
		} else {
			alert('must be at least 3 characters')
		}
	}

	const editable = (num, section) => {
		const input = document.querySelector(`#${section}-${num} input`)
		const button = document.querySelector(`#${section}-${num} #edit-${num}`)
		button.innerHTML = '&#10004'
		button.className = 'save'
		input.disabled = false
	}

	const saveEditCategory = (num, section) => {
		const input = document.querySelector(`#${section}-${num} input`)
		if (input.value.length >= 3) {
			categoryList[num][0] = input.value
			displayCategories(categoryList)
		} else {
			alert('must be at least 3 characters')
		}
	}

	const saveEditItem = (num, section) => {
		const input = document.querySelector(`#${section}-${num} input`)
		const categories = document.querySelectorAll('.category input')
		let category = 0
		categories.forEach(c => {
			if (c.className === 'selected') {
				category = parseInt(c.parentElement.id.match(/\d+/))
			}
		})
		if (input.value.length >= 3) {
			categoryList[category][1][num].content = input.value
			displayItems(category)
		} else {
			alert('must be at least 3 characters')
		}
	}

	const deleteCategory = num => {
		categoryList.splice(num, 1)
		displayCategories(categoryList)
	}

	const deleteItem = num => {
		const categories = document.querySelectorAll('.category input')
		let category = 0
		categories.forEach(c => {
			if (c.className === 'selected') {
				category = parseInt(c.parentElement.id.match(/\d+/))
			}
		})
		categoryList[category][1].splice(num, 1)
		displayItems(category)
	}

	return {
		displayItems,
		displayInput,
		cancelAddNew,
		addNewCategory,
		addItem,
		editable,
		saveEditCategory,
		saveEditItem,
		deleteCategory,
		deleteItem
	}
})()

const eventListeners = () => {
	const row = document.querySelector('.row')
	row.addEventListener('click', event => {
		const clicked = event.target
		if (clicked.className === 'addNew') {
			displayController.displayInput(clicked.parentElement.className)
			toggleFactory.toggleAddNew(clicked)
		} else if (clicked.className === 'cancel') {
			displayController.cancelAddNew(clicked.parentElement.className)
			toggleFactory.toggleAddNew(clicked)
		} else if (
			clicked.tagName === 'INPUT' &&
			clicked.parentElement.className === 'category'
		) {
			toggleFactory.toggleSelected(clicked)
			displayController.displayItems(
				parseInt(clicked.parentElement.id.match(/\d+/))
			)
		} else if (clicked.className === 'categorySubmit') {
			displayController.addNewCategory()
		} else if (clicked.className === 'itemSubmit') {
			displayController.addItem()
		} else if (clicked.className === 'edit') {
			displayController.editable(
				parseInt(clicked.id.match(/\d+/)),
				clicked.parentElement.className
			)
		} else if (clicked.className === 'save') {
			if (clicked.parentElement.className === 'category') {
				displayController.saveEditCategory(
					parseInt(clicked.id.match(/\d+/)),
					'category'
				)
			} else {
				displayController.saveEditItem(
					parseInt(clicked.id.match(/\d+/)),
					'item'
				)
			}
		} else if (clicked.className === 'delete') {
			if (clicked.parentElement.className === 'category') {
				displayController.deleteCategory(parseInt(clicked.id.match(/\d+/)))
			} else {
				displayController.deleteItem(parseInt(clicked.id.match(/\d+/)))
			}
		}
	})
}

export { displayCategories, eventListeners }
