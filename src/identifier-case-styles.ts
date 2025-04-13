//snake_case
export const toSnakeCase =  (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

//UPPER_CASE_SNAKE_CASE
export const toUpperSnakeCase =  (str: string) => {
    return toSnakeCase(str).toUpperCase();
}

//camelCase
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
//PascalCase
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
//kebab-case
export const toKebabCase =  (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}