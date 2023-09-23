import { Dispatch, SetStateAction } from "react"
import { IOrder, IOrderResource, IResource, ITable } from "../App"
import ListComponent from "./ListComponent"

interface MainScreenProps {
  tables: ITable[]
  setPageNumber: Dispatch<SetStateAction<number>>
  setTableId: Dispatch<SetStateAction<number | undefined>>
  tableId: number | undefined
  orderResources: IOrderResource[]
  resources: IResource[]
  orderId: number | undefined
  orders: IOrder[]
  setOrderId: Dispatch<SetStateAction<number | undefined>>
}

const MainScreen = ({ tables, setPageNumber, setTableId, tableId, orderResources, resources, orderId, orders, setOrderId }: MainScreenProps) => {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-3/4">
          <div className="grid gap-5 grid-cols-3 p-5 w-9/12">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setPageNumber(2)}>Leltár</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setPageNumber(3)}>Asztalok kezelése</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Napok</button>
          </div>
          <div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tables.map((table) => (
                <li key={table.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                  <button onClick={() => { setTableId(table.id)}} onDoubleClick={() => {setPageNumber(1)}} className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">{table.name}</h3>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/4">
          <div className="grid gap-5 grid-cols-2 pr-5 pt-5 pb-5">
            {tableId ?
              <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setPageNumber(1)}>Szerkeszt</button>
              :
              <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" disabled>Szerkeszt</button>
          }
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Fizet</button>
          </div>
          <div>
            <h3 className="text-3xl font-bold">
              {tables.find((table) => table.id === tableId)?.name}
            </h3>
            <div>
              <ListComponent
                orderResources={orderResources}
                resources={resources}
                orderId={orderId}
                tableId={tableId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainScreen
