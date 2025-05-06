import React from 'react'
import { useParams } from 'react-router-dom'

const QuestionsDetail = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <div>
      
    </div>
  )
}

export default QuestionsDetail
