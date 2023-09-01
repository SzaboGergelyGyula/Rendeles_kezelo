import { IDay } from "../App"

interface DayComponentProps {
  fetchDays: () => void
  days: IDay[]
}

const DayComponent = ({ fetchDays, days }: DayComponentProps): JSX.Element => {

  const createDay = async (): Promise<void> => {
    const date = new Date()
    await window.dayApi.createDay(date)
    fetchDays()
  }

  const updateDay = async (
    id: number,
    open: Date,
    close?: Date,
    summary?: number
  ) => {
    await window.dayApi.updateDay(id, open, close, summary)
    fetchDays()
  }

  const deleteDay =async (id:number) => {
    await window.dayApi.deleteDay(id)
    fetchDays()
  }

  return (
    <>
      <h1>Day Management</h1>
      <div>
        <h2>Create Day</h2>
        <button onClick={createDay}>
          Create Day Button
        </button>
      </div>
      <div>
        <h2>Days</h2>
        <ul>
          {days.map((day) => (
            <li key={day.id}>
              {day.id}, {day.open.toString()}, {day.close?.toString()}, {day.summary}
              <> </>
              <button onClick={(): Promise<void> => updateDay(day.id, day.open, new Date(), 45678)}>
                Update
              </button>
              <> </>
              <button onClick={(): Promise<void> => deleteDay(day.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default DayComponent
