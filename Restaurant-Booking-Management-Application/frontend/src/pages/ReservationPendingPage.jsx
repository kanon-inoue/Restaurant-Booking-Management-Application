import { useLocation, useNavigate } from 'react-router-dom';

function ReservationPendingPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const reservation = location.state?.reservation;

    return (
        <div>
            <h2>Reservation Pending</h2>

            <p>
                Your reservation has been submitted and is waiting
                for staff approval.
            </p>

            {reservation && (
                <div>
                    <p>Status: {reservation.status}</p>
                    <p>Party size: {reservation.partySize}</p>

                    {reservation.table && (
                        <p>
                            Table: {reservation.table.tableNumber}
                        </p>
                    )}

                    <p>
                        Start time:{' '}
                        {new Date(
                            reservation.startTime
                        ).toLocaleString()}
                    </p>
                </div>
            )}

            <button
                type="button"
                onClick={() =>
                    navigate('/customer-dashboard')
                }
            >
                Return to Customer Dashboard
            </button>
        </div>
    );
}

export default ReservationPendingPage;
