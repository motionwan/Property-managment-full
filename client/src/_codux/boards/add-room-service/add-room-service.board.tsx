import { createBoard } from '@wixc3/react-board';
import { AddRoomService } from '../../../components/add-room-service/add-room-service';

export default createBoard({
    name: 'AddRoomService',
    Board: () => <AddRoomService />
});
