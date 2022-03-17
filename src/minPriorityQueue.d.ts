import { MinHeap, IGetCompareValue } from '@datastructures-js/heap';

export abstract class MinPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MinHeap);
  size(): number;
  isEmpty(): boolean;
  front(): T;
  back(): T;
  enqueue(value: T): MinPriorityQueue<T>;
  dequeue(): T;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinPriorityQueue<T>;
}
