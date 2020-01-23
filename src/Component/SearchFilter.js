import React from 'react'
import styles from '../App.module.css'
import { FILTER_TODAY, FILTER_THIS_WEEK, FILTER_THIS_MONTH, FILTER_3_MONTH_AGO, FILTER_6_MONTH_AGO, FILTER_THIS_YEAR, ALL_DATA } from '../utils/constants';
import { FormGroup } from 'react-bootstrap';

function SearchFilter(props) {
    return (
        <div>
            <FormGroup className='mb-0'>
                <div className={styles.listingfield}>
                    <div className={styles.appSelectfield} >
                        <select value={props.dateFilterValue} onChange={(event) => props.filerByTime(event)}>
                            <option value={ALL_DATA} >All Data</option>
                            <option value={FILTER_TODAY}>Today</option>
                            <option value={FILTER_THIS_WEEK}>This Week</option>
                            <option value={FILTER_THIS_MONTH}>This Month</option>
                            <option value={FILTER_3_MONTH_AGO}>3 Months ago</option>
                            <option value={FILTER_6_MONTH_AGO}>6 Months ago</option>
                            <option value={FILTER_THIS_YEAR}>This year</option>
                        </select>
                    </div>
                </div>
            </FormGroup>
        </div>
    )
}

export default SearchFilter
