#!/usr/local/bin/fish

echo $argv|read title

echo '---
title: "'$title'" description: ""
---

export const meta = {
  title: "'$title'",
  date: "'(date +%Y%m%d)'"
}

import Layout from "../../components/layout"
import Im from "../../components/im"



export default ({ children }) => <Layout meta={meta}>{children}</Layout>' > pages/posts/(date +%Y%m%d).mdx

open -a "Visual Studio Code" pages/posts/(date +%Y%m%d).mdx

npm run dev