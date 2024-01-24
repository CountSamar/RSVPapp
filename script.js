

const form = document.getElementById('registrar')
const input = form.querySelector('input')

const mainDiv = document.querySelector('.main')
const ul = document.getElementById('invitedList')

const div = document.createElement('div')
const filterLabel = document.createElement('label')
const filterCheckBox = document.createElement('input')

filterLabel.textContent = "Hide those who haven't responded"
filterCheckBox.type = 'checkbox'
div.append(filterLabel, filterCheckBox);
mainDiv.insertBefore(div, ul)

filterCheckBox.addEventListener('change', (e) => {
const isChecked = e.target.checked
const lis = ul.children
if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
        let li = lis[i]
        if (li.className === 'responded') {
            li.style.display = ''
        } else {
            li.style.display = 'none'
        }
    }
} else {
    for (let i = 0; i < lis.length; i++) {
        let li = lis[i]
        li.style.display = ''
    } 
}
})

function createLI(text) {
function createElement(elementName, property, value) {
    const element = document.createElement(elementName)
    element[property] = value
    return element 
}
const li = document.createElement('li')
const span = createElement('span', 'textContent', text)
const label = createElement('label', 'textContent', 'confirmed')

const checkbox = createElement('input', 'type', 'checkbox')
label.appendChild(checkbox)

const editButton = createElement('button', 'textContent', 'edit')
const removeButton = createElement('button', 'textContent', 'remove')
li.append(span, label, editButton, removeButton)

return li
}

form.addEventListener('submit', (e) => {
e.preventDefault()
//create a value for the input field and clear the text once its recieved
const text = input.value
input.value = ''
const li = createLI(text)
ul.appendChild(li)
})

ul.addEventListener('change', (e) => {
const checkbox = event.target
const checked = checkbox.checked
const listItem = checkbox.parentNode.parentNode

if (checked) {
listItem.className = 'responded'
} else {
listItem.className = ''
}
})

ul.addEventListener('click', (e) => {
if (e.target.tagName === 'BUTTON') {
    const button = e.target
    const li = e.target.parentNode
    const ul = li.parentNode
    const action = button.textContent
    const nameActions = {
        remove: () => {
            ul.removeChild(li)
        },
        edit: () => {
            const span = li.firstElementChild
            const input = document.createElement('input')
            input.type = 'text'
            input.value = span.textContent
            li.insertBefore(input, span)
            li.removeChild(span)
            button.textContent = 'save'
        },
        save: () => {
            const input = li.firstElementChild
            const span = document.createElement('span')
            span.textContent =  input.value
            li.insertBefore(span, input)
            li.removeChild(input)
            button.textContent = 'edit'
        }

    }
   


  //Select and run action in button's name
    nameActions[action]()

}
})