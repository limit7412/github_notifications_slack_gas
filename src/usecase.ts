import { SpreadsheetRepository, GithubRepository, SlackRepository } from './repository'

export class CheckUsecase {
  checkNotifications() {
    const shRepo = new SpreadsheetRepository()
    const githubRepo = new GithubRepository(
      shRepo.getEnvByKey('github_user'),
      shRepo.getEnvByKey('github_token')
    )
    const slackRepo = new SlackRepository(shRepo.getEnvByKey('slack_webhook'))

    const notifications = githubRepo.getNotifications()
    notifications
      .forEach(item => {
        const comment = githubRepo.getComment(item.subject)
        const mention = [
          "assign",
          "author",
          "comment",
          "invitation",
          "mention",
          "team_mention",
          "review_requested",
        ].indexOf(item.reason) >= 0 ? "<!here> " : ""

        const subject = `[${item.subject.type}] notice from github.`
        slackRepo.sendPost({
          fallback: subject,
          author_name: comment.user != null ? comment.user.login : "",
          author_icon: comment.user != null ? comment.user.avatar_url : "",
          author_link: comment.user != null ? comment.user.html_url : "",
          pretext: `${mention}${subject}`,
          color: '#A9D0F5',
          title: item.subject.title,
          title_link: comment.html_url,
          text: comment.body,
          footer: item.repository != null ? item.repository.full_name : "github",
          footer_icon: item.repository != null ? item.repository.owner.avatar_url : "",
        })
      })

    if (notifications.length > 0) {
      // githubRepo.notificationToRead()
      Logger.log('put notifications')
    }
  }
}