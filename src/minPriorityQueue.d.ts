import { IGetCompareValue } from '@datastructures-js/heap';
import { PriorityQueue } from './priorityQueue';

export interface LegacyOptions<T> {
  compare: (a: T, b: T) => number;
}

export interface MinPriorityQueue<T> extends PriorityQueue<T> {
  enqueue(value: T): MinPriorityQueue<T>;
  push(value: T): MinPriorityQueue<T>;
}

export const MinPriorityQueue: {
  new <T>(options?: IGetCompareValue<T> | LegacyOptions<T> | null | undefined, values?: T[]): MinPriorityQueue<T>;
  fromArray<T>(values: T[], options?: IGetCompareValue<T> | LegacyOptions<T> | null | undefined): MinPriorityQueue<T>;
};
