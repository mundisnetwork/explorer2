export function isLetterOrSign(char) {
  return (
    char.length === 1 &&
    char.match(/[a-z0-9 \.,&\[\]{}\\/\(\)*^%$#@!":';`~<>|\-=_+?]/i)
  )
}
