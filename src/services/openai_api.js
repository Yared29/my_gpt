import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
let stream;
async function getAnswer(question, answer, setAnswer, setAnswerDone) {
  var ans = '';
  stream = await openai.beta.chat.completions.stream({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    stream: true,
  });

  for await (const part of stream) {
    if (part.choices[0]?.delta?.content) {
      ans = ans + part.choices[0]?.delta?.content || '';
      setAnswer(ans);
    }
  }
  setAnswerDone(true);
}

async function cancelRequest(cancelState, setCancelState) {
  stream.abort();
  stream.done();
  setCancelState(true);
}
export { getAnswer, cancelRequest };
