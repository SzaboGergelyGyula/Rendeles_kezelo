import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { createTable, getAllTables, updateTable, deleteTable } from './apis/tableApi'
import { createOrder, getAllOrders, updateOrder, deleteOrder } from './apis/orderApi'
import { createResource, deleteResource, getAllResources, updateResource } from './apis/resourceApi'
import {
  createOrderResource,
  updateOrderResource,
  deleteOrderResource,
  getAllOrderResources
} from './apis/orderResourceApi'

// Custom APIs for renderer
const tableApi = {
  createTable,
  getAllTables,
  updateTable,
  deleteTable
}

const orderApi = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
}

const resourceApi = {
  createResource,
  getAllResources,
  updateResource,
  deleteResource
}

const orderResourceApi = {
  createOrderResource,
  updateOrderResource,
  deleteOrderResource,
  getAllOrderResources
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('tableApi', tableApi)
    contextBridge.exposeInMainWorld('orderApi', orderApi)
    contextBridge.exposeInMainWorld('resourceApi', resourceApi)
    contextBridge.exposeInMainWorld('orderResourceApi', orderResourceApi)
  } catch (error) {
    console.error('error: ' + error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.tableApi = tableApi
  // @ts-ignore (define in dts)
  window.orderApi = orderApi
  // @ts-ignore (define in dts)
  window.resourceApi = resourceApi
  // @ts-ignore (define in dts)
  window.orderResourceApi = orderResourceApi
}
