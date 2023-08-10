import { ElectronAPI } from '@electron-toolkit/preload'

import { ITable } from './interfaces/table'

declare global {
  interface Window {
    electron: ElectronAPI
    tableApi: {
      createTable: (name: string) => Promise<void>
      updateTable: (id: number, newName: string) => Promise<void>
      deleteTable: (id: number) => Promise<void>
      getAllTables: () => Promise<{ success: boolean; tables: ITable[] }>
    }
  }
}
