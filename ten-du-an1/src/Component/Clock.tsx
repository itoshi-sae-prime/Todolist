import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
const Clock = ({ time, setTime }: { time: Date, setTime: React.Dispatch<React.SetStateAction<Date>> }) => {
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date: Date) => {
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        const day = time.getDate();
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        const period = hours.toString() >= `12` ? 'PM' : 'AM';
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} ${period}`;
    };
    return (
        <div>
            <h1 className='text-white font-medium'>{formatTime(time)}</h1>
        </div>
    );
};

export default Clock;
