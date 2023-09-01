import { useEffect, useState } from 'react'
import TablesComponent from './components/TablesComponent'
import OrderComponent from './components/OrderComponent'
import ResourceComponent from './components/ResourceComponent'
import OrderResourceComponent from './components/OrderResourceComponent'
import DayComponent from './components/DayComponent'

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

export interface IResource {
  id: number
  name: string
  price: number
  amount?: number
}

export interface IOrderResource {
  order_id: number
  resource_id: number
  amount?: number
}

export interface IDay {
  id: number
  open: Date
  close?: Date
  summary?: number
}

function App(): JSX.Element {
  const [tables, setTables] = useState<ITable[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])
  const [resources, setResources] = useState<IResource[]>([])
  const [orderResources, setOrderResources] = useState<IOrderResource[]>([])
  const [days, setDays] = useState<IDay[]>([])

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

  const fetchResources = async (): Promise<void> => {
    const response = await window.resourceApi.getAllResources()
    if (response.success) {
      setResources(response.resources)
    }
  }

  const fetchOrderResources =async (): Promise<void> => {
    const response = await window.orderResourceApi.getAllOrderResources()
    if (response.success) {
      setOrderResources(response.orderResources)
    }
  }

  const fetchDays = async (): Promise<void> => {
    const response = await window.dayApi.getAllDays()
    if (response.success) {
      setDays(response.days)
    }
  }

  useEffect(() => {
    fetchTables()
    fetchOrders()
    fetchResources()
    fetchOrderResources()
    fetchDays()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Electron-Vite React Tailwind Sqlite3 Example base
      </h1>
      <TablesComponent fetchTables={fetchTables} tables={tables} />
      <OrderComponent fetchOrders={fetchOrders} orders={orders} tables={tables} />
      <ResourceComponent fetchResources={fetchResources} resources={resources} />
      <OrderResourceComponent
        fetchOrderResources={fetchOrderResources}
        orderResources={orderResources}
        orders={orders}
        resources={resources} />
      <DayComponent fetchDays={fetchDays} days={days} />
    </>
  )
}
export default App
