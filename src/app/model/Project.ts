export interface Project {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  config: string;
  payload: any;
  synced: string;
}
