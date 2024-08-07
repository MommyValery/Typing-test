import axios from "axios";

const BACKEND_URL = 'https://baconipsum.com/api/'

async function getText(sentences) {
    const response = await axios.get(BACKEND_URL, {
        params: {
            type: 'meat-and-filler',
            sentences,
            format: 'text'
        }
    });
    return response;
}

export default getText;