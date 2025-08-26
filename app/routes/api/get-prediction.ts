import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { requireAuth } from '../../middlewares/requireAuth'

export const POST = createRoute(
  requireAuth,
  vValidator(
    'json',
    v.object({
      content: v.string(),
    }),
  ),
  async (c) => {
    const { content } = c.req.valid('json')
    const systemPrompt = `あなたはブログ執筆を支援するアシスタントです．
Markdownで書かれた本文が与えられるので，文体やトーンを考慮して適切な続きの文章を生成してください．
要約などではなく，ユーザーが書いているような文章の続きのみを生成してください．
文章はMarkdown形式で出力してください．
`

    const response = await c.env.AI.run(
      '@cf/meta/llama-4-scout-17b-16e-instruct',
      {
        prompt: `${systemPrompt}\n\ncontent:\n${content}`,
        max_tokens: 10,
      },
    )

    return c.json(response)
  },
)
