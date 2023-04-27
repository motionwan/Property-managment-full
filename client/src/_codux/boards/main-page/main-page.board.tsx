import { createBoard } from '@wixc3/react-board';
import { MainPage } from '../../../components/main-page/main-page';

export default createBoard({
    name: 'MainPage',
    Board: () => <MainPage />
});
