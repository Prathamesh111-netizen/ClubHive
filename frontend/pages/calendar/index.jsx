import Calendar from '@components/Calendar/Calendar';
import React from 'react'
import styles from './calendar.module.scss'

const index = () => {
  return (
    <div className="m-24">
      <Calendar committeeName="global" />
    </div>
  );
};

export default index