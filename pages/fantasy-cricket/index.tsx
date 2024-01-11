// pages/fantasy-cricket/index.tsx
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const FantasyCricketPage: React.FC = () => {
  return (
    <div>
      <h1>Fantasy Cricket Page</h1>
      <div className={styles.grid}>
        <Link href="/fantasy-cricket/add-players/add-players" passHref>
          {/* Replace <a> with a custom button or another component */}
          <button className={styles.card}>Add Players</button>
        </Link>
        <button className={styles.card}>Button 2</button>
        <button className={styles.card}>Button 3</button>
        <button className={styles.card}>Button 4</button>
      </div>
    </div>
  );
};

export default FantasyCricketPage;



