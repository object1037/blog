interface tocElement {
  scrollPos: number,
  title: string,
  level: string,
  childEls: tocElement[]
}

interface postData {
  title: string,
  description: string,
  date: string,
  tags: string[],
  ogImgUrl?: string
}

interface tagData {
  name: string,
  articles: metaData[]
}