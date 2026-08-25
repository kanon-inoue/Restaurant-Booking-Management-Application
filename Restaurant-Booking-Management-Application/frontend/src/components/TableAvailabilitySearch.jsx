import { useState } from 'react';

function TableAvailabilitySearch() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');
    const [message, setMessage] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        if (!date) {
            setMessage('Please select a reservation date');
            return;
        }

        const selectedDateTime = new Date(`${date}T${time}`);

        if (Number.isNaN(selectedDateTime.getTime())) {
            setMessage('Please enter a valid date and time');
            return;
        }

        if (selectedDateTime <= new Date()) {
            setMessage('Please select a future date and time');
            return;
        }

        if (!time) {
            setMessage('Please select a reservation time');
            return;
        }

        const minutes = Number(time.split(':')[1]);

        if (minutes !== 0 && minutes !== 30) {
            setMessage('Please select a time in 30-minute intervals');
            return;
        }

        if (!guests) {
            setMessage('Please enter the number of guests');
            return;
        }

        const partySize = Number(guests);

        if (!Number.isInteger(partySize) || partySize < 1) {
            setMessage('The number of guests must be at least 1');
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
                        step="1800"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                    />
                </div>

                <div>
                    <label>Number of Guests</label>

                    <input
                        type="number"
                        min="1"
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