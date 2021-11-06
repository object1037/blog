const siteTitle = "ゆるふわインターネット"
const siteUrl = "https://blog.object1037.dev"
const handleName = "object1037"
const homepage = "https://object1037.dev"
const accounts = {
  twitter: "object1037",
  github: "object1037"
}
const getOgImageUrl = (title: string) => (
  encodeURI(`https://og-image.object1037.dev/${title}.png?fontSize=64px`)
)

export {
  siteTitle,
  siteUrl,
  handleName,
  homepage,
  accounts,
  getOgImageUrl
}