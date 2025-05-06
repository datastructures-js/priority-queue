import { MinHeap, IGetCompareValue } from '@datastructures-js/heap';

export interface LegacyOptions<T> {
  compare: (a: T, b: T) => number;
}

export class MinPriorityQueue<T> implements Iterable<T> {
  constructor(options?: IGetCompareValue<T> | LegacyOptions<T>, heap?: MinHeap<T>);
  [Symbol.iterator](): Iterator<T, any, undefined>;
  size(): number;
  isEmpty(): boolean;
  front(): T | null;
  back(): T | null;
  enqueue(value: T): MinPriorityQueue<T>;
  push(value: T): MinPriorityQueue<T>;
  dequeue(): T | null;
  pop(): T | null;
  remove(cb: (value: T) => boolean): T[];
  contains(cb: (value: T) => boolean): boolean;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinPriorityQueue<T>;
}
