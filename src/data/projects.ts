export type FeaturedProject = {
  /** GitHub 'owner/repo' — stars, language, and last-updated are pulled live at build time */
  repo: string
  /** Shown instead of the GitHub description (which is usually empty) */
  blurb: string
  /** Override the live-demo link if it's not set as the repo homepage on GitHub */
  live?: string
  /** npm package page, for published libraries */
  npm?: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    repo: 'princej02/tinystate',
    blurb: 'A small, typed state machine library for TypeScript, published on npm.',
    npm: 'https://www.npmjs.com/package/@prince_j/tinystate',
  },
  {
    repo: 'princej02/groq',
    blurb: 'A Go CLI for reading, filtering, and reformatting CSV files to table, Markdown, or CSV output.',
  },
  {
    repo: 'princej02/pomodoro',
    blurb: 'A Pomodoro timer built with React and TypeScript, with a live focus/break progress ring.',
    live: 'https://pomodoro.princej02-dev.workers.dev',
  },
  {
    repo: 'princej02/habitflow',
    blurb: 'A local-first CLI habit tracker in Go: streaks and completions, no cloud, no accounts.',
  },
  {
    repo: 'princej02/lever',
    blurb: 'A Go API for managing feature flags, backed by SQLite with Swagger docs.',
  },
]
