import React, { useState } from 'react'
import './App.css'
import FlashCardList from './FlashCardList'

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS)
  return (
    <FlashCardList flashCards = {flashCards}/>
  )
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2?",
    answer: "4",
    options: [
      "2",
      "3",
      "4",
      "5"
    ]
  },
  {
    id: 2,
    question: "What is Aphrodite known for?",
    answer: "love and fertility",
    options: [
      "intelligence",
      "love and fertility",
      "art",
      "cooking"
    ]
  },
  {
    id: 3,
    question: "What were Van Gogh's last words?",
    answer: "The sadness will last for ever",
    options: [
      "The sadness will last for ever",
      "We only feel deep deep passion",
      "Art saves",
      "I loved her"
    ]
  }
]

export default App;
