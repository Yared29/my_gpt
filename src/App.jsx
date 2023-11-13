import { Formik } from 'formik';
import { getAnswer, cancelRequest } from './services/openai_api';
import { useState } from 'react';

function App() {
  var [answer, setAnswer] = useState('');
  var [question, setQuestion] = useState('');
  var [cancelState, setCancelState] = useState(false);
  var [answerDone, setAnswerDone] = useState(true);

  return (
    <div className="flex flex-row h-screen">
      <div className="w-full h-screen bg-slate-900">
        <div className="relative h-screen w-full">
          <div className="px-10 pt-10">
            <div className="p-10 text-white bg-gray-800 rounded-lg">
              {question ? question : 'Welcome, ask anything'}
            </div>
          </div>
          {answer ? (
            <div className="p-10">
              <div className="p-10 text-white bg-gray-800 rounded-lg">
                <div>{answer}</div>

                {cancelState || answerDone ? null : (
                  <button
                    type="submit"
                    onClick={() => cancelRequest(cancelState, setCancelState)}
                    className="float-right cursor-pointer flex-shrink-0  border-2 text-teal-100 hover:text-teal-200 text-sm py-1 px-2 rounded">
                    Cancel
                  </button>
                )}

                {cancelState ? (
                  <div className="text-gray-600 pt-4">Request canceled</div>
                ) : null}
              </div>
            </div>
          ) : null}
          <Formik
            initialValues={{ question: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.question) {
                errors.question = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              setQuestion(values.question);
              setCancelState(false);
              setAnswerDone(false);
              resetForm();
              getAnswer(values.question, answer, setAnswer, setAnswerDone);
            }}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <div>
                <div className="absolute inset-x-0 bottom-0 p-10 w-full">
                  <label
                    className="block text-gray-200 text-sm font-bold "
                    htmlFor="text">
                    Hello
                  </label>

                  <form onSubmit={handleSubmit} className="h-16 flex flex-row">
                    <input
                      name="question"
                      className="h-16 w-full shadow appearance-none border-2 border-y-blue-500 border-l-blue-500  bg-gray-200  py-2 px-3  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="text"
                      type="text"
                      placeholder="Type your question here"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.question}
                    />
                    <span className="h-16 border-blue-500 flex items-center bg-gray-200  rounded rounded-l-none border-2 px-3 font-bold text-grey-100">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer flex-shrink-0  border-2 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded">
                        Send
                      </button>
                    </span>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;
