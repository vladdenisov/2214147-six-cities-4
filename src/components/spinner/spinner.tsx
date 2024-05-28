import { FC } from 'react';
import './spinner.css';
import classNames from 'classnames';

interface SpinnerProps {
  withPageWrapper?: boolean;
}

export const Spinner: FC<SpinnerProps> = ({withPageWrapper = false}) => (
  <div className={classNames('loader', withPageWrapper && 'loader_page_wrapper')}>
    <span className="loader_indicator" />
  </div>
);
