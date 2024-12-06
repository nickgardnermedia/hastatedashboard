import { EntityData } from '../types';

export const filterData = (data: EntityData[], searchTerm: string) => {
  if (!searchTerm) return data;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return data.filter(item => 
    item.entity_id.toLowerCase().includes(lowerSearchTerm) ||
    item.friendly_name.toLowerCase().includes(lowerSearchTerm) ||
    item.state.toLowerCase().includes(lowerSearchTerm) ||
    item.classification.toLowerCase().includes(lowerSearchTerm)
  );
};