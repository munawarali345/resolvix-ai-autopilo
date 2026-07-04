
import { logService, Environment, IncidentSeverity } from "./index.js";


export interface ServiceInventory {

  id: string;

  name: logService;

  owner: string;

  team: string;

  environment: Environment;

  version: string;

  runtime: string;

  repository: string;

  criticality: IncidentSeverity;

}