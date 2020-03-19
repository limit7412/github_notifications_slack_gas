

export class SpreadsheetRepository {
  id: string

  constructor(id: string) {
    this.id = id
  }

  findValueByKey(key: string): string {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName('other')
    const rows = sheet
      .getDataRange()
      .getValues()

    let val: string
    for (const row of rows) {
      val = row[1]
      if (row[0] === key) {
        break
      }
    }

    return val
  }
}