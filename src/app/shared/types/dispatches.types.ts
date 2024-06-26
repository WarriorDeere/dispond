import { LanguageString, locationObject } from "./types"
import { LoadoutOptions, VehicleTypeOptions } from "./vehicle.types"

export enum DispatchTypeOptions {
    "DISPATCH_TYPE_FIRE_A" = 'fire_a',
    "DISPATCH_TYPE_FIRE_B" = 'fire_b',
    "DISPATCH_TYPE_FIRE_C" = 'fire_c',
    "DISPATCH_TYPE_FIRE_D" = 'fire_d',
    "DISPATCH_TYPE_FIRE_E" = 'fire_e',
    "DISPATCH_TYPE_TECH_A" = 'tech_a',
    "DISPATCH_TYPE_TECH_B" = 'tech_b',
    "DISPATCH_TYPE_TECH_C" = 'tech_c',
}

export interface DispatchFileObject {
    file_type: "dispatch/mission",
    type: DispatchTypeOptions,
    category: {
        [LanguageString.LANGUAGE_STRING_DE_DE]: string,
        [LanguageString.LANGUAGE_STRING_EN_US]: string
    },
    desc: {
        de_DE: string,
        en_US: string
    },
    required_units: VehicleTypeOptions[],
    required_loadout: LoadoutOptions[]
}

export interface DispatchInterface {
    id: string,
    caller: ClientObject,
    location: locationObject,
    mission: DispatchTypeOptions,
    time: number
}

export type ClientObject = {
    last_name: string,
    first_name: string
}