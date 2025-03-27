export const toSnakeCase =  (str: string) => {
    return str.replace(/\s+/g, '_').toLowerCase();
}

export const toCamelCase =  (str: string) => {
    return str
        .replace(/\s(.)/g, function(match, group1) {
            return group1.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function(match, group1) {
            return group1.toLowerCase();
        });
}

export const toPascalCase =  (str: string) => {
    return str
        .replace(/\s(.)/g, function(match, group1) {
            return group1.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function(match, group1) {
            return group1.toUpperCase();
        });
}

export const toKebabCase =  (str: string) => {
    return str.replace(/\s+/g, '-').toLowerCase();
}