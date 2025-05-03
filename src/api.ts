import axios from 'axios';
import { LANGUAGES } from './constants';

const API_URL = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

export const getLanguages = async () => {
    try {
        const response = await API_URL.get('/runtimes');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching languages:', error);
        throw error;
    }
}

export const executeCode = async (code: string, language: string, version: string) => {
    try {
        const response = await API_URL.post('/execute', {
            "language": language,
            "version": version,
            "files": [
              {
                "content": code
              }
            ],
          });
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        throw error;
    }
}

