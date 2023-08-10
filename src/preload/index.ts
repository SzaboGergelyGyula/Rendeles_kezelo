import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { createTable, getAllTables, updateTable, deleteTable } from './apis/tableApi'

// Custom APIs for renderer
const tableApi = {
  createTable,
  getAllTables,
  updateTable,
  deleteTable
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('tableApi', tableApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.tableApi = tableApi
}
