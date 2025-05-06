import React from 'react'
import { useParams } from 'react-router-dom'

const QuestionDetail = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>
      
    </div>
  )
}

export default QuestionDetail
