import { DataTemplateEntity } from "./types";

export const fillTemplate = (data: DataTemplateEntity, template: string) : string =>{
    let output = template;
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        output = output.replace(regex, data[key]);
    }
    return output;
}
