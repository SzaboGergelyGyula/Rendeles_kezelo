import { ipcMain } from 'electron'
import { db } from '../index'
import {
  ICreateOrderArgs,
  IDeleteOrderArgs,
  IUpdateOrderArgs
} from '../../preload/interfaces/order'

ipcMain.handle('create-order', (event, args: ICreateOrderArgs) => {
  const { table_id, discount, payed } = args
  const sql = `INSERT INTO "orders" (table_id, discount_value, payed) VALUES (?, ?, ?)`
  const values = [table_id, discount || null, payed || null]

  return new Promise((resolve) => {
    db.run(sql, values, (err) => {
      if (err) {
        console.log(err.message)
        resolve({ success: false, error: err.message })
      } else {
        console.log('success')
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('get-all-orders', (event) => {
  const sql = 'SELECT * FROM orders'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, orders: rows })
      }
    })
  })
})

ipcMain.handle('update-order', async (event, args: IUpdateOrderArgs) => {
  const { id, newTableId, newDiscount, newPayed } = args
  console.log(id, newTableId, newDiscount, newPayed)
  const sql = `UPDATE orders SET table_id = ?, discount_value = ?, payed = ? WHERE id = ?`
  const values = [newTableId, newDiscount || null, newPayed || null, id]

  return new Promise((resolve) => {
    db.run(sql, values, (err) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        console.log('success')
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('delete-order', async (event, args: IDeleteOrderArgs) => {
  const { id } = args
  const sql = 'DELETE FROM orders WHERE id = ?'

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
