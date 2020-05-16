# github_notifications_slack_gas
GitHubの通知をslackのwebhookに通知してくれるやつ。
下記のリポジトリの移植なのでtypescriptとしてはガバがあるかも…
  - https://github.com/limit7412/github_notifications_slack

## setup
```
$ yarn
$ npm i @google/clasp -g
$ clasp login
$ clasp create
? Create which script? standalone
$ clasp push
$ clasp open
```

## 環境変数的なやつ
  - ファイル -> プロジェクトのプロパティ -> スクリプトのプロパティ

```
github_token: githubのPersonal access tokens
slack_webhook: webhookのurl
```