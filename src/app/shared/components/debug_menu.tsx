'use client'

import Draggable from 'react-draggable';
import '../style/globals.css'
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export function DebugMenu() {

    const cst_page_ref = useRef<HTMLInputElement>(null);
    const search_params_name_ref = useRef<HTMLInputElement>(null);
    const search_params_value_ref = useRef<HTMLInputElement>(null);

    const router = useRouter();

    function handleCstPage() {
        if (cst_page_ref.current) {
            router.replace(cst_page_ref.current.value);
        }
    }

    function handleMdfyParams() {
        const url = new URL(window.location.href);
        url.searchParams.set(search_params_name_ref.current!.value, search_params_value_ref.current!.value);
        window.location.assign(url.href);
    }

    function runCustomScript() {
        const url = new URL(window.location.href);
        url.searchParams.set('primary', 'type_dispatch_menu');
        url.searchParams.set('secondary', 'type_item_display');
        url.searchParams.set('view', '2e69959b-aefa-4248-bf5e-478ec1a4a0b4');
        window.location.assign(url.href);
    }

    return (
        <Draggable
            handle='#dbgm-drag-handle'
        >
            <section id="debug-menu">
                <div id="dbgm-drag-handle">
                    <code>Debug Menu</code>
                </div>
                <div className="dbgm-content">
                    <details open>
                        <summary>Page Changer</summary>
                        <div className="dbgm-wrapper">
                            <div>
                                <button onClick={handleCstPage}>Custom Page</button>
                                <input type="text" ref={cst_page_ref} />
                            </div>
                            <div>
                                <button onClick={handleMdfyParams}>Modify Searchparams</button>
                                <input type="text" ref={search_params_name_ref} />
                                <input type="text" ref={search_params_value_ref} />
                            </div>
                            <div>
                                <button onClick={runCustomScript}>Custom Script</button>
                            </div>
                        </div>
                    </details>
                </div>
            </section>
        </Draggable>
    );
}