import React from 'react'
import PropTypes from 'prop-types'

import { MonthsNames } from '../lib/date_utils';

const PickerHero = props => {

    let chooserRef = React.createRef();

    const { selected, language, month, year, yearsRange } = props;

    let monthNames = MonthsNames(language);

    let title = <div className="title">{selected.getDate()}</div>;
    let subtitle = (<div className="subtitle">
            {monthNames[selected.getMonth()].short+', '+ selected.getFullYear()}
        </div>);

    let yearsChooser = buildYearsChooser(yearsRange);

    function buildMonthsChooser(y) {
        let months = monthNames.map((m,i) => {
            let val = m.long+', '+y;
            return (
                <button type="button"
                    className="button"
                    key={i}
                    onClick={toggleMenuChooser}
                    value={val}>
                    {m.short}
                </button>
            );
        });
        return (
            <li className="year" key={y}>
                <span className="yearTitle" onClick={yearBlockCollapse}>{y}</span>
                <span className="months">{months}</span>
            </li>
        );
    }

    function buildYearsChooser(range = [2000,2030]) {
        let years = [];
        for (var i = range[0]; i < range[1]; i++) {
            let y = buildMonthsChooser(i);
            years[i] = y;
        }
        return (<ul className="years">{years}</ul>);
    }

    function yearBlockCollapse(e) {
        if(!e.target.parentNode.classList.contains('open')) {
            let selector = chooserRef.current.querySelector('.years li.open');
            if(selector) selector.classList.remove('open');
        }
        e.target.parentNode.classList.toggle('open');
    }

    function toggleMenuChooser(e) {
        if(!chooserRef.current.classList.toggle('open')) {
            if(chooserRef.current.querySelector('.years li.open'))
                chooserRef.current.querySelector('.years li.open').classList.remove('open');
        }
        if(e.target.value !== undefined) {
            props.updateMonth(e);
        }
    }

    return (
        <header className={'is-primary hero '}>

            <span className="selected" onClick={toggleMenuChooser}>
                {title}
                {subtitle}
            </span>

            <nav className={'nav field has-addons'}>

                <button type="button"
                    className={'button is-text prev'}
                    name="month"
                    value={parseInt(month)-1}
                    onClick={props.updateCalendar}>
                </button>

                <span className="current">
                    {monthNames[month].long+', '+year}
                </span>

                <button type="button"
                    className={'button is-text next'}
                    name="month"
                    value={parseInt(month)+1}
                    onClick={props.updateCalendar}>
                </button>

            </nav>

            <div className="menuChooser" ref={chooserRef}>
                <div className="yearsChooser">
                    {yearsChooser}
                </div>
            </div>

        </header>
    );
}

PickerHero.propTypes = {
    firstDayOfWeek: PropTypes.number,
    language: PropTypes.string,
    yearsRange: PropTypes.array
};

PickerHero.defaultProps = {
    firstDayOfWeek: 0,
    language: 'en-GB',
    yearsRange: [2000,2030]
};

export default PickerHero;