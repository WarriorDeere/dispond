import { invoke } from "@tauri-apps/api/tauri";

import { GeometryData } from "@shared/types/ttcst.types";
import { PresenceData, PresenceInterface } from "@shared/types/utils.types";
import { DispatchFileObject, DispatchInterface, DispatchTypeOptions } from "@/app/shared/types/dispatches.types";

export function updatePresence(presence: PresenceData) {

    console.debug("[DEBUG] updating activity");
    const presenceUpdateData: PresenceInterface = {
        action: "EVENT_RPC_SET",
        data: {
            state: presence.state,
            details: presence.details,
            image_large: presence.image_large,
            text_large: presence.text_large,
            image_small: presence.image_small,
            text_small: presence.text_small
        }
    }

    console.debug("[DEBUG] invoking command");
    invoke('presence', {
        data: presenceUpdateData
    })
        .then((r) => {
            console.debug(`[DEBUG] updated activity: ${r}`);
        })
        .catch((e) => {
            throw new Error(`updating activity failed: ${e}`)
        })

    console.debug("[DEBUG] updating activity done");
}

export function animateRespond(route: GeometryData) {
    // function moveToStep(marker: any, route: any, c: any) {
    //     if (route.getNumSteps() > c) {
    //         marker.setLatLng(route.getStep(c).getLatLng());
    //         window.setTimeout(function () {
    //             moveToStep(marker, route, c + 1);
    //         }, 500);
    //     }
    // }

    // const marker = new tt.Marker().setLngLat(route.features[0].geometry.coordinates)

    // moveToStep(marker, route, 0);
}

export async function dispatchTypeToString(dispatch: DispatchTypeOptions): Promise<any> {
    const dispatchData: DispatchInterface = await fetch(`api/data/dispatch?type=${dispatch}`)
        .then((r) => {
            return r.json() as unknown as DispatchInterface;
        })
        .catch((e) => {
            throw new Error(e);
        });

    console.log(dispatchData);
}