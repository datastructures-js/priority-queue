import { IGetCompareValue } from '@datastructures-js/heap';
import { PriorityQueue } from './priorityQueue';
import { LegacyOptions } from './minPriorityQueue';

export interface MaxPriorityQueue<T> extends PriorityQueue<T> {
  enqueue(value: T): MaxPriorityQueue<T>;
  push(value: T): MaxPriorityQueue<T>;
}

export const MaxPriorityQueue: {
  new <T>(options?: IGetCompareValue<T> | LegacyOptions<T> | null | undefined, values?: T[]): MaxPriorityQueue<T>;
  fromArray<T>(values: T[], options?: IGetCompareValue<T> | LegacyOptions<T> | null | undefined): MaxPriorityQueue<T>;
};
