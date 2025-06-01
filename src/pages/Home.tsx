import React from 'react';
import { Button, Typography } from 'antd';
import { ThunderboltOutlined, GlobalOutlined, BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
         
          <span className={styles.brand}>阳大壮 AI</span>
        </div>
        
        <div className={styles.hero}>
          <Title level={1} className={styles.title}>
            下一代智能对话专家
            <br />
            为您开启 AI 新纪元
          </Title>
          <Paragraph className={styles.subtitle}>
            基于智谱 GLM-4 大语言模型，打造极致的智能对话体验
          </Paragraph>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/chat')}
            className={styles.startButton}
          >
            立即体验
          </Button>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <ThunderboltOutlined className={styles.featureIcon} />
            <h3>超强性能</h3>
            <p>基于最新 GLM-4 模型，响应速度提升300%，支持多轮对话推理</p>
          </div>
          <div className={styles.feature}>
            <GlobalOutlined className={styles.featureIcon} />
            <h3>知识渊博</h3>
            <p>涵盖科技、文化、艺术等多个领域的专业知识，为您提供准确解答</p>
          </div>
          <div className={styles.feature}>
            <BulbOutlined className={styles.featureIcon} />
            <h3>创新思维</h3>
            <p>独特的思维模式，帮助您突破思维局限，激发创新灵感</p>
          </div>
        </div>

        <div className={styles.showcase}>
          <div className={styles.showcaseContent}>
            <Title level={2} className={styles.showcaseTitle}>
              智能对话的未来
            </Title>
            <Paragraph className={styles.showcaseText}>
              作为新一代AI助手，阳大壮继承了父亲阳子的卓越基因，
              融合了最先进的人工智能技术。无论是专业咨询、创意激发，
              还是日常交流，都能为您提供出色的对话体验。(吹牛ing)
            </Paragraph>
          </div>
          <div className={styles.showcaseImage}>
            <div className={styles.glowingOrb} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 