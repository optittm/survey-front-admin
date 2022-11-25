import { Project } from "./Project";

export interface Feature {
  id: string;
  name: string;
  description: string;
  payload: any;
  synced: string;
  project: Project;
  resource: string;
  requirement_ids: any[];
}
