import { useEffect, useState } from 'react'
import TablesComponent from './components/TablesComponent'

export interface ITable {
  id: number
  name: string
}

function App(): JSX.Element {
  const [tables, setTables] = useState<ITable[]>([])

  const fetchTables = async (): Promise<void> => {
    const response = await window.tableApi.getAllTables()
    if (response.success) {
      setTables(response.tables)
    }
  }

  useEffect(() => {
    fetchTables()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Electron-Vite React Tailwind Sqlite3 Example base
      </h1>
      <TablesComponent fetchTables={fetchTables} tables={tables} />
    </>
  )
}

export default App
