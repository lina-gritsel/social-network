interface Source {
    id: string | null
    name: string
  }
  
  export interface NewsInfo {
    source: Source
    author: string | null
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
  }
  