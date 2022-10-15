import React, { ReactElement, useState } from 'react'
import './App.css'
import { FirstCase } from './FirstCase'
import { SecondCase } from './SecondCase'

export enum CASE_TYPE {
  loanAgreement = 'loan',
  employmentStatus = 'employmentStatus',
}

const App = (): ReactElement => {
  const [input, setInput] = useState('')
  const [legalCase, setLegalCase] = useState(null)

  const handleInputChange = (event: any): void => {
    setInput(event.target.value)
  }

  const handleSend = async (): Promise<void> => {
    if (input) {
      try {
        const data = (await fetch('http://localhost:5174/case', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input }),
        })) as any
        const result = await data.json()

        setLegalCase(result.case)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      Czego dotyczy Twoja sprawa?
      <br />
      <div>
        <input className="Input" value={input} onChange={handleInputChange} />
        <button onClick={handleSend}>&rarr;</button>
      </div>
      {legalCase === CASE_TYPE.loanAgreement && <FirstCase />}
      {legalCase === CASE_TYPE.employmentStatus && <SecondCase />}
    </div>
  )
}

export default App
