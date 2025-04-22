import { ResponseFailure } from "../../dtos/ResponseFailure";

export const HandleServerErrors = (e: any, ):  string[]=>{
    const messages: string[] = [];
    try {
        const {message, error, statusCode} = e as ResponseFailure;
        if(message && typeof message === 'object' && message !== null){
          for (const key in message) {
            if (Object.prototype.hasOwnProperty.call(message, key)) {
              const element = message[key];
              for (const msg of element) {
                messages.push(`${msg}`)
              }
            }
          }
        }
        if(message && typeof message === 'string' && message !== null){
          messages.push(`${message}`)

        }
      } catch (error) {
        messages.push(`'Error en el servidor'`)
      }
  return messages;
}