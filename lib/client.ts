import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'fluttertips',
    apiKey: process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY,
});

export default client;
