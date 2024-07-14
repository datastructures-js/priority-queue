import { MinHeap, IGetCompareValue } from '@datastructures-js/heap';

export class MinPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MinHeap<T>);
  [Symbol.iterator](): Iterator<T, any, undefined>;
  size(): number;
  isEmpty(): boolean;
  front(): T;
  back(): T;
  enqueue(value: T): MinPriorityQueue<T>;
  push(value: T): MinPriorityQueue<T>;
  dequeue(): T;
  pop(): T;
  remove(cb: (value: T) => boolean): T[];
  contains(cb: (value: T) => boolean): boolean;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinPriorityQueue<T>;
}
