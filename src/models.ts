export type GithubNotifications = {
  subject: GithubSubject,
  reason: string,
  repository: GithubRepositorys,
  subscription_url: string,
}

export type GithubSubject = {
  type: string,
  title: string,
  url: string,
  latest_comment_url: string
}

export type GithubRepositorys = {
  full_name: string,
  html_url: string,
  owner: GithubUser,
}

export type GithubComment = {
  user: GithubUser,
  html_url: string,
  body: string,
}

export type GithubUser = {
  login: string,
  avatar_url: string,
  html_url: string,
}

export type SlackAttachments = {
  fallback: string,
  author_name: string,
  author_icon: string,
  author_link: string,
  pretext: string,
  color: string,
  title: string,
  title_link: string,
  text: string,
  footer: string,
  footer_icon: string,
}