#!/usr/local/bin/fish

echo '---
title: "" description: ""
---

export const meta = {
  title: "",
  date: "'(date +%Y/%m/%d)'"
}

import Layout from "../../components/layout"


export default ({ children }) => <Layout meta={meta}>{children}</Layout>' > pages/posts/(date +%Y%m%d).mdx

open -a "Visual Studio Code" pages/posts/(date +%Y%m%d).mdx