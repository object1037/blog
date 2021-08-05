# blog

My blog

## 執筆用スクリプト

```fish
#!/usr/local/bin/fish

read --prompt='printf \'\\033[1;32m%s\\033[m\\033[1m%s\\033[m\\n\' \' ? \' \'Title : \'' title
read --prompt='printf \'\\033[1;32m%s\\033[m\\033[1m%s\\033[m\\n\' \' ? \' \'Description : \'' description

cd $HOME/blog

echo 'export const meta = {
  title: "'$title'",
  description: "'$description'",
  date: "'(date +%Y%m%d)'",
  tags: [""]
}
import ArticleLayout from "../../components/articleLayout"
//import Im from "../../components/im"
//import TweetEmbed from "react-tweet-embed"
//import imageName from "../../public/images/'(date +%Y%m%d)'/imageName.jpg"



export default ({ children }) => <ArticleLayout meta={meta}>{children}</ArticleLayout>' > pages/posts/(date +%Y%m%d).mdx

open -a "Visual Studio Code" pages/posts/(date +%Y%m%d).mdx

open 'http://localhost:3000/posts/'(date +%Y%m%d)

npm run dev
```