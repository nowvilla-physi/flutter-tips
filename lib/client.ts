import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'flutterschool',
    apiKey: process.env.MICRO_CMS_API_KEY,
});

export default client;
