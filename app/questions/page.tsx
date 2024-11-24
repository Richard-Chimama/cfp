
'use client'

import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Container = styled.div`
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;

`

const CardLink = styled.a`
    text-decoration: none;
`

const Questions = () => {
    const searchParam = useSearchParams()
    const page = searchParam.get('page')
    const apiUrl = !page ?'https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow':
                            `https://api.stackexchange.com/2.3/questions?page=${page}&:order=desc&sort=hot&tagged=reactjs&site=stackoverflow`
    const [loading, setLoading] = useState<boolean>(false)
    const [questions, setQuestions] = useState<any[]>([])


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
                setQuestions(result.items)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Container>
            <h2>Questions</h2>
            {
                loading ? (<span>Loading...</span>) : (
                    <div>
                        {
                            questions.map((question, index) => (
                                <Link key={question.question_id} href={`/questions/${question.question_id}`} passHref>
                                        <Card
                                            key={index}
                                            title={question.title}
                                            views={question.view_count}
                                            answers={question.answer_count}
                                        />
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </Container>
    )
}

export default Questions    