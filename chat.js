import readline from 'node:readline'
import { formatMessage, newMessage } from './helpers.js'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const chat = () => {
  const history = [
    {
      role: 'system',
      content: 'you are an AI assistant. answer the questions or else!',
    },
  ]

  const start = () => {
    rl.question('You: ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        rl.close()
        return
      }

      const message = formatMessage(userInput)
      const response = await newMessage(history, message)

      history.push(message, response)
      console.log(`\n\nAI: ${response.content}\n\n`)
      start()
    })
  }

  start()
}

console.log('Welcome to the AI chatbot. Type "exit" to quit the chat.')
chat()
