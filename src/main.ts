import { CheckUsecase } from './usecase'

function myFunction() {
  Logger.log('start script.')
  const uc = new CheckUsecase()
  const result = uc.checkNotifications()
  if (result) {
    Logger.log('falid script!')
  }
  Logger.log('finish script.')
}