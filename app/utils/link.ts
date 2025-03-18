export function isExternalLink(to: string) {
  return to.startsWith('http')
}

/**
 * 如果是外部链接，打开新窗口
 */
export function getBlankTarget(to: string) {
  return isExternalLink(to) ? '_blank' : undefined
}
