import { ChangeEvent, useState } from 'react'
import { ITable } from '../App'

interface TablesComponentProps {
  fetchTables: () => void
  tables: ITable[]
}

const TablesComponent = ({ fetchTables, tables }: TablesComponentProps): JSX.Element => {
  const [tableName, setTableName] = useState('')

  const createTable = async (): Promise<void> => {
    console.log(typeof tableName)
    await window.tableApi.createTable(tableName)
    setTableName('')
    fetchTables()
  }

  const updateTable = async (id: number, newName: string): Promise<void> => {
    // console.log(id)
    await window.tableApi.updateTable(id, newName)
    fetchTables()
  }

  const deleteTable = async (id: number): Promise<void> => {
    await window.tableApi.deleteTable(id)
    fetchTables()
  }
  return (
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
      <div>
        <h2>Tables</h2>
        <ul>
          {tables.map((table) => (
            <li key={table.id}>
              {table.name}
              <> </>
              <button onClick={(): Promise<void> => updateTable(table.id, 'New Name')}>
                Update
              </button>
              <> </>
              <button onClick={(): Promise<void> => deleteTable(table.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TablesComponent
