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
$ claspopen
```

## 環境変数的なやつ
  - ファイル -> プロジェクトのプロパティ -> スクリプトのプロパティ

```
github_user: githubのbasic認証のユーザー名
github_token: githubのbasic認証のパスワード
slack_webhook: webhokのurl
```