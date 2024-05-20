import { FC } from 'react';

interface SortingItemProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export const SortingItem: FC<SortingItemProps> = ({
  name,
  isActive,
  onClick,
}) => (
  <li
    className={`places__option ${isActive ? 'places__option--active' : ''}`}
    tabIndex={0}
    onClick={onClick}
  >
    {name}
  </li>
);
