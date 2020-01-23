import React from 'react'

function EnterAddress(props) {
    return (
        <div>
            <input 
            type="text" 
            placeholder="Enter Address"
            onChange={(e) => props.handleAddressEvent(e)}/>
            <button onClick={() => props.handleSearch()}>SEARCH</button>
        </div>
    )
}

export default EnterAddress
