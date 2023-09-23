import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { ITable } from '../App'

interface TablesComponentProps {
  fetchTables: () => void
  tables: ITable[]
  setPageNumber: Dispatch<SetStateAction<number>>
}

const TablesComponent = ({ fetchTables, tables, setPageNumber }: TablesComponentProps): JSX.Element => {
  const [tableName, setTableName] = useState('')

  const createTable = async (): Promise<void> => {
    await window.tableApi.createTable(tableName)
    setTableName('')
    fetchTables()
  }

  const updateTable = async (id: number, newName: string): Promise<void> => {
    await window.tableApi.updateTable(id, newName)
    fetchTables()
  }

  const deleteTable = async (id: number): Promise<void> => {
    await window.tableApi.deleteTable(id)
    fetchTables()
  }
  return (
    <>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5" onClick={() => setPageNumber(0)}>Vissza</button>
      </div>
      <div>
        <h1>Table Management</h1>
        <div>
          <h2>Create Table</h2>
          <input
            type="text"
            placeholder="Name"
            value={tableName}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setTableName(e.target.value)}
          />
          <button onClick={createTable}>Create</button>
        </div>
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <h2>Tables</h2>
          <ul className="grid grid-cols-1 gap-6">
            {tables.map((table) => (
              <li key={table.id}>
                {table.id }, {table.name}
                <> </>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(): Promise<void> => updateTable(table.id, 'New Name')}>
                  Update
                </button>
                <> </>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={(): Promise<void> => deleteTable(table.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TablesComponent
