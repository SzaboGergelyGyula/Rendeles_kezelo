import { useContext, useEffect, useState } from 'react'
import TablesComponent from './components/TablesComponent'
import OrderComponent from './components/OrderComponent'
import ResourceComponent from './components/ResourceComponent'
import OrderResourceComponent from './components/OrderResourceComponent'
import DayComponent from './components/DayComponent'
import MainScreen from './components/MainScreen'
import OrderingPage from './components/OrderingPage'
import { GlobalContext, GlobalContextType } from './components/context/GlobalContext'

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
  // const [tables, setTables] = useState<ITable[]>([])
  // const [orders, setOrders] = useState<IOrder[]>([])
  // const [resources, setResources] = useState<IResource[]>([])
  // const [orderResources, setOrderResources] = useState<IOrderResource[]>([])
  // const [days, setDays] = useState<IDay[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [tableId, setTableId] = useState<number>()
  const [orderId, setOrderId] = useState<number>()


  const {
    tables,
    orders,
    resources,
    orderResources,
    days,
    fetchTables,
    fetchOrders,
    fetchResources,
    fetchOrderResources
  } = useContext(GlobalContext) as GlobalContextType

  // const fetchTables = async (): Promise<void> => {
  //   const response = await window.tableApi.getAllTables()
  //   if (response.success) {
  //     setTables(response.tables)
  //   }
  // }

  // const fetchOrders = async (): Promise<void> => {
  //   const response = await window.orderApi.getAllOrders()
  //   if (response.success) {
  //     setOrders(response.orders)
  //   }
  // }

  // const fetchResources = async (): Promise<void> => {
  //   const response = await window.resourceApi.getAllResources()
  //   if (response.success) {
  //     setResources(response.resources)
  //   }
  // }

  // const fetchOrderResources =async (): Promise<void> => {
  //   const response = await window.orderResourceApi.getAllOrderResources()
  //   if (response.success) {
  //     setOrderResources(response.orderResources)
  //   }
  // }

  // const fetchDays = async (): Promise<void> => {
  //   const response = await window.dayApi.getAllDays()
  //   if (response.success) {
  //     setDays(response.days)
  //   }
  // }

  // useEffect(() => {
  //   fetchTables()
  //   fetchOrders()
  //   fetchResources()
  //   fetchOrderResources()
  //   fetchDays()
  // }, [])

  useEffect(() => {
    findOrder()
  }, [tableId])

  const findOrder = () => {
    const foundOrder = orders.find(order => order.table_id === tableId)
    if (foundOrder) {
      setOrderId(foundOrder.id)
    }
    else {
      setOrderId(undefined)
    }
  }

  console.log("render")

  if (pageNumber === 1) {
    return (
      <OrderingPage
        setPageNumber={setPageNumber}
        tableId={tableId}
        orderId={orderId}
        setOrderId={setOrderId}
        setTableId={setTableId}
      />
    )
  }
  if (pageNumber === 2) {
    return (
      <ResourceComponent setPageNumber={setPageNumber} />
    )
  }
  if (pageNumber === 3) {
    return (
      <TablesComponent setPageNumber={setPageNumber}/>
    )
  }
  else {
    return (
      <>
        <MainScreen
          setPageNumber={setPageNumber}
          setTableId={setTableId}
          tableId={tableId}
          orderId={orderId}
          setOrderId={setOrderId}
        />
        {/* <h1 className="text-3xl font-bold underline">
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
      <DayComponent fetchDays={fetchDays} days={days} /> */}
      </>
    )
  }
}
export default App
