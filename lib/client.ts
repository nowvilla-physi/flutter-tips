import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'fluttertube',
    apiKey: process.env.MICRO_CMS_API_KEY,
});

export default client;
