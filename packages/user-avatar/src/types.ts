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
  /** 后端统一头像地址（/api/avatar/{openid}，后端代理/生成，恒可解析出图片） */
  avatarUrl: string | null
  authenticatedAt: string
  /** 用户序号（本站第 N 位注册用户），后端按注册顺序分配 */
  userSeq: number | null
  status: string
  role: string
  vipExpiresAt: string | null
  isAdmin: boolean
  github: WxAuthGithubInfo | null
}