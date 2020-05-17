import { GithubNotifications, GithubSubject, GithubComment, SlackAttachments } from './models'

export class GithubRepository {
  auth: string
  constructor(token: string) {
    this.auth = `token ${token}`
  }

  getNotifications(): GithubNotifications[] {
    const response = UrlFetchApp.fetch("https://api.github.com/notifications", {
      "method": "get",
      "headers": { "Authorization": this.auth },
      "muteHttpExceptions": true
    })
    Logger.log(`notifications body: ${response.getContentText()}`)

    return JSON.parse(response.getContentText())
  }

  getComment(subject: GithubSubject): GithubComment {
    const url = subject.latest_comment_url != null ? subject.latest_comment_url : subject.url
    Logger.log(`comment url: ${url}`)
    const response = UrlFetchApp.fetch(url, {
      "method": "get",
      "headers": { "Authorization": this.auth },
      "muteHttpExceptions": true
    })
    Logger.log(`comment body: ${response.getContentText()} `)

    return JSON.parse(response.getContentText())
  }

  notificationToRead() {
    UrlFetchApp.fetch("https://api.github.com/notifications", {
      "method": "put",
      "headers": { "Authorization": this.auth },
      "muteHttpExceptions": true
    })
  }
}

export class SlackRepository {
  url: string
  constructor(url: string) {
    this.url = url
  }

  sendPost(post: SlackAttachments) {
    UrlFetchApp.fetch(this.url, {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify({
        attachments: [post],
      }),
      "muteHttpExceptions": true
    })
  }
}