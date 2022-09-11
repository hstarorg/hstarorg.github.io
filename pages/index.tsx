import { Row, Col, Typography, Button } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Products } from '../constants';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>幻星</title>
      </Head>
      {/* Banner 区域 */}
      <div className={styles.banner}>
        <Row gutter={24}>
          <Col span={12}>
            <Typography.Title>欢迎</Typography.Title>
            <Typography.Text>这是</Typography.Text>
          </Col>
          <Col span={12}>
            <Image
              alt=""
              width={532}
              height={406}
              src="https://landkit.goodthemes.co/assets/img/illustrations/illustration-2.png"
            />
          </Col>
        </Row>
      </div>
      {/* 产品列表 */}
      <div className={styles.product}>
        <Typography.Title style={{ textAlign: 'center' }} level={2}>
          产品列表
        </Typography.Title>
        <Row gutter={24}>
          {Products.map((p) => {
            return (
              <Col key={p.name} span={8}>
                <div className={styles.productItem}>
                  <Typography.Title level={4}>我是产品1</Typography.Title>
                  <Typography.Text>我是产品介绍哈哈哈哈哈好</Typography.Text>
                  <br />
                  <Button size="small">
                    立即访问 <ArrowRightOutlined />
                  </Button>
                </div>
              </Col>
            );
          })}
          <Col></Col>
        </Row>
      </div>
    </div>
  );
}
