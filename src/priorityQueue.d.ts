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
  front(): PriorityQueueItem<T> | null;
  back(): PriorityQueueItem<T> | null;
  enqueue(element: T, priority?: number): PriorityQueue<T>;
  dequeue(): PriorityQueueItem<T> | null;
  toArray(): PriorityQueueItem<T>[];
  clear(): void;
}
