export interface FeatureDto {
  id: string;
  name: string;
  description: string;
  payload: any;
  synced: string;
  resource: string;
  requirement_ids: any[];
  project_id: string;
}
