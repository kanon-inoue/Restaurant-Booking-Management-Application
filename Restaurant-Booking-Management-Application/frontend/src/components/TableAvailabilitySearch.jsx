import { useState } from 'react';

function TableAvailabilitySearch() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');
    const [message, setMessage] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        if (!date || !time || !guests) {
            setMessage(
                'Please enter a date, time, and number of guests'
            );

            return;
        }

        setMessage('Searching for available tables...');

    }
    return (
        <div>
            <h3>Search Available Tables</h3>

            <form onSubmit={handleSearch} noValidate>
                <div>
                    <label>Date</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>

                <div>
                    <label>Time</label>

                    <input
                        type="time"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                    />
                </div>

                <div>
                    <label>Number of Guests</label>

                    <input
                        type="number"
                        value={guests}
                        onChange={(event) => setGuests(event.target.value)}
                    />
                </div>

                <button type="submit">
                    Search Tables
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default TableAvailabilitySearch;