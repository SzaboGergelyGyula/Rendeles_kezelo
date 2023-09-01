import { ipcMain } from 'electron'
import { db } from '../index'
import { ICreateDayArgs, IDeleteDayArgs, IUpdateDayArgs } from '../../preload/interfaces/day'

ipcMain.handle('create-day', (event, args: ICreateDayArgs) => {
  const { open, close, summary } = args
  const sql = `INSERT INTO "days" (open, close, summary) VALUES (?, ?, ?)`
  const values = [open, close || null, summary || null]

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

ipcMain.handle('get-all-days', (event) => {
  const sql = 'SELECT * FROM days'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, days: rows })
      }
    })
  })
})

ipcMain.handle('update-day', async (event, args: IUpdateDayArgs) => {
  const { id, open, close, summary } = args
  const sql = `UPDATE days SET open = ?, close = ?, summary = ? WHERE id = ?`
  const values = [open, close, summary, id]

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

ipcMain.handle('delete-day', async (event, args: IDeleteDayArgs) => {
  const { id } = args
  const sql = 'DELETE FROM days WHERE id = ?'

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
