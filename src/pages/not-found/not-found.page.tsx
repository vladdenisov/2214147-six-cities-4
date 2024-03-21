import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFountPage: FC = () => (
  <div
    style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: 'auto',
        }}
      >
        Упс, такой страницы не существует
      </h1>
      <Link
        to="/"
        style={{
          fontSize: '20px',
          margin: 'auto',
          color: 'blue',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  </div>
);
