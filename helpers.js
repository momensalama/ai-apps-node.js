import { groq } from './groqai.js'

export const newMessage = async (history, message) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [...history, message],
    model: 'llama3-8b-8192',
  })

  return chatCompletion.choices[0].message
}
export const formatMessage = (userInput) => ({
  role: 'user',
  content: userInput,
})
