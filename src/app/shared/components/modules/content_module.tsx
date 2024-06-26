'use client'

import '@shared/style/modules/content_module.css'

import { getDB } from "@/app/script/utils/idb";

import { useEffect, useState } from "react";

import { TbArrowsExchange } from "react-icons/tb";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import { ShopItemData, GeneralItemTypes } from "@shared/types/types";
import { DatabaseGetOptions } from "@shared/types/idb.types";
import { DispatchInterface } from "@shared/types/dispatches.types";

export function DispatchContentModule() {

    const [missionData, setMissionData] = useState<DispatchInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            const dbopts: DatabaseGetOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: 'DB_GET_REQUEST_OPTION_ALL',
            }

            await getDB(dbopts)
                .then((r) => {
                    setMissionData(r as DispatchInterface[]);
                    return r;
                })
                .catch((err) => {
                    console.error(err)
                });
        };

        fetchData();
    }, []);

    return (
        <div className="content-module dispatch-menu">
            <div className="menu-head-wrapper">
                <div className="menu-title">
                    <h2>Einsatzliste</h2>
                </div>
                <div className="menu-ui">
                    <button>
                        <BsFillGrid3X3GapFill />
                    </button>
                    <button>
                        <FaThList />
                    </button>
                    <button>
                        <TbArrowsExchange />
                    </button>
                </div>
            </div>
            <div className="menu-content">
                {
                    missionData.map((dispatch: DispatchInterface) => {
                        return (
                            <DispatchContentItem key={dispatch.id} data={dispatch} />
                        );
                    })
                }
            </div>
        </div>
    )
}

function DispatchContentItem({ data }: { data: DispatchInterface }) {
    return (
        <div className="dispatch-item">
            <div className="dispatch-icon">
                icon
            </div>
            <h3 className="dispatch-title">
                {data.mission}
            </h3>
            <p className="dispatch-detail">
                {data.mission} [TODO] Fetch Specific Data From File!!
            </p>
            <div className="dispatch-units">
                <div className="unit-tag">
                    <p>FL-GR 11/11/1</p>
                </div>
                <div className="unit-tag">
                    <p>FL-GR 11/49/1</p>
                </div>
                <div className="unit-tag">
                    <p>FL-GR 11/24/1</p>
                </div>
                <div className="unit-tag">
                    <p>FL-GR 11/33/1</p>
                </div>
            </div>
        </div>
    );
}

export function UnitContentModule() {
    return (
        <div className="content-module unit-menu">
            <p>Units</p>
        </div>
    )
}

export function ItemDisplayModule({ item, type }: { item: string, type: GeneralItemTypes }) {

    const [itemData, setItemData] = useState<ShopItemData[]>([]);

    useEffect(() => {

        let dbopts: DatabaseGetOptions;

        switch (type) {
            case "SHOP_ITEM_TYPE_BUILDING":
                dbopts = {
                    database: 'DB_SAVEGAME_DATA',
                    store: 'DB_STORE_BUILDINGS',
                    schema: 'SCHEMA_SAVEGAME_DATA',
                    key: 'DB_GET_REQUEST_OPTION_ALL'
                }
                break;

            case "SHOP_ITEM_TYPE_VEHICLE":
                dbopts = {
                    database: 'DB_SAVEGAME_DATA',
                    store: 'DB_STORE_PURCHASED_ITEMS',
                    schema: 'SCHEMA_SAVEGAME_DATA',
                    key: [item],
                }
                break;
        }

        async function fetchData() {
            await getDB(dbopts)
                .then((r) => {
                    setItemData(r as ShopItemData[]);
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }

        fetchData();
    }, []);

    return (
        <div className="content-module item-display">
            <details>
                <summary>
                    <h2>Item: {item}</h2>
                </summary>
                <p>
                    {
                        itemData.map((foo) => {
                            return <>{foo.id}</>
                        })
                    }
                </p>
            </details>
        </div >
    )
}