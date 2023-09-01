import { useState } from 'react'
import { IOrder, ITable } from '../App'

interface OrderComponentProps {
  fetchOrders: () => void
  orders: IOrder[]
  tables: ITable[]
}

const OrderComponent = ({ fetchOrders, orders, tables }: OrderComponentProps): JSX.Element => {
  const [tableId, setTableId] = useState<number>()

  const createOrder = async (): Promise<void> => {
    console.log(tableId)
    if (tableId) await window.orderApi.createOrder(tableId)
    setTableId(undefined)
    fetchOrders()
  }

  const updateOrder = async (
    id: number,
    newTableId: number,
    newDiscountValue: number,
    newPayed: Date
  ) => {
    await window.orderApi.updateOrder(id, newTableId, newDiscountValue, newPayed)
    fetchOrders()
  }

  const deleteOrder =async (id:number) => {
    await window.orderApi.deleteOrder(id)
    fetchOrders()
  }

  return (
    <div>
      <h1>Order Management</h1>
      <div>
        <h2>Create Order</h2>
        <select
          name="table"
          value={tableId ? tableId : 'default'}
          onChange={(e) => {
            setTableId(parseInt(e.target.value))
          }}
        >
          <option value="default" disabled>
            Choose one
          </option>
          {tables
            ? tables.map((table) => (
                <option value={table.id} key={table.id}>
                  {table.name}
                </option>
              ))
            : null}
        </select>
        <button onClick={createOrder}>Create </button>
      </div>
      <div>
        <h2>Orders</h2>
        <ul>
          {orders ? (
            orders.map((order) => (
              <li key={order.id}>
                {order.id}, {order.table_id}, {order.discount_value}%, {order.payed?.toString()}
                <> </>
                <button onClick={(): Promise<void> => updateOrder(order.id, order.table_id, 20, new Date())}>
                  Update
                </button>
                <> </>
                <button onClick={(): Promise<void> => deleteOrder(order.id)}>Delete</button>
              </li>
            ))) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  )
}
export default OrderComponent
