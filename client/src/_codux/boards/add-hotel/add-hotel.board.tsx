import { createBoard } from '@wixc3/react-board';
import { AddHotel } from '../../../components/add-hotel/add-hotel';

export default createBoard({
    name: 'AddHotel',
    Board: () => <AddHotel />
});
