'use client'

import { useParams } from 'next/navigation'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Card from '@/components/Card'

const QuestionDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
 `

const QuestionDetail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [question, setQuestion] = useState<any>({})

    
    const apiUrl = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const result = await data.json()

            
            if (result) {
                setQuestion(result.items[0])
                setLoading(false)
            }
        }
        id && fetchData()
    }, [id])
    
    return (
        <QuestionDetailContainer>
            {loading ? (<span>Loading...</span>) : (
                <Card
                    title={question.title}
                    views={question.view_count}
                    answers={question.answer_count} />
            )}
        </QuestionDetailContainer>
    )
}

export default QuestionDetail