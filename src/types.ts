export interface ParametersEntity {
    name: string;
    type: string;
}

export const attributes_separator = ',';
export const type_separator = ':';
export const typesString = 'string|number|boolean|bigint|symbol|null|undefined|array|tuple|enum|interface|class|any|unknown|void|never';
export const type_regular_expression = new RegExp(String.raw`^([a-zA-Z]+:(${typesString})+,)*[a-zA-Z]+:(${typesString})+$`, "g");

export interface DataTemplateEntity{
    [key: string]: string;
}