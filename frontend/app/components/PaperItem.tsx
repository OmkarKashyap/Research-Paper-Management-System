import React from 'react';
import styles from './PaperItem.module.css'; 

interface PaperItemProps {
  title: string;
  authors: string | string[];
  volume: string;
  year: number;
  pages: string;
  link: string;
  isLiked: boolean;
  onLikeToggle: () => void;
}

const PaperItem: React.FC<PaperItemProps> = ({
  title,
  authors,
  volume,
  year,
  pages,
  link,
  isLiked,
  onLikeToggle,
}) => {
    const authorList = Array.isArray(authors) ? authors : [authors];
    
  return (
    <li className={styles.paperItem}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.authors}>
        Authors:{' '}
        {authorList.map((author, index) => (
          <span key={author}>
            {author}
            {index < authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <p className={styles.details}>
        Volume: {volume} | Year: {year} | Pages: {pages}
      </p>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Read Paper
      </a>
      <button
        onClick={onLikeToggle}
        className={`${styles.likeButton} ${isLiked ? styles.liked : styles.unliked}`}
      >
        {isLiked ? '❤️ Liked' : '♡ Like'}
      </button>
    </li>
  );
};

export default PaperItem;
