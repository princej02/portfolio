import { useState } from 'react'

type Post = {
  id: string
  data: {
    title: string
    description: string
    pubDate: Date
    section: 'dev' | 'gaming' | 'misc'
    readTime?: number
    draft: boolean
  }
}

type Props = {
  posts: Post[]
}

const sections = ['all', 'dev', 'gaming', 'misc'] as const

export default function Blog({ posts }: Props) {
  const [active, setActive] = useState<string>('all')

  const visibleSections = sections.filter(
    section => section === 'all' || posts.some(p => p.data.section === section)
  )

  const filtered = active === 'all'
    ? posts
    : posts.filter(p => p.data.section === active)

  return (
    <section id="blog" className="py-24 px-4">
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-xs tracking-widest uppercase text-text-muted">Writings</h2>
        <div className="flex gap-3 flex-wrap">
          {visibleSections.map(section => (
            <button
              key={section}
              onClick={() => setActive(section)}
              className={`text-xs tracking-widest uppercase transition-colors ${
                active === section
                  ? 'text-text'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-3">
        {filtered.map(post => (
          <li key={post.id}>
            <a
              href={`/blog/${post.id}`}
              className="inline-flex items-baseline gap-2 text-sm group"
            >
              <span className="group-hover:text-text-muted transition-colors">
                {post.data.title}
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-text-muted text-xs">
                {new Date(post.data.pubDate).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              {post.data.readTime && (
                <>
                  <span className="text-text-muted">·</span>
                  <span className="text-text-muted text-xs">
                    {post.data.readTime} min read
                  </span>
                </>
              )}
            </a>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-text-muted text-sm">No posts yet.</p>
      )}
    </section>
  )
}