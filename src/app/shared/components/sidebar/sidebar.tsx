'use client'

import { IoMdAddCircle, IoMdSettings } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BiSolidError, BiSolidPhoneCall } from "react-icons/bi";
import { BsArrowLeftCircle, BsBuildingFillAdd, BsBuildingFillGear } from "react-icons/bs";
import { FaMap } from "react-icons/fa6";
import { extendedSidebar, extendedSidebarContent, sidebarRenderTypes } from "../../types/types";
import { useRouter } from "next/navigation";
import CallItem from "../calls/calls";
import './sidebar.css';
import '../../../globals.css';
import { useState } from "react";
import { BuildingMenu, AddBuildingMenu } from "../menus/buildingmenu";

export default function Sidebar({ data }: sidebarRenderTypes) {

    return (
        <>
            {
                data.extended_menu ? (
                    <ExtendedSidebarContent data={{ extended_menu: data.extended_menu, map_instance: data.map_instance }} />
                ) : (
                    <SidebarContent data={data} />
                )
            }
        </>
    )
}

function SidebarContent({ data }: sidebarRenderTypes) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();

    return (
        <nav className="sidebar">
            <div className="sidebar-ui-container">
                <button className="sidebar-item react-icon-regular" onClick={() => {
                    router.push('/')
                }}>
                    <AiFillHome />
                </button>
                {
                    data.renderCallsButton ? (
                        <button className="sidebar-item react-icon-regular" onClick={() => {
                            router.push('/manage/calls')
                        }}>
                            <BiSolidPhoneCall />
                        </button>
                    ) : null
                }
                {
                    data.renderLocationButton ? (
                        <button className="sidebar-item react-icon-regular" onClick={() => {
                            router.push('/play')
                        }}>
                            <FaMap />
                        </button>
                    ) : null
                }
                {
                    data.renderManageButton ? (
                        <>
                            <button className="sidebar-item react-icon-regular"
                                onMouseEnter={() => {
                                    setDropdownVisible(!isDropdownVisible);
                                }}
                            >
                                <IoMdAddCircle />
                            </button>
                            {isDropdownVisible && <SidebarDropdown />}
                        </>
                    ) : null
                }
            </div>
            <div className="sidebar-ui-contaienr">
                <button className="sidebar-item react-icon-regular">
                    <IoMdSettings />
                </button>
            </div>
        </nav>
    )

    function SidebarDropdown() {
        return (
            <div className="sidebar-dropdown" onMouseLeave={() => {
                setDropdownVisible(false);
            }}>
                <button className="dpw-btn" onClick={() => {
                    router.push('/manage/fleet')
                }}>Fahrzeugmenü</button>
                <button className="dpw-btn" onClick={() => {
                    router.push('/manage/buildings')
                }}>Baumenü</button>
            </div>
        )
    }
}

function ExtendedSidebarContent({ data }: extendedSidebarContent) {
    function ExtendedSidebar({ data }: extendedSidebar) {
        return (
            <nav className="sidebar-extended">
                <div className="ext-sidebar-content">
                    <div className="extsb-head">
                        <button className="extsb-close react-icon-regular" onClick={() => {
                            history.back()
                        }}>
                            <BsArrowLeftCircle />
                        </button>
                        <span className="extsb-icon react-icon-regular">
                            {data.icon}
                        </span>
                        <h2>
                            {data.title}
                        </h2>
                    </div>
                    <div className="extsb-body">
                        {data.content}
                    </div>
                </div>
            </nav>
        )
    }

    switch (data.extended_menu) {
        case 'MENU_CALLS':
            return (
                <ExtendedSidebar data={{
                    title: "Anrufe",
                    icon: <BiSolidPhoneCall />,
                    content: <CallItem />
                }} />
            );

        case 'MENU_MANAGE_FLEET':
            return (
                <ExtendedSidebar data={{
                    title: "501 - Not implemented",
                    icon: <BiSolidError />,
                    content: ''
                }} />
            );

        case 'MENU_MANAGE_BUILDINGS':
            return (
                <ExtendedSidebar data={{
                    title: "Baumenü",
                    icon: <BsBuildingFillGear />,
                    content: <BuildingMenu />
                }} />
            );

        case 'MENU_NEW_BUILDING':
            return (
                <ExtendedSidebar data={{
                    title: "Neues Gebäude",
                    icon: <BsBuildingFillAdd />,
                    content: <AddBuildingMenu map_instance={data.map_instance} />,
                    map_instance: data.map_instance
                }} />
            );
    }
}