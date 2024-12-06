import { EntityData } from '../types';

export const downloadCSV = (data: EntityData[], filename: string) => {
  const headers = ['Classification', 'Entity ID', 'Friendly Name', 'State'];
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      item.classification,
      item.entity_id,
      item.friendly_name,
      item.state
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};