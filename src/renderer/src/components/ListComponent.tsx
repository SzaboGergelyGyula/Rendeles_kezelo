import { useEffect, useState } from "react"
import { IOrderResource, IResource } from "../App"

interface ListComponentProps {
  orderResources: IOrderResource[]
  resources: IResource[]
  orderId: number | undefined
  tableId: number | undefined
}

const ListComponent = ({ orderResources, resources, orderId, tableId }: ListComponentProps) => {
  const [filteredOrderResources, setFilteredOrderResources] = useState<IOrderResource[]>([]);
  const [summary, setSummary] = useState<number>(0)

  useEffect(() => {
    const filtered = orderResources.filter((orderResource) => orderResource.order_id === orderId);
    setFilteredOrderResources(filtered);
    setSummary(0)
    // sumPayment()
  }, [orderResources, orderId]);

  useEffect(() => {
    sumPayment()
  }, [tableId, summary])

  const sumPayment = () => {
    let total = 0;
    for (const tableOrderResource of filteredOrderResources) {
      const resource = resources.find(resource => tableOrderResource.resource_id === resource.id);
      if (resource && tableOrderResource.amount) {
        total += resource.price * tableOrderResource.amount;
      }
    }
    setSummary(total);
  }

  return (
    <div>
      <ul>
        {filteredOrderResources.map((tableOrderResource, index) => (
          <li key={index}>
            <hr></hr>
              <div className="text-xl font-medium text-gray-900">
                {resources.find(resource => tableOrderResource.resource_id === resource.id)?.name}
              </div>
              <div>
                <div>
                  {resources.find(resource => tableOrderResource.resource_id === resource.id)?.price} Ft x{tableOrderResource.amount}
                </div>
                <div className="text-base font-bold">
                  {resources.find(resource => tableOrderResource.resource_id === resource.id)?.price * tableOrderResource.amount} Ft
                </div>
              </div>
            </li>
          ))}
      </ul>
      <hr></hr>
      <h1 className="text-3xl font-bold">
        {summary} Ft
      </h1>
    </div>
  )
}
export default ListComponent
