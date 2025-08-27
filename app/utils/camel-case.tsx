function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function keysToCamelCase<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToCamelCase(v)) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    const record = obj as Record<string, unknown>;
    return Object.keys(record).reduce((acc, key) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = keysToCamelCase(record[key]);
      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj as T;
}
