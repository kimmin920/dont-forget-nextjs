import {
  ChatGPTMessage,
  OpenAIStreamPayload,
  OpenAiStream,
} from '@/lib/openai-stream';
import { MessageSchema } from '@/lib/validators/message';

export async function POST(req: Request) {
  const data = await req.json();

  const parsed = MessageSchema.parse(data);
  const outboundMessage: ChatGPTMessage = { role: 'user', content: 'content' };

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [outboundMessage],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAiStream(payload);
  return new Response(stream);
}
