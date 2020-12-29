import { GithubRepository, SlackRepository } from './repository'
import { SlackAttachments } from './models'

export class CheckUseCase {
  checkNotifications() {
    const property = PropertiesService.getScriptProperties()
    const githubRepo = new GithubRepository(property.getProperty('github_token'))

    const notifications: SlackAttachments[] = githubRepo
      .getNotifications()
      .map(item => {
        const comment = githubRepo.getComment(item.subject)
        const mention = [
          "assign",
          "author",
          "comment",
          "invitation",
          "mention",
          "team_mention",
          "review_requested",
          "ci_activity"
        ].indexOf(item.reason) >= 0 ? "<!here> " : ""

        const subject = `[${item.subject.type}] notice from github.`

        return {
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
        }
      })

    if (notifications.length > 0) {
      const slackRepo = new SlackRepository(property.getProperty('slack_webhook'))
      slackRepo.sendPost(notifications)

      githubRepo.notificationToRead()
    }
  }
}