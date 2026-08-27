/**
 * 聚合入口：一行 widgets.js 引入全部组件的 Web Component。
 * 被 scripts/cdn.mjs 用 esbuild 打包为 cdn/widgets.js。
 *
 * 注意：必须用「有绑定的导入」并显式引用，否则 esbuild 会因包的
 * sideEffects 配置将「导入即注册」的模块当无副作用整棵摇掉。
 */
import { FloatingQRElement } from '../packages/floating-qr/src/web-component'
import { FloatingModalElement } from '../packages/floating-modal/src/web-component'
import { UserAvatarElement } from '../packages/user-avatar/src/web-component'
import { SiteNavbarElement } from '../packages/site-navbar/src/web-component'

void FloatingQRElement
void FloatingModalElement
void UserAvatarElement
void SiteNavbarElement
