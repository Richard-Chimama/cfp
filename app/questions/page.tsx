
'use client'

import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;

`

const Questions = ()=>{
    const apiUrl = 'https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow'
    const [loading, setLoading] = useState<boolean>(false)
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await fetch(apiUrl,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                },                
            })
            const result = await data.json()

            if(result){
                setQuestions(result.items)
                setLoading(false)
            }
        }
        fetchData()
    },[])

    return(
        <Container>
            <h2>Questions</h2>
            {
                loading ? (<span>Loading...</span>):(
                    <div>
                        {
                            questions.map((question, index)=>(
                                <Card
                                    key={index}
                                    title={question.title}
                                    views={question.view_count}
                                    answers={question.answer_count}
                                />
                            ))
                        }
                    </div>
                )
            }
        </Container>
    )
}

export default Questions    