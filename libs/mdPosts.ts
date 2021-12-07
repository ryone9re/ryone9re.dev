import fs from 'fs'
import { join } from 'path'

import matter from 'gray-matter'

type Item = {
  slug: string
  content: string
  title: string
  date: string
  tags: string[]
}

const postsDirectory = join(process.cwd(), 'posts')

export const getPostSlugs = (): string[] => {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true })
  return allDirents.filter((dirent) => dirent.isDirectory()).map(({ name }) => name)
}

export const getPostBySlug = (slug: string, fields: string[] = []): Item => {
  const fullPath = join(postsDirectory, slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Item = {
    slug: '',
    content: '',
    title: '',
    date: '',
    tags: []
  }

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'title' || field === 'date' || field === 'tags') {
      items[field] = data[field]
    }
  })

  return items
}

export const getAllPosts = (fields: string[] = []): Item[] => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => {
      const slugA = a.slug.toString().toLowerCase()
      const slugB = b.slug.toString().toLowerCase()

      if (slugA >= slugB) {
        return 1
      } else {
        return -1
      }
    })

  return posts
}
