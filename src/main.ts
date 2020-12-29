import { CheckUseCase } from './usecase'

function myFunction() {
  Logger.log('start script.')
  const uc = new CheckUseCase()
  uc.checkNotifications()
  Logger.log('finish script.')
}