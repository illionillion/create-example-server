import { Configuration, OpenAIApi } from "openai";
import { generateExample } from "./lib/createExample";
import * as dotenv from "dotenv";
dotenv.config();

// 以下の4つをPOSTで受け取る
const apiKey = process.env.OPENAI_API_KEY;
const wordLang = "英語";
// const wordName = "hello";
// const wordMean = "こんにちわ";
// const wordName = "example";
// const wordMean = "例";
const wordName = "greeting";
const wordMean = "挨拶";

const main = async () => {
  try {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    console.log("作成中");
    const result = await generateExample(
      // `${wordLang}言語の${wordName}という${wordMean}という意味の単語を用いて簡単な例文を作成して`,
      // `Create one simple example sentence using the word ${wordName}, which means ${wordMean} in the ${wordLang} language. Include a Japanese translation at the end.`,
      `Create one simple short example sentence in the ${wordLang} language, always using the word ${wordName}, which means ${wordMean}. Include a Japanese translation at the end, and use only words of the same difficulty level as ${wordName}.`,
      "gpt-3.5-turbo",
      "user",
      openai
    ); // ChatGPTから例文を生成
    if (result.success) {
      console.log(result.content); // これを返すWebAPIを作る
      console.log("作成完了");
    } else {
      console.log(result.content);
    }
  } catch (error) {
    console.error("Failed to generate example:", error);
  }
};

main();
