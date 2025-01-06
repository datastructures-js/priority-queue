import { MaxHeap, IGetCompareValue } from '@datastructures-js/heap';

export class MaxPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MaxHeap<T>);
  [Symbol.iterator](): Iterator<T, any, undefined>;
  size(): number;
  isEmpty(): boolean;
  front(): T | null;
  back(): T | null;
  enqueue(value: T): MaxPriorityQueue<T>;
  push(value: T): MaxPriorityQueue<T>;
  dequeue(): T | null;
  pop(): T | null;
  remove(cb: (value: T) => boolean): T[];
  contains(cb: (value: T) => boolean): boolean;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MaxPriorityQueue<T>;
}
