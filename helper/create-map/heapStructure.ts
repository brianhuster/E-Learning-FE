type ValueGetter<T> = (item: T) => number

export class MinHeap<T> {
  public heap: T[]
  private getValue: ValueGetter<T>

  constructor(getValue: ValueGetter<T>) {
    this.heap = []
    this.getValue = getValue
  }

  buildHeap(array: T[]): void {
    for (let value of array) {
      this.insert(value)
    }
  }

  // Update the insert method
  insert(node: T): void {
    this.heap.push(node)
    if (this.heap.length > 1) {
      let current = this.heap.length - 1
      while (
        current > 0 &&
        this.getValue(this.heap[Math.floor((current - 1) / 2)]) >
          this.getValue(this.heap[current])
      ) {
        ;[this.heap[Math.floor((current - 1) / 2)], this.heap[current]] = [
          this.heap[current],
          this.heap[Math.floor((current - 1) / 2)],
        ]
        current = Math.floor((current - 1) / 2)
      }
    }
  }

  // Update the remove method
  remove(): T | undefined {
    let smallest = this.heap[0]
    if (this.heap.length > 1) {
      this.heap[0] = this.heap[this.heap.length - 1]
      this.heap.pop()
      if (this.heap.length === 2) {
        if (this.getValue(this.heap[0]) > this.getValue(this.heap[1])) {
          ;[this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]]
        }
        return smallest
      }
      let current = 0
      let leftChildIndex = 2 * current + 1
      let rightChildIndex = 2 * current + 2
      while (
        this.heap[leftChildIndex] !== undefined &&
        this.heap[rightChildIndex] !== undefined &&
        (this.getValue(this.heap[current]) >
          this.getValue(this.heap[leftChildIndex]) ||
          this.getValue(this.heap[current]) >
            this.getValue(this.heap[rightChildIndex]))
      ) {
        if (
          this.getValue(this.heap[leftChildIndex]) <
          this.getValue(this.heap[rightChildIndex])
        ) {
          ;[this.heap[current], this.heap[leftChildIndex]] = [
            this.heap[leftChildIndex],
            this.heap[current],
          ]
          current = leftChildIndex
        } else {
          ;[this.heap[current], this.heap[rightChildIndex]] = [
            this.heap[rightChildIndex],
            this.heap[current],
          ]
          current = rightChildIndex
        }
        leftChildIndex = 2 * current + 1
        rightChildIndex = 2 * current + 2
      }
    } else if (this.heap.length === 1) {
      this.heap.splice(0, 1)
    }
    return smallest
  }

  getNsmallest(n: number): T[] {
    let result: T[] = []
    for (let i = 0; i < n; i++) {
      let smallest = this.remove()
      if (smallest !== undefined) {
        result.push(smallest)
      }
    }
    return result
  }
  getNrandom(n: number): T[] {
    let result: T[] = []
    for (let i = 0; i < n; i++) {
      let randomIndex = Math.floor(Math.random() * this.heap.length)
      if (this.heap[randomIndex] === undefined) continue
      result.push(this.heap[randomIndex])
    }
    return result
  }
}
