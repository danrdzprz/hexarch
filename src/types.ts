export interface ParametersEntity {
    name: string;
    type: string;
}

export const attributes_separator = ',';
export const type_separator = ':';
export const typesString = 'string|number|boolean|bigint|symbol|null|undefined|array|tuple|enum|interface|class|any|unknown|void|never|Blob';
export const type_regular_expression = new RegExp(String.raw`^([a-zA-Z_]+:(${typesString})+,)*[a-zA-Z_]+:(${typesString})+$`, "g");

export interface DataTemplateEntity{
    [key: string]: string;
}