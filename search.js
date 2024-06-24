import 'dotenv/config'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'

const movies = [
  {
    id: 1,
    title: 'Stepbrother',
    description: `Comedic journey full of adult humor and awkwardness.`,
  },
  {
    id: 2,
    title: 'The Matrix',
    description: `Deals with alternate realities and questioning what's real.`,
  },
  {
    id: 3,
    title: 'Shutter Island',
    description: `A mind-bending plot with twists and turns.`,
  },
  {
    id: 4,
    title: 'Memento',
    description: `A non-linear narrative that challenges the viewer's perception.`,
  },
  {
    id: 5,
    title: 'Doctor Strange',
    description: `Features alternate dimensions and reality manipulation.`,
  },
  {
    id: 6,
    title: 'Paw Patrol',
    description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
  },
  {
    id: 7,
    title: 'Interstellar',
    description: `Features futuristic space travel with high stakes`,
  },
]

/**
 * the code maps over the movies array and converts each movie into a Document.
 * Each Document contains the movie's title and description as its content, along with some metadata.
 * These documents are then used to create a semantic store using the MemoryVectorStore and OpenAIEmbeddings.
 * This store enables similarity-based searches on its content.
 */

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.description}`,
          metadata: { source: movie.id, title: movie.title },
        })
    ),
    new GoogleGenerativeAIEmbeddings({ apiKey: process.env.API_KEY })
  )

export const search = async (query, count = 1) => {
  const store = await createStore()
  return store.similaritySearch(query, count)
}

console.log(await search('give me a movie about alternate realities'))
