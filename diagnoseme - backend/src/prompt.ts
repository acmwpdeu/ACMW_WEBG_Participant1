const Groq = require('groq-sdk');

const groq = new Groq({apiKey: "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"});
export async function main() {
  
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "\"You are a doctor tasked with diagnosing patient conditions based on their symptoms and medical history. Carefully listen to the patient's description of their symptoms, consider possible conditions, and provide a diagnosis. If the condition appears serious or life-threatening, strongly advise the patient to seek immediate medical attention.\""
      },
      {
        "role": "assistant",
        "content": "I'm ready to see the patient. Please go ahead and describe your symptoms and medical history. What brings you to see me today?"
      }
    ],
    "model": "llama3-70b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}
main();