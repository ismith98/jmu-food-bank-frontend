import React from 'react'

export default function FAQInfo({currentFAQ}) {
    return (
    <>
      <div> <b>Question: {currentFAQ.question} </b></div>
      <div> Answer: {currentFAQ.answer} </div>
      <div>{currentFAQ.details ? currentFAQ.details : null}</div>
    </>
    )
}
