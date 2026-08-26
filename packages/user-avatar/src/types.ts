/** wx-auth 后端 userinfo 接口返回的用户信息 */
export interface WxAuthGithubInfo {
  githubId: number
  login: string
  avatar: string | null
  boundAt: string
}

export interface WxUserInfo {
  openid: string
  unionid: string | null
  nickname: string | null
  headimgurl: string | null
  authenticatedAt: string
  status: string
  role: string
  vipExpiresAt: string | null
  isAdmin: boolean
  github: WxAuthGithubInfo | null
}