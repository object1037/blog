import { type Env } from 'env'
import { Authenticator } from 'remix-auth'
import { GitHubStrategy } from 'remix-auth-github'

import { getSessionStrage } from './session.server'

type User = {
  id: string
  name: string
}

let authenticator: Authenticator<User> | undefined

export function getAuthenticator(env: Env) {
  if (authenticator) {
    return authenticator
  }
  const sessionStrage = getSessionStrage(env)
  authenticator = new Authenticator(sessionStrage)
  const githubStrategy = new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.CALLBACK_URL,
    },
    async ({ accessToken, extraParams, profile }) => {
      return { id: profile.id, name: profile.displayName }
    },
  )

  authenticator.use(githubStrategy)

  return authenticator
}
