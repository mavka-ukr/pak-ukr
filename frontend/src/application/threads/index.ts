import { shallowReactive } from "vue";

export abstract class AbstractInfiniteThread<T> {
  public initialLimit: number;
  public nextLimit: number;
  public data: {
    items: T[];
    hasNext: boolean;
    isLoadingInitial: boolean;
    isLoadedInitial: boolean;
    isLoadingNext: boolean;
    error: any;
  };

  constructor(options?: { initialLimit?: number; nextLimit?: number }) {
    this.initialLimit = options?.initialLimit ?? 10;
    this.nextLimit = options?.nextLimit ?? 20;
    this.data = shallowReactive({
      items: [],
      hasNext: true,
      isLoadingInitial: false,
      isLoadedInitial: false,
      isLoadingNext: false,
      error: undefined,
    });
  }

  public get filteredItems(): T[] {
    return this.data.items;
  }

  public reset() {
    this.data.items = [];
    this.data.hasNext = true;
    this.data.isLoadingInitial = false;
    this.data.isLoadedInitial = false;
    this.data.isLoadingNext = false;
    this.data.error = undefined;
  }

  protected abstract fetchInitial(): Promise<T[]>;

  protected abstract fetchNext(): Promise<T[]>;

  public async loadInitial() {
    if (this.data.isLoadingInitial || this.data.isLoadedInitial) {
      return;
    }
    this.data.isLoadingInitial = true;
    try {
      this.data.items = await this.fetchInitial();
      this.data.hasNext = this.data.items.length === this.initialLimit;
      this.data.isLoadedInitial = true;
      this.data.error = undefined;
    } catch (e) {
      console.log(e);
      this.data.error = e;
    }
    this.data.isLoadingInitial = false;
  }

  public async loadNext() {
    if (
      this.data.isLoadingNext ||
      !this.data.hasNext ||
      !this.data.isLoadedInitial
    ) {
      return;
    }
    this.data.isLoadingNext = true;
    try {
      const loadedItems = await this.fetchNext();
      this.data.items = [...this.data.items, ...loadedItems];
      this.data.hasNext = loadedItems.length === this.nextLimit;
      this.data.error = undefined;
    } catch (e) {
      console.log(e);
      this.data.error = e;
    }
    this.data.isLoadingNext = false;
  }

  public async resetAndLoadInitial() {
    this.reset();
    await this.loadInitial();
  }

  public async loadAll() {
    await this.loadInitial();
    while (this.data.hasNext) {
      await this.loadNext();
    }
  }
}
