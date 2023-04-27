import { createBoard } from '@wixc3/react-board';
import { AddRoom } from '../../../components/add-room/add-room';

export default createBoard({
    name: 'AddRoom',
    Board: () => <AddRoom />
});
