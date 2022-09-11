import '../styles/globals.css';
import { Layout, Menu } from 'antd';
import styles from '../styles/_app.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const menuItems: { key: string; label: string; path?: string }[] = [
  {
    key: 'home',
    label: '首页',
    path: '/',
  },
  {
    key: 'about',
    label: '关于我',
    path: '/about',
  },
];

function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div>
          <div className={styles.logo}>
            <Link href="/">幻星的个人网站</Link>
          </div>
          <Menu
            className={styles.menu}
            mode="horizontal"
            defaultSelectedKeys={['home']}
            onSelect={(e) => {
              const path = (e.item as any).props.path;
              console.log(e, e.key);
              router.push(path);
            }}
            items={menuItems}
          />
          <div className={styles.headerExtra}></div>
        </div>
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <Component {...pageProps} />
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        Powered by&nbsp;
        <a href="https://github.com/hstarorg" target="_blank" rel="noopener noreferrer">
          @hstarorg
        </a>
        &nbsp;{new Date().getFullYear()}
      </Layout.Footer>
    </Layout>
  );
}

export default App;
