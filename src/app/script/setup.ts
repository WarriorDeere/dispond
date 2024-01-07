import { invoke } from "@tauri-apps/api/tauri";
import { GameEmitter } from "../emitter";
import { buildingObject } from "../shared/types/types";
import { db_get_buildings } from "../indexed";
import { map_inst } from "../shared/components/map/map";
import tt, { LngLatBounds } from "@tomtom-international/web-sdk-maps";
import { Mission, generateMissionData } from "./gen/mission";

export function init() {
    GameEmitter.on('EVENT_START', async (data) => {

        const buildingData = await db_get_buildings();

        readSetupData();
        spawnBuildings();
        const createMissionInterval = setInterval(startMissionGen, 20000);

        function readSetupData() {
            if (data) {
                invoke('read_file', { data: { base_dir: 'document_dir', file_path: 'Arcavigi Interactive/dispond/saves/saves.json' } })
                    .then(async (r) => {
                        const savegame_config = r;
                    })
                    .catch((err) => {
                        console.warn(err);
                    })
                    .finally(() => {
                        invoke('setup', { data: JSON.stringify(data) });
                    })
            }
            else {
                throw new Error("Invalid or corrupted setup data. Canceled game start.");
            }
        }

        function spawnBuildings() {
            buildingData.forEach((bld_item: buildingObject) => {
                const marker = new tt.Marker({ draggable: false, color: '#ff0000' });
                const popup = new tt.Popup({ anchor: 'top', closeButton: false })
                if (bld_item.position && bld_item.name) {
                    marker.setLngLat(bld_item.position);
                    marker.addTo(map_inst);
                    popup.setText(bld_item.name);
                    popup.addTo(map_inst);
                    marker.setPopup(popup);
                }
                else {
                    throw new Error(`corrupted data, 'position | name' of 'building' is '${bld_item.position} | ${bld_item.name}' (invalid)`);
                }
            })
            for (let i = 0; i < buildingData.length; i++) {
                if (i === (buildingData.length - 1)) {
                    buildingData
                    const bounds = new LngLatBounds(buildingData[0].position, buildingData[i].position);
                    map_inst.fitBounds(bounds, { padding: 175 });
                }
            }
        }

        function startMissionGen() {
            buildingData.forEach(async (bld: buildingObject) => {
                const area = bld.mission_area
                if (area) {
                    const newMissionData = await generateMissionData(area);
                    const newMission = new Mission(newMissionData);
                    const marker = new tt.Marker({ draggable: false, color: 'orange' });
                    marker.setLngLat(newMission.data.location.coords);
                    marker.addTo(map_inst);
                } else {
                    throw new Error(`corrupted data, 'mission_area' of 'building' is '${area}' (invalid)`)
                }
            })
        }
    })
}