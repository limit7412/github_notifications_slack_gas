import { GithubNotifications, GithubSubject, GithubComment, SlackAttachments } from './models'

export class GithubRepository {
  auth: string
  constructor(token: string) {
    this.auth = `token ${token}`
  }

  getNotifications(): GithubNotifications[] {
    try {
      const response = UrlFetchApp.fetch("https://api.github.com/notifications", {
        "method": "get",
        "headers": { "Authorization": this.auth },
        "muteHttpExceptions": true
      })
      Logger.log(`notifications body: ${response.getContentText()}`)
      if (response.getResponseCode() >= 500) {
        Logger.log(`return server error from api`)
        return []
      }

      return JSON.parse(response.getContentText())
    } catch (error) {
      // NOTE: github api occasionally return Unexpected error (rate of occurrence: 0.04%)
      Logger.log(`failed to get github notifications: ${error.message}`)
      return []
    }
  }

  getComment(subject: GithubSubject): GithubComment {
    const url = subject.latest_comment_url != null ? subject.latest_comment_url : subject.url
    Logger.log(`comment url: ${url}`)
    if (url === "") {
      return JSON.parse("{}")
    }

    const response = UrlFetchApp.fetch(url, {
      "method": "get",
      "headers": { "Authorization": this.auth },
      "muteHttpExceptions": true
    })
    Logger.log(`comment body: ${response.getContentText()} `)
    if (response.getResponseCode() >= 500) {
      Logger.log(`return server error from api`)
      return JSON.parse("{}")
    }

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