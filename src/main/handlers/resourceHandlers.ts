import { ipcMain } from 'electron'
import { db } from '../index'
import {
  ICreateResourceArgs,
  IDeleteResourceArgs,
  IUpdateResourceArgs
} from '../../preload/interfaces/resource'

ipcMain.handle('create-resource', (event, args: ICreateResourceArgs) => {
  const { name, price, amount } = args
  const sql = `INSERT INTO "resource" (name, price, amount) VALUES (?, ?, ?)`
  const values = [name, price, amount || null]

  return new Promise((resolve) => {
    db.run(sql, values, (err) => {
      if (err) {
        console.log(err.message)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('get-all-resources', (event) => {
  const sql = 'SELECT * FROM resource'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, resources: rows })
      }
    })
  })
})

ipcMain.handle('update-resource', async (event, args: IUpdateResourceArgs) => {
  const { id, newName, newPrice, newAmount } = args
  const sql = `UPDATE resource SET name = ?, price = ?, amount = ? WHERE id = ?`
  const values = [newName, newPrice, newAmount || null, id]

  return new Promise((resolve) => {
    db.run(sql, values, (err) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('delete-resource', async (event, args: IDeleteResourceArgs) => {
  const { id } = args
  const sql = 'DELETE FROM resource WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [id], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})
