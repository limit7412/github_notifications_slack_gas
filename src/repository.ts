import { GithubNotifications, GithubSubject, GithubComment } from './models'

export class SpreadsheetRepository {
  getEnvByKey(key: string): string {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName('env')
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

export class GithubRepository {
  auth: string
  constructor(user: string, token: string) {
    this.auth = `Basic ${Utilities.base64Encode(`${user}:${token}`)}`
  }

  getNotifications(): GithubNotifications[] {
    const response = UrlFetchApp.fetch("https://api.github.com/notifications?all=true&since=2019-10-01T23:39:01Z", {
      "method": "get",
      "headers": { "Authorization": this.auth },
      "muteHttpExceptions": true
    })

    return JSON.parse(response.getContentText())
  }

  getComment(subject: GithubSubject): GithubComment {
    const url = subject.latest_comment_url != null ? subject.latest_comment_url : subject.url
    const response = UrlFetchApp.fetch(url, {
      "method": "get",
      "headers": { "Authorization": this.auth },
      "muteHttpExceptions": true
    })

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

  sendPost(post) {
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