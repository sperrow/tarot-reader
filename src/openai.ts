import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [
//             { role: 'system', content: 'You are a helpful assistant.' },
//             {
//                 role: 'user',
//                 content:
//                     'Give me 20 trivia questions about the biggest pop culture stories in 2009. Format should be JSON.',
//             },
//         ],
//         model: 'gpt-4',
//     });

//     console.log(completion.choices[0]);
// }    

async function main(cards: string[]) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an expert Tarot Card reader.' },
                {
                    role: 'user',
                    content: `
                        Generate a Tarot Card Reading with tarot cards from Major and Minor Arcana. The three cards you use are ${cards.join(', ')}. The question you're answering is "Should I go to Paris for the summer?".
                        
                        Provide a cards array with an explanation for each card's meaning. Then provide a detailed summary of the meaning of all three cards together.
    
                        The output should be json in this format: {"card_summaries": [{"name": "", "summary": ""}], "all_summary": ""}
                
                        Please give me a Tarot card reading using only the information from your knowledge base, without any analysis or code interpretation. Just explain their meanings based on your existing knowledge.
                    `,
                },
            ],
            model: 'gpt-3.5-turbo-0125',
            response_format: {
                type: 'json_object',
            },
        });
    
        console.log(completion)
        if (completion?.choices[0]?.message?.content) {
            return JSON.parse(completion?.choices[0].message?.content);
        }
    } catch (err) {
        console.error(err);
    }
    // console.log(JSON.parse(completion.choices[0].message.content));
}

export default main;