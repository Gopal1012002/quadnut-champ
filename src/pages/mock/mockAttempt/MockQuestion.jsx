import React from 'react'
import { Col } from 'react-bootstrap'
import { FaRegCheckCircle, FaRegCircle, FaRegSquare } from 'react-icons/fa'
import { FaRegSquareCheck } from 'react-icons/fa6'

const MockQuestion = ({ data, onSelectAnswer, current, totalGrade }) => {
  return (
    <Col md={8} className='shadow-sm pb-5 mock-question-div'>
      <div className=" py-3 mt-4">
        <h5>
          Question Number : {current + 1}
        </h5>
      </div>
      <hr />
      <p className='text-primary'>
        <div dangerouslySetInnerHTML={{ __html: data?.questionTitle }}></div>
      </p>
      <p className="text-soft text-small">
        <b>Grade Points : </b> {(data?.questionGrade * 100 / totalGrade)?.toFixed(2)} % </p>
      {
        data?.questionType === "TEXT" ?
          <input type='text' className='w-100 form-control' value={data?.selectedText ?? ''} placeholder='Write answer here' onChange={(e) => onSelectAnswer(e.target.value)} />
          :
          data?.answerList?.map((answer, index) => {
            return (
              <div
                key={index}
                className="border my-3 border-sm p-3 d-flex align-items-center clickable-btn"
                onClick={() => onSelectAnswer(answer?.answerId)}
              >
                {
                  data?.questionType === "SINGLE" ? (
                    data?.selectedOptionId === answer?.answerId ? <FaRegCheckCircle
                      size={19}
                      color="#2d2f31"
                      className="me-2"
                    /> : <FaRegCircle
                      size={19}
                      color="#2d2f31"
                      className="me-2"
                    />
                  ) : data?.selectedOptionIdArray?.includes(answer?.answerId) ? (
                    <FaRegSquareCheck
                      size={20}
                      color="#2d2f31"
                      className="me-2"
                    />
                  ) : (
                    <FaRegSquare size={20} color="#2d2f31" className="me-2" />
                  )
                }
                <span className="answer-heading">
                  {answer?.answerTitle}
                </span>
              </div>)
          })
      }
    </Col>
  )
}

export default MockQuestion