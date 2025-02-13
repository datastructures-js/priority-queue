export interface PriorityQueueOptions<T> {
  priority?: (element: T) => number;
  compare?: (a: T, b: T) => number;
}

export interface PriorityQueueItem<T> {
  priority: number;
  element: T;
}

interface PriorityQueue<E, T = E> {
  size(): number;
  isEmpty(): boolean;
  front(): T | null;
  back(): T | null;
  enqueue(element: E, priority?: number): PriorityQueue<E, T>;
  dequeue(): T | null;
  toArray(): T[];
  clear(): void;
}

interface PriorityQueueConstructor {
  new <T>(
    options: PriorityQueueOptions<T> &
      Required<Pick<PriorityQueueOptions<T>, "compare">>
  ): PriorityQueue<T>;
}

declare var PriorityQueue: PriorityQueueConstructor;
