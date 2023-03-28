import { createClient } from '@sanity/client'
export const BASE_URL = process.env.BASE_URL;
export const client = createClient({
  projectId: 'ksem1dbm',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.PUBLIC_SANITY_TOKEN,
}); 
