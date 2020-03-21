import { CheckUsecase } from './usecase'

function myFunction() {
  Logger.log('start script.')
  const uc = new CheckUsecase()
  uc.checkNotifications()
  Logger.log('finish script.')
}