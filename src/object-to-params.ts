export function objectToParams(obj: Object, prefix = ''): URLSearchParams {
    const params = new URLSearchParams();
  
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}[${key}]` : key;
  
      if (Array.isArray(value)) {
        value.forEach(val => params.append(fullKey, val));
      } else if (typeof value === 'object' && value !== null) {
        objectToParams(value, fullKey); // Recursión para objetos anidados
      } else {
        params.append(fullKey, value);
      }
    }
    return params;
  }