import LinkedList from "./linkedList";

/**
 *
 */
export default class HashMap {
	constructor() {
		this.loadFactor = 0.75;
		this.capacity = 16;
		this.currentCapacity = 0;
		this.buckets = [];
	}

	outOfBoundsErr(index) {
		if (index < 0 || index >= this.capacity) {
			throw new Error("Trying to access index out of bounds");
		}
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * (hashCode + key.charCodeAt(i) * (i + 1))) %
				this.capacity;
		}

		return hashCode;
	}

	findMatching(hashCode, key) {
		let current = this.buckets[hashCode].getHead();
		while (current) {
			if (Object.keys(current.value)[0] === key) {
				return current;
			}
			current = current.nextNode;
		}
		return null;
	}

	findMatchingIndex(hashCode, key) {
		let current = this.buckets[hashCode].getHead();
		let count = 0;
		while (current) {
			if (Object.keys(current.value)[0] === key) {
				return count;
			}
			count += 1;
			current = current.nextNode;
		}
		return null;
	}

	rehash() {
		this.capacity *= 2;
		this.currentCapacity = 0;
		const allEntries = this.entries();
		this.buckets = [];
		allEntries.forEach((entry) => {
			this.set(entry[0], entry[1]);
		});
	}

	set(key, value) {
		const hashCode = this.hash(key);
		this.outOfBoundsErr(hashCode);
		if (!this.buckets[hashCode]) {
			this.buckets[hashCode] = new LinkedList({ [key]: value });
			this.currentCapacity += 1;
		} else {
			const matching = this.findMatching(hashCode, key);
			if (matching) {
				matching.value[key] = value;
			} else {
				this.buckets[hashCode].append({ [key]: value });
				this.currentCapacity += 1;
			}
		}
		if (this.currentCapacity / this.capacity > this.loadFactor) {
			this.rehash();
		}
	}

	get(key) {
		const hashCode = this.hash(key);
		this.outOfBoundsErr(hashCode);
		const bucket = this.buckets[hashCode];
		if (!bucket) {
			return null;
		}

		const matching = this.findMatching(hashCode, key);
		if (!matching) {
			return null;
		}

		const nodeObj = matching.value;
		return nodeObj[key];
	}

	has(key) {
		const hashCode = this.hash(key);
		this.outOfBoundsErr(hashCode);
		const bucket = this.buckets[hashCode];
		if (!bucket) {
			return false;
		}

		const matching = this.findMatching(hashCode, key);
		return !!matching;
	}

	remove(key) {
		const hashCode = this.hash(key);
		this.outOfBoundsErr(hashCode);
		const bucket = this.buckets[hashCode];
		if (!bucket) {
			return false;
		}

		const matchingIndex = this.findMatchingIndex(hashCode, key);
		if (matchingIndex !== null) {
			bucket.removeAt(matchingIndex);
			this.currentCapacity -= 1;
			return true;
		}
		return false;
	}

	length() {
		let count = 0;
		this.buckets.forEach((bucket) => {
			let head = bucket ? bucket.getHead() : null;
			while (head) {
				count += 1;
				head = head.nextNode;
			}
		});
		return count;
	}

	clear() {
		this.buckets = [];
		this.currentCapacity = 0;
	}

	keys() {
		const keysArray = [];
		this.buckets.forEach((bucket) => {
			let head = bucket ? bucket.getHead() : null;
			while (head) {
				const keys = Object.keys(head.value);
				keysArray.push(keys[0]);
				head = head.nextNode;
			}
		});
		return keysArray;
	}

	values() {
		const valuesArray = [];
		this.buckets.forEach((bucket) => {
			let head = bucket ? bucket.getHead() : null;
			while (head) {
				const values = Object.values(head.value);
				valuesArray.push(values[0]);
				head = head.nextNode;
			}
		});
		return valuesArray;
	}

	entries() {
		const entriesArray = [];
		this.buckets.forEach((bucket) => {
			let head = bucket ? bucket.getHead() : null;
			while (head) {
				const keys = Object.keys(head.value);
				const value = head.value[keys[0]];
				const entry = [keys[0], value];
				entriesArray.push(entry);
				head = head.nextNode;
			}
		});
		return entriesArray;
	}
}

// const test = new HashMap();
// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");
// console.log(test.buckets);
// console.log(test.length());
// console.log(test.get("kite"));
// console.log(test.has("kite"));
// // test.remove("kite");
// console.log(test.length());
// // test.remove("banana");
// console.log(test.buckets);
// console.log(test.get("kite"));
// console.log(test.has("kite"));
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());
// test.set("moon", "silver");
// console.log(test.capacity);

// console.log(test.entries());

// test.clear();
// console.log(test.length());

// const map = new HashMap();
// map.set("Steve", "Carell");
// map.set("Adam", "Sandler");
// map.set("Steve", "Johnson");
// console.log(map.buckets);

// console.log(map.hash("ground"));
// console.log(map.hash("dogrun"));
// console.log(map.hash("round"));
// console.log(map.hash("pound"));
// console.log(map.hash("found"));

// const newList = new LinkedList({ Adam: "Sandler" });
// newList.append({ Steve: "Carell" });
// console.log(newList.toString());
// console.log(newList.at(1).value);
// console.log(newList.find({ Steve: "Carell" }));
