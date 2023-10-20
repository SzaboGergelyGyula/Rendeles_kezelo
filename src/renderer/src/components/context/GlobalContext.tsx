import { ReactNode, createContext, useEffect, useState } from "react";
import { IDay, IOrder, IOrderResource, IResource, ITable } from "../interfaces/interfaces";

export type GlobalContextType = {
  tables: ITable[]
  orders: IOrder[]
  resources: IResource[]
  orderResources: IOrderResource[]
  days: IDay[]
  fetchTables: () => void
  fetchOrders: () => void
  fetchResources: () => void
  fetchOrderResources: () => void
}

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [tables, setTables] = useState<ITable[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])
  const [resources, setResources] = useState<IResource[]>([])
  const [orderResources, setOrderResources] = useState<IOrderResource[]>([])
  const [days, setDays] = useState<IDay[]>([])

  useEffect(() => {
    fetchTables()
    fetchOrders()
    fetchResources()
    fetchOrderResources()
    fetchDays()
  }, [])

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

    return (
      <GlobalContext.Provider value={{
        tables,
        orders,
        resources,
        orderResources,
        days,
        fetchTables,
        fetchOrders,
        fetchResources,
        fetchOrderResources
      }}>
            {children}
      </GlobalContext.Provider>
  )
}
export const GlobalContext = createContext<GlobalContextType | null>(null)
export default GlobalContextProvider
