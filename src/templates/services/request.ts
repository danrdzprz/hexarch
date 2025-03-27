export const request = async(input: RequestInfo | URL, init?: RequestInit): Promise<Response> =>{
    const api_url = 'api_url';
    const config = {...init}
    const new_headers = new Headers(config.headers); 
    
    new_headers.append("Authorization", 'Bearer ' + 'token');
    new_headers.append("Accept", 'application/json; charset=UTF-8');
    config.headers = new_headers;
    const url = `${api_url}${input}`
    return fetch(url, config).then(async function(data) {
        if (data.status === 401) {
            
        }
        return data;
    });
}