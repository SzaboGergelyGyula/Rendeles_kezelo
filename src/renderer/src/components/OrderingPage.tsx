import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import ListComponent from "./ListComponent"
import { GlobalContext, GlobalContextType } from "./context/GlobalContext"

interface OrderingPageProps {
  setPageNumber: Dispatch<SetStateAction<number>>
  tableId: number | undefined
  orderId: number | undefined
  setOrderId: Dispatch<SetStateAction<number | undefined>>
  setTableId: Dispatch<SetStateAction<number | undefined>>
}

const OrderingPage = ({ setPageNumber, tableId, orderId, setOrderId, setTableId }: OrderingPageProps) => {
  const {
    resources,
    tables,
    orders,
    orderResources,
    fetchOrders,
    fetchOrderResources
  } = useContext(GlobalContext) as GlobalContextType

  useEffect(() => {
    if (!orders.find(order => order.table_id === tableId)) {
      if (tableId) {
        window.orderApi.createOrder(tableId)
      }
      fetchOrders()
    }
    else {
      const foundOrder = orders.find(order => order.table_id === tableId)
      if(foundOrder) setOrderId(foundOrder.id)
    }
  }, [tableId])

  const saveOrder = (resourceId: number) => {
    if (!orderResources.find((orderResource) => orderResource.order_id === orderId && orderResource.resource_id === resourceId)) {
      if( orderId) window.orderResourceApi.createOrderResource(orderId, resourceId, 1)
    }
    else {
      if( orderId) window.orderResourceApi.updateOrderResource(orderId, resourceId, 4)
    }
    fetchOrderResources()
  }

  return (
    <>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5" onClick={() => { setPageNumber(0); setOrderId(undefined), setTableId(undefined)}}>Vissza</button>
      </div>
      <div className="flex">
        <div className="w-3/4">
          <div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources?.map((resource) => (
                <li key={resource.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                  <button onClick={() => saveOrder(resource.id)} className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">{resource.name}</h3>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/4">
          <h3 className="text-3xl font-bold">
            {tables.find((table) => table.id === tableId)?.name}
          </h3>
          <ListComponent
            orderResources={orderResources}
            resources={resources}
            orderId={orderId}
            tableId={tableId}
          />
        </div>
      </div>

    </>
  )
}
export default OrderingPage
