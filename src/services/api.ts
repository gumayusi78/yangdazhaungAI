import axios from 'axios';
import { message } from 'antd';

const API_KEY = '9bb81a5b567700ebe717d4fc9e36a6b3.2wPndykEhrstCCWC';
const BASE_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

const SYSTEM_PROMPT = `你是阳大壮智能助手，是一位全能大师，父亲是阳子`;

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const chatWithGLM = async (text: string, onStream: (text: string) => void) => {
  try {
    const messages: Message[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: text
      }
    ];

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || '请求失败');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    if (!reader) {
      throw new Error('无法获取响应数据');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              onStream(fullText);
            }
          } catch (e) {
            console.error('解析响应数据失败:', e);
          }
        }
      }
    }

    return fullText;
  } catch (error) {
    console.error('GLM API Error:', error);
    message.error(error instanceof Error ? error.message : '对话请求失败，请稍后重试');
    throw error;
  }
}; 