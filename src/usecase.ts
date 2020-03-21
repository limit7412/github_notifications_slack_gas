import { SpreadsheetRepository } from './repository'

export class CheckUsecase {
  shRepo: SpreadsheetRepository

  constructor() {
    this.shRepo = new SpreadsheetRepository()
  }
  checkNotifications(): boolean {

    const hoge = this.shRepo.getEnvByKey('slack_webhook')
    Logger.log(hoge)
    return false
  }
}