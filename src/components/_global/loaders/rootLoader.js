import { ifawfClient } from "../ifawf-api";


export const getDataBody = ()=>{ return {about:null, gathering:null, contacts:null, links:null}}

// Site data to provide to the client.
export default async function rootLoader() {
    try {
        const about = await ifawfClient.get('/about');
        const gathering = await ifawfClient.get('/gathering');
        const contacts = await ifawfClient.get('/contacts');
        const links = await ifawfClient.get('/links');

        const loadedResult = {about, gathering, contacts, links, error: false};
        return loadedResult;
    } catch(error) {
        const body = getDataBody();
        body['error'] = true;
        return body;
    }
}