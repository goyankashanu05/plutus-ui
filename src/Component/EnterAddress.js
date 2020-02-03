import React from 'react'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import styles from '../App.module.css'

function EnterAddress(props) {
    return (
        <div>
            <InputGroup className={styles.appselectfield}>
              <FormControl onChange={(e) => props.handleAddressEvent(e)}
                placeholder="Plutus Address"/>
                <Button className="btn btn-secondary" onClick={() => props.handleSearch()}>SEARCH</Button>
            </InputGroup>
            <span className="text-danger">{props.error}</span>

        </div>
    )
}

export default EnterAddress
