export interface PriorityQueueOptions<T> {
  priority?: (element: T) => number;
  compare?: (a: T, b: T) => number;
}

export interface PriorityQueueItem<T> {
  priority: number;
  element: T;
}

export abstract class PriorityQueue<T> {
  constructor(options?: PriorityQueueOptions<T>);
  size(): number;
  isEmpty(): boolean;
  front(): PriorityQueueItem<T> | T;
  back(): PriorityQueueItem<T> | T;
  enqueue(element: T, priority?: number): PriorityQueue<T>;
  dequeue(): PriorityQueueItem<T> | T;
  toArray(): (PriorityQueueItem<T> | T)[];
  clear(): void;
}
