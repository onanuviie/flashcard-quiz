import React, { useState } from 'react'

export default function FlashCard({ flashCard }) {
  const [flip, setFlip] = useState(false)

  return (
    <div onClick={() => setFlip(!flip)}>
      {flashCard.question}
    </div>
  )
}
