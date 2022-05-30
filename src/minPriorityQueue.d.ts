import { MinHeap, IGetCompareValue } from '@datastructures-js/heap';

export class MinPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MinHeap<T>);
  size(): number;
  isEmpty(): boolean;
  front(): T;
  back(): T;
  enqueue(value: T): MinPriorityQueue<T>;
  push(value: T): MinPriorityQueue<T>;
  dequeue(): T;
  pop(): T;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinPriorityQueue<T>;
}
