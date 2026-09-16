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

/**
 * wx-auth 积分账本读数（GET /api/points/balance）。
 * 账本全站通用：余额、当日签到状态、广告加分管参数都由 wx-auth 下发，
 * 本组件只做展示——文案里的数字一律取这里的值，不在前端写死。
 */
export interface WxPointsInfo {
  /** 当前余额 */
  balance: number
  /** 今天（北京自然日）是否已签到 */
  checkedIn: boolean
  /** 看一次激励视频得几分 */
  adReward: number
  /** 每日签到发几分 */
  checkinReward: number
  /** 今日还能看几次广告赚分 */
  adsRemaining: number
}