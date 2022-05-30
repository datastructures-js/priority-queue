import { MaxHeap, IGetCompareValue } from '@datastructures-js/heap';

export class MaxPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MaxHeap<T>);
  size(): number;
  isEmpty(): boolean;
  front(): T;
  back(): T;
  enqueue(value: T): MaxPriorityQueue<T>;
  push(value: T): MaxPriorityQueue<T>;
  dequeue(): T;
  pop(): T;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MaxPriorityQueue<T>;
}
