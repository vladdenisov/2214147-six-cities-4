import { FC, PropsWithChildren } from 'react';
import { Header } from '../components/Header/Header';

interface MainLayoutProps {
  color?: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  color,
}) => (
  <div className={`page ${color ? `page--${color}` : ''}`}>
    <Header />
    {children}
  </div>
);
