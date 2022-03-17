import { MaxHeap, IGetCompareValue } from '@datastructures-js/heap';

export abstract class MaxPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MaxHeap);
  size(): number;
  isEmpty(): boolean;
  front(): T;
  back(): T;
  enqueue(value: T): MaxPriorityQueue<T>;
  dequeue(): T;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MaxPriorityQueue<T>;
}
