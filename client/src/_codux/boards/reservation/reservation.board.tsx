import { createBoard } from '@wixc3/react-board';
import { Reservation } from '../../../components/reservation/reservation';

export default createBoard({
    name: 'Reservation',
    Board: () => <Reservation />,
    environmentProps: {
        windowWidth: 1024,
    },
});
