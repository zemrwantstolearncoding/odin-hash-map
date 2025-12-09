/**
 *
 */
class Node {
	constructor(value = null, nextNode = null) {
		this.value = value;
		this.nextNode = nextNode;
	}
}

/**
 *
 */
export default class LinkedList {
	constructor(value) {
		this.head = new Node(value);
		this.lastNode = this.head;
	}

	append(value) {
		const newNode = new Node(value);
		if (!this.lastNode) {
			this.head = newNode;
			this.lastNode = newNode;
		} else {
			this.lastNode.nextNode = newNode;
			this.lastNode = newNode;
		}
	}

	prepend(value) {
		const newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
			this.lastNode = newNode;
		} else {
			newNode.nextNode = this.head;
			this.head = newNode;
		}
	}

	size() {
		let count = 0;
		let current = this.head;
		while (current) {
			count += 1;
			current = current.nextNode;
		}
		return count;
	}

	getHead() {
		return this.head;
	}

	getTail() {
		return this.lastNode;
	}

	at(index) {
		const length = this.size();
		if (index < 0 && index + length >= 0) {
			index += length;
		}
		if (index >= length || !Number.isInteger(index)) {
			return null;
		}
		let current = 0;
		let node = this.head;
		while (current !== index) {
			node = node.nextNode;
			current += 1;
		}
		return node;
	}

	pop() {
		if (!this.head) {
			return;
		}
		if (!this.head.nextNode) {
			this.head = null;
			this.lastNode = null;
		} else {
			const secondLastNode = this.at(-2);
			secondLastNode.nextNode = null;
			this.lastNode = secondLastNode;
		}
	}

	contains(value) {
		let current = this.head;
		while (current) {
			if (current.value === value) {
				return true;
			}
			current = current.nextNode;
		}
		return false;
	}

	find(value) {
		let current = this.head;
		let count = 0;
		while (current) {
			if (current.value === value) {
				return count;
			}
			count += 1;
			current = current.nextNode;
		}
		return null;
	}

	insertAt(value, index) {
		if (index === 0) {
			this.prepend(value);
			return;
		}
		const previous = this.at(index - 1);
		if (previous) {
			const newNode = new Node(value);
			const current = previous.nextNode;
			previous.nextNode = newNode;
			newNode.nextNode = current;
			if (!newNode.nextNode) {
				this.lastNode = newNode;
			}
		}
	}

	removeAt(index) {
		if (!this.head) {
			return;
		}

		if (index === 0) {
			this.head = this.head.nextNode;
			if (!this.head) {
				this.lastNode = null;
			}
			return;
		}

		const previous = this.at(index - 1);
		if (previous && previous.nextNode) {
			previous.nextNode = previous.nextNode.nextNode;
			if (!previous.nextNode) {
				this.lastNode = previous;
			}
		}
	}

	toString() {
		let current = this.head;
		let res = "";
		while (current) {
			res += `( ${current.value} ) -> `;
			current = current.nextNode;
		}
		res += "null";
		return res;
	}
}
