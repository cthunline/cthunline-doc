import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const HomepageHeader = () => {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={styles.heroBanner}>
            <div className="container">
                <img
                    className={styles.homeLogo}
                    src="img/logo.png"
                    alt="Cthunline logo"
                />
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/documentation/introduction"
                    >
                        Get started
                    </Link>
                </div>
            </div>
        </header>
    );
};

const Home = () => {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description={`${siteConfig.title} documentation`}
        >
            <HomepageHeader />
        </Layout>
    );
};

export default Home;
