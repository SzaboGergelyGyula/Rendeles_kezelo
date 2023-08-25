import { useEffect, useState } from 'react'
import TablesComponent from './components/TablesComponent'
import OrderComponent from './components/OrderComponent'

export interface ITable {
  id: number
  name: string
}

export interface IOrder {
  id: number
  table_id: number
  discount_value: number
  payed: Date
}

function App(): JSX.Element {
  const [tables, setTables] = useState<ITable[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])

  const fetchTables = async (): Promise<void> => {
    const response = await window.tableApi.getAllTables()
    if (response.success) {
      setTables(response.tables)
    }
  }

  const fetchOrders = async (): Promise<void> => {
    const response = await window.orderApi.getAllOrders()
    if (response.success) {
      setOrders(response.orders)
    }
  }

  useEffect(() => {
    fetchTables()
    fetchOrders()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Electron-Vite React Tailwind Sqlite3 Example base
      </h1>
      <TablesComponent fetchTables={fetchTables} tables={tables} />
      <OrderComponent fetchOrders={fetchOrders} orders={orders} tables={tables} />
    </>
  )
}
export default App
