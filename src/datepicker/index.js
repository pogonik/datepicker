import React, { useState } from 'react';
import PropTypes from 'prop-types'

import Month from './Month';
import PickerHero from './PickerHero';

import { getMonthData } from '../lib/date_utils';

import './index.scss';

function DatePicker(props) {

    let { initMonth } = props;

    initMonth.setHours(0, 0, 0, 0);
    let initMonthData = getMonthData(props.initMonth, props.firstDayOfWeek);
    getMonthData(props.initMonth, props.firstDayOfWeek);

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const [date, handleDate] = useState(initMonthData);

    function updateCalendar(e) {
        let newStartDate = e.target.name === 'month'
            ? new Date(parseInt(date.year), e.target.value)
            : new Date(e.target.value);

        let newMonthData = getMonthData(newStartDate, props.firstDayOfWeek);
        handleDate(newMonthData);
    }

    function selectDate(stamp) {
        let newSelect = new Date(stamp);
        props.onDateSelect(newSelect);
    }

    function updateMonth(e) {
        let newSelect = new Date(e.target.value);
        let newMonthData = getMonthData(newSelect, props.firstDayOfWeek);
        handleDate(newMonthData);
        props.onDateSelect(newSelect);
    }

    return (
        <div id={props.id} className={`card picker ${props.type}`}>

            <PickerHero
                month={date.month}
                year={date.year}
                selected={props.selected}
                language={props.language}
                updateMonth={updateMonth}
                updateCalendar={updateCalendar} />

            <div className={'pickerWrapper'}>

                <Month
                    days={date.days}
                    selected={props.selected}
                    language={props.language}
                    firstDayOfWeek={props.firstDayOfWeek}
                    onSelectDate={selectDate} />

            </div>
        </div>
    );
}

DatePicker.propTypes = {
    firstDayOfWeek: PropTypes.number,
    language: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    onDateSelect: PropTypes.func
};

DatePicker.defaultProps = {
    firstDayOfWeek: 0,
    language: 'en-GB',
    type: 'horizontal',
    id: 'picker_id',
    currentDate: null
};

export default DatePicker;
