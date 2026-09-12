/**
 * In-memory TTL cache for serverless runtimes.
 * Provides micro-caching for frequent read paths while ensuring instant invalidation on writes.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const memoryStore = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = memoryStore.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(key);
    return null;
  }
  return entry.data;
}

export function setCached<T>(key: string, data: T, ttlSeconds: number = 30): void {
  memoryStore.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export function invalidateCache(prefix?: string): void {
  if (!prefix) {
    memoryStore.clear();
    return;
  }
  for (const key of memoryStore.keys()) {
    if (key.startsWith(prefix)) {
      memoryStore.delete(key);
    }
  }
}
