import { useState } from "react"
import { IOrder, IOrderResource, IResource } from "../App"

interface OrderResourceComponentProps {
  fetchOrderResources: () => void
  orderResources: IOrderResource[]
  orders: IOrder[]
  resources: IResource[]
}

const OrderResourceComponent = ({fetchOrderResources, orderResources, orders, resources}: OrderResourceComponentProps): JSX.Element => {
  const [orderId, setOrderId] = useState<number>()
  const [resourceId, setResourceId] = useState<number>()

  const createOrderResource = async (): Promise<void> => {
    if (orderId && resourceId) await window.orderResourceApi.createOrderResource(orderId, resourceId, 2)
    setOrderId(undefined)
    setResourceId(undefined)
    fetchOrderResources()
  }

  const updateOrderResource = async (
    order_id: number,
    resource_id: number,
    amount?: number
  ) => {
    await window.orderResourceApi.updateOrderResource(order_id, resource_id, amount)
    fetchOrderResources()
  }

  const deleteOrderResource = async (
    order_id: number,
    resource_id: number
  ) => {
    await window.orderResourceApi.deleteOrderResource(order_id, resource_id)
    fetchOrderResources()
  }

  console.log(orderResources)

  return (
    <div>
      <h1>Order-Resource Management</h1>
      <div>
        <h2>Create Order-Resource</h2>
        <select
          name="order"
          value={orderId ? orderId : 'default'}
          onChange={(e) => {
            setOrderId(parseInt(e.target.value))
          }}
        >
          <option value='default' disabled>
            Choose Order
          </option>
          {orders ? orders.map((order) => (
              <option value={order.id} key={order.id}>
                {order.id}
              </option>
            ))
            : null
          }
        </select>
        <select
          name="resource"
          value={resourceId ? resourceId : "default"}
          onChange={(e) => {
            setResourceId(parseInt(e.target.value))
          }}
        >
          <option value="default" disabled>
            Choose Resource
          </option>
          {resources
            ? resources.map((resource) => (
              <option value={resource.id} key={resource.id}>
                {resource.name}
              </option>
            )): null
          }
        </select>
        <button onClick={createOrderResource}>Create</button>
      </div>
      <div>
        <h2>Order-Resources</h2>
        <ul>
          {orderResources ? (
            orderResources.map((orderResource, index) => (
              <li key={index}>
                {orderResource.order_id}, {orderResource.resource_id}, {orderResource.amount} db
                <> </>
                <button onClick={(): Promise<void> => updateOrderResource(orderResource.order_id, orderResource.resource_id, 51)}>
                  Update
                </button>
                <> </>
                <button onClick={(): Promise<void> => deleteOrderResource(orderResource.order_id, orderResource.resource_id)}>
                  Delete
                </button>
              </li>
            ))
          ) : (<></>)}
        </ul>
      </div>
    </div>
  )
}

export default OrderResourceComponent
