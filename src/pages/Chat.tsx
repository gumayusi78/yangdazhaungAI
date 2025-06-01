import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Space, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';
import { chatWithGLM } from '../services/api';
import styles from './Chat.module.css';
import robotAvatar from '../../public/robot-avatar.png';
import userAvatar from '../../public/user-avatar.png';

interface Message {
  content: string;
  type: 'user' | 'bot';
  timestamp: number;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      content: inputValue,
      type: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const botMessage: Message = {
        content: '',
        type: 'bot',
        timestamp: Date.now() + 1,
      };

      setMessages(prev => [...prev, botMessage]);

      await chatWithGLM(inputValue, (text) => {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.type === 'bot') {
            lastMessage.content = text;
          }
          return newMessages;
        });
        scrollToBottom();
      });
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topic: string) => {
    setInputValue(topic);
  };

  const components: Components = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      
      if (!match) {
        return <code className={className}>{codeString}</code>;
      }

      return (
        <div style={{ position: 'relative' }}>
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus as any}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: '4px'
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatArea}>
        <div className={styles.chatHeader}>
          <Space>
            <img src={robotAvatar} className={styles.headerAvatar} alt="robot" />
            <span>阳大壮智能助手</span>
          </Space>
        </div>
        <div className={styles.messageList} ref={messageListRef}>
          {messages.length === 0 ? (
            <div className={styles.welcome}>
              <div className={styles.welcomeContent}>
                <h2>欢迎使用阳大壮智能助手</h2>
                <p>基于先进的 GLM-4 大语言模型，为您提供智能、专业的对话服务</p>
                <div className={styles.topics}>
                  <div className={styles.topicSection}>
                    <h3>热门话题</h3>
                    <p>您感兴趣的话题</p>
                    <div className={styles.topicList}>
                      <Button onClick={() => handleTopicClick('讲个笑话')}>
                        讲个笑话
                      </Button>
                      <Button onClick={() => handleTopicClick('介绍一下你自己')}>
                        介绍一下你自己
                      </Button>
                      <Button onClick={() => handleTopicClick('聊聊天吧')}>
                        聊聊天吧
                      </Button>
                    </div>
                  </div>
                  <div className={styles.topicSection}>
                    <h3>使用指南</h3>
                    <p>如何更好地使用助手？</p>
                    <div className={styles.topicList}>
                      <Button onClick={() => handleTopicClick('今天天气怎么样')}>
                        今天天气怎么样
                      </Button>
                      <Button onClick={() => handleTopicClick('解释一下三角函数')}>
                        解释一下三角函数
                      </Button>
                      <Button onClick={() => handleTopicClick('写一段随机数代码')}>
                        写一段随机数代码
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={`${message.type}-${message.timestamp}`}
                className={`${styles.messageItem} ${
                  message.type === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                <img 
                  src={message.type === 'user' ? userAvatar : robotAvatar} 
                  className={styles.avatar}
                  alt={message.type === 'user' ? 'user' : 'robot'}
                />
                <div className={styles.messageContent}>
                  {message.type === 'user' ? (
                    message.content
                  ) : (
                    <ReactMarkdown components={components}>
                      {message.content || ''}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.inputArea}>
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="请输入您的问题..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className={styles.input}
            disabled={loading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            className={styles.sendButton}
            loading={loading}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;