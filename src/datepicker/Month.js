import React from 'react'
import { dayNames } from '../lib/date_utils';

export default props => {

    const buildDays = () => {

        return props.days.map(val => {
            let klasa = val.today ? ' today' : '';
            klasa += val.unixDay === props.selected.getTime() ? ' selected' : '';

            if(!val.inMonth) {
                return (
                    <span key={val.unixDay}
                        id={'day_'+val.unixDay}
                        className={'day notInMonth'+klasa}>
                        <span>{val.day.getDate()}</span>
                    </span>
                );
            }
            return (
                <span key={val.unixDay}
                    id={'day_'+val.unixDay}
                    onClick={() => { props.onSelectDate(val.unixDay) }}
                    className={'day '+klasa}>
                    <span>{val.day.getDate()}</span>
                </span>
            );
        });
    }

    let pickerHeader = dayNames(props.language, props.firstDayOfWeek).map((d,i) => {
        return <span key={i} className={'dayCell'}>{d.short.slice(0,2)}</span>
    });

    let pickerBody = buildDays();

    return (
        <div className="month">
            <div className={'header'}>{pickerHeader}</div>
            <div className={'body'}>{pickerBody}</div>
        </div>
    );
}
