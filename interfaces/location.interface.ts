interface Location_area_encounters {
  location_area: LocationArea;
  version_details: VersionDetail[];
}

interface LocationArea {
  name: string;
  url: string;
}

interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: LocationArea;
}

interface EncounterDetail {
  chance: number;
  condition_values: LocationArea[];
  max_level: number;
  method: LocationArea;
  min_level: number;
}
