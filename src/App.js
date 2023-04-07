import React, { useState, useEffect } from 'react'
import './App.css'
import FlashCardList from './FlashCardList'
import axios from 'axios'

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS)

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        setFlashCards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)), 
            answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
        console.log(res.data)
      })
  }, [])

  function decodeString(word) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = word
    return textArea.value
  }


  return (
    <div className = "container">
    <FlashCardList flashCards = {flashCards}/>
    </div>
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
