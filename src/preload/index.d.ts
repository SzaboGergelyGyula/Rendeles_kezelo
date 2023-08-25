import { ElectronAPI } from '@electron-toolkit/preload'

import { ITable } from './interfaces/table'
import { IOrder } from '@renderer/App'

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
  }
}
