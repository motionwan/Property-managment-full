import { createBoard } from '@wixc3/react-board';
import { RiseLoader } from '../../../components/rise-loader/rise-loader';

export default createBoard({
    name: 'RiseLoader',
    Board: () => <RiseLoader />
});
