'use client'

import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
import './titlebar.css';
import '../../../globals.css';
import { appWindow } from '@tauri-apps/api/window';

export default function WindowTitlebar() {
  return (
    <div className="titlebar" data-tauri-drag-region>
      <div className="window-title" data-tauri-drag-region>
        <span data-tauri-drag-region>Dispond</span>
      </div>
      <div className="titlebar-ui-container">
        <div className="titlebar_button" id="titlebar-minimize" onClick={() => { appWindow.minimize() }}>
          <VscChromeMinimize />
        </div>
        <div className="titlebar_button" id="titlebar-maximize" onClick={() => { appWindow.maximize() }}>
          <VscChromeMaximize />
        </div>
        <div className="titlebar_button" id="titlebar-close" onClick={() => { appWindow.close() }}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
}