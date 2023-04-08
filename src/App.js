import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import FlashCardList from './FlashCardList'
import axios from 'axios'

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS)
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  })

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

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
    <form className = "header" onSubmit = {handleSubmit}>
      <div className = "form-group">
        <label htmlFor = "Category">Category</label>
        <select id = "category" ref = {categoryEl}>
          {categories.map(category => {
            return <option value = {category.id} key = {category.id}>
              {category.name}
            </option>
          })}
        </select>
      </div>

      <div className = "form-group">
        <label htmlFor = "amount">Number Of Questions</label>
        <input type = "number" id = "amount" min = "1" step = "1" 
        defaultValue = {10} ref = {amountEl} />
      </div>

      <div className = "form-group">
        <button className = "btn">Generate</button>
      </div>
    </form>
    <div className = "container">
    <FlashCardList flashCards = {flashCards}/>
    </div>
    </>
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
