import { ElectronAPI } from '@electron-toolkit/preload'

import { ITable } from './interfaces/table'
import { IOrder } from '@renderer/App'
import { IResource } from './interfaces/resource'
import { IOrderResource } from './interfaces/orderResource'

declare global {
  interface Window {
    electron: ElectronAPI
    tableApi: {
      createTable: (name: string) => Promise<void>
      updateTable: (id: number, newName: string) => Promise<void>
      deleteTable: (id: number) => Promise<void>
      getAllTables: () => Promise<{ success: boolean; tables: ITable[] }>
    }
    orderApi: {
      createOrder: (table_id: number, discount?: number, payed?: Date) => Promise<void>
      updateOrder: (
        id: number,
        newTableId: number,
        newDiscount?: number,
        newPayed?: Date
      ) => Promise<void>
      deleteOrder: (id: number) => Promise<void>
      getAllOrders: () => Promise<{ success: boolean; orders: IOrder[] }>
    }
    resourceApi: {
      createResource: (name: string, price: number, amount?: number) => Promise<void>
      updateResource: (
        id: number,
        newName: string,
        newPrice: number,
        newAmount?: number
      ) => Promise<void>
      deleteResource: (id: number) => Promise<void>
      getAllResources: () => Promise<{ success: boolean; resources: IResource[] }>
    }
    orderResourceApi: {
      createOrderResource: (order_id: number, resource_id: number, amount?: number) => Promise<void>
      updateOrderResource: (order_id: number, resource_id: number, amount?: number) => Promise<void>
      deleteOrderResource: (order_id: number, resource_id: number) => Promise<void>
      getAllOrderResources: () => Promise<{ success: boolean; orderResources: IOrderResource[] }>
    }
  }
}
