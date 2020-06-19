const path = require('path')
const spawn = require('cross-spawn')

function defaultTransformer(timestamp, lang, dateOptions) {
  return new Date(timestamp).toLocaleString(lang, dateOptions)
}

function getGitCreatedTimeStamp(filePath) {
  let created
  try {
    const gitLog = spawn.sync(
      'git',
      ['log', '--format=%at', '--reverse', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString('utf-8')
    if (gitLog) {
      [created] = gitLog.split(/\n/)
      created = parseInt(created) * 1000
    }
  } catch (e) { /* do not handle for now */ }
  return created
}

module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-created',
  extendPageData($page) {
    const { transformer, dateOptions } = options
    const timestamp = getGitCreatedTimeStamp($page._filePath)
    const $lang = $page._computed.$lang
    if (timestamp) {
      const created = typeof transformer === 'function'
        ? transformer(timestamp, $lang)
        : defaultTransformer(timestamp, $lang, dateOptions)
      $page.created = created
    } else {
      $page.created = $page.frontmatter.created
    }
  }
})
