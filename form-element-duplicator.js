'use strict'
const duplicator = {
	maxCount: 5,
	removeButton: {
		style: '.id__button.id__button--remove',
		text: 'Remove'
	},
	_removeButton: {},
	inputsCheck: function (selector, maxCount) {
		const inputs = document.querySelectorAll(selector)
		if (inputs.length === 0 || (typeof maxCount !== 'undefined' && (maxCount !== -1 && (inputs.length + 1) > maxCount))) {
			return false
		}
		return inputs
	},
	add: function (selector, target, maxCount) {
		let removeButtonTemp, newSelector
		removeButtonTemp = Object.assign({}, this.removeButton)
		if (typeof selector === 'object') {
			if (selector.target) {
				target = selector.target
			}
			if (selector.maxCount) {
				maxCount = selector.maxCount
			}
			if (selector.selector) {
				newSelector = selector.selector
			}
			if (typeof selector.removeButton !== 'undefined') {
				if (typeof selector.removeButton.style !== 'undefined') {
					removeButtonTemp.style = selector.removeButton.style
				}
				if (typeof selector.removeButton.text !== 'undefined') {
					removeButtonTemp.text = selector.removeButton.text
				}
				if (typeof selector.removeButton.html !== 'undefined') {
					delete removeButtonTemp.text
					removeButtonTemp.html = selector.removeButton.html
				}
				if (typeof selector.removeButton === 'boolean' && selector.removeButton === false) {
					removeButtonTemp = false
				}
				if (typeof selector.removeButton === 'string') {
					removeButtonTemp = selector.removeButton
				}
			}
		} else {
			newSelector = selector
		}
		this._removeButton[ newSelector ] = typeof removeButtonTemp === 'object' ? Object.assign({}, removeButtonTemp) : removeButtonTemp
		const removeButton = this._removeButton[ newSelector ]
		const self = this
		if (typeof maxCount === 'undefined') {
			maxCount = this.maxCount
		}
		const inputs = this.inputsCheck(newSelector, maxCount)
		if (inputs === false) {
			return false
		}
		if (typeof target === 'undefined') {
			target = inputs[ 0 ].parentNode
		} else {
			target = document.querySelector(target)
		}
		const sourceNode = inputs[ 0 ]
		const newGroup = document.createElement('div')
		newGroup.appendChild(sourceNode.cloneNode(true))
		if (typeof removeButton === 'object') {
			const removeButtonEl = document.createElement('button')
			removeButton.style.split('.').slice(1).map(function (o) {
				removeButtonEl.classList.add(o)
			})
			removeButtonEl.type = 'button'
			if (removeButton.text) {
				removeButtonEl.innerText = removeButton.text
			} else if (removeButton.html) {
				removeButtonEl.innerHTML = removeButton.html
			}
			removeButtonEl.addEventListener('click', function (event) {
				self.remove(event.target.parentNode)
			}, true)
			newGroup.appendChild(removeButtonEl)
		}
		target.appendChild(newGroup)

		if (typeof removeButton === 'string') {
			const globalRemoveButton = document.querySelector(removeButton)
			const _listener = function () {
				self.removeBySelector(newSelector)
			}
			globalRemoveButton.removeEventListener('click', _listener, true)
			globalRemoveButton.addEventListener('click', _listener, true)
		}
	},
	remove: function (elem) {
		elem.parentNode.removeChild(elem)
	},
	removeBySelector: function (selector) {
		const nodes = document.querySelectorAll(selector)
		if (nodes.length === 1) {
			return false
		}
		const node = nodes[nodes.length - 1]
		node.parentNode.removeChild(node)
	}
}
