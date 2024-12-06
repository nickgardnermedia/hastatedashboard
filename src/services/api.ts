import { EntityData } from '../types';

// In development, we use the proxy. In production, use the full URL
const BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_HA_URL;
const HA_TOKEN = import.meta.env.VITE_HA_TOKEN;

if (!HA_TOKEN) {
  throw new Error('Home Assistant token must be provided in environment variables');
}

const processEntityData = (data: any[]): EntityData[] => {
  return data.map(item => ({
    classification: item.entity_id.split('.')[0],
    entity_id: item.entity_id,
    state: item.attributes.state || item.state,
    friendly_name: item.attributes.friendly_name || item.entity_id,
  }));
};

export const fetchHomeAssistantData = async (): Promise<EntityData[]> => {
  const headers = new Headers({
    'Authorization': `Bearer ${HA_TOKEN}`,
    'Content-Type': 'application/json',
  });

  const response = await fetch(`${BASE_URL}/api/states`, {
    method: 'GET',
    headers,
    redirect: 'follow'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Home Assistant data: ${response.statusText}`);
  }

  const data = await response.json();
  return processEntityData(data);
};