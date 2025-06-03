import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config();

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function main() {
  const truth = "The man had the hiccups, and his reason for requesting a drink of water was not to quench his thirst but to cure his hiccups. The bartender realized this and chose instead to cure the hiccups by frightening the man with the gun. Once the man realized that his hiccups were gone, he no longer needed a drink of water, gratefully thanked the bartender, and left."
  const question = "does the man love hiccup?";

  const isYesNoQues = await checkYesOrNo("How many person are involved");
  // const isYesNoQues = await checkYesOrNo("Is the man heterosexual?");

  console.log(isYesNoQues);


  const yesOrNo = await getYesOrNo(question, truth);
  // Print the completion returned by the LLM.
  console.log(yesOrNo);
  
  const userSolution = "The man had the hiccups, he asked for water to fix his hiccups. The bartender realized to fixed his hiccup with the gun";
  const solutionScore = await checkSolution(userSolution, truth);
  console.log(solutionScore);

}
function groqQuestion (role, query) {
  return groq.chat.completions.create({
    //
    // Required parameters
    //
    messages: [
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
      {
        role: "system",
        content: role
      },
      // Set a user message for the assistant to respond to.
      {
        role: "user",
        content: query,
      },
    ],

    // The language model which will generate the completion.
    model: "llama-3.3-70b-versatile",

    //
    // Optional parameters
    //

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.1,       // modified

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_completion_tokens: 1024,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    stop: null,

    // If set, partial message deltas will be sent.
    stream: false,
  });
}

export const checkYesOrNo = async (question) => {
  const role = 
  "Evaluate strictly whether the proposed solution is a grammatically binary question — a question that expects only 'yes' or 'no' as an answer. Ignore content, sensitivity, or emotional tone. Respond only with a number from 0 to 100: 0 = not a binary question; 100 = fully a binary question.";
  const query =  `Question: ${question}`;
  const res = await groqQuestion(role, query);
  return res.choices[0]?.message?.content || "";
};

export const getYesOrNo = async (question, truth) => {
  const role = 
  "You are a strict logic assistant for situation puzzles. You answer questions based on the known truth, using only 'Yes', 'No', or 'Irrelevant'. Ignore grammatical mistakes, tense confusion, and minor typos — focus on the intended meaning. If a question do not have a corresponding answer based on truth, respond 'Irrelevant'. Never explain or elaborate.";
  const query =  `Truth: ${truth}\nQuestion: ${question}?`;
  const res = await groqQuestion(role, query);
  return res.choices[0]?.message?.content || "";
};

export const checkSolution = async (solution, truth) => {
  const role = 
  "You are a strict logic assistant for situation puzzles. You evaluate how closely a proposed truth matches the known truth. Respond only with a number from 0 to 100: 0 means completely different, 100 means perfectly same. Do not explain your answer.";
  const query = `Proposed Truth: ${truth}\nReal Truth: ${solution}`
  const res = await groqQuestion(role, query);
  return res.choices[0]?.message?.content || "";
};

// main();