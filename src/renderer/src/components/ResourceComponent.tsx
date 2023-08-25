import { ChangeEvent, useState } from "react"
import { IResource } from "../App"

interface ResourceComponentProps {
  fetchResources: () => void
  resources: IResource[]
}

const ResourceComponent = ({ fetchResources, resources }: ResourceComponentProps): JSX.Element => {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<number>()

  const createResource =async (): Promise<void> => {
    if (price) await window.resourceApi.createResource(name, price)
    setName("")
    setPrice(undefined)
    fetchResources()
  }

  const updateResource = async (
    id: number,
    newName: string,
    newPrice: number,
    newAmount: number
  ) => {
    await window.resourceApi.updateResource(id, newName, newPrice, newAmount)
    fetchResources()
  }

  const deleteResource =async (id:number) => {
    await window.resourceApi.deleteResource(id)
    fetchResources()
  }

  return (
    <>
      <h1>Resource Management</h1>
      <div>
        <h2>Create Resource</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setPrice(parseInt(e.target.value))}
        />
        <button onClick={createResource}>Create</button>
      </div>
      <div>
        <h2>Resources</h2>
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>
              {resource.id}, {resource.name}, {resource.price}, {resource.amount}
              <> </>
              <button onClick={(): Promise<void> => updateResource(resource.id, resource.name, resource.price, 3)} >
                Update
              </button>
              <button onClick={(): Promise<void> => deleteResource(resource.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default ResourceComponent
