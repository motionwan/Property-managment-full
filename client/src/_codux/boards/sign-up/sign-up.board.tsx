import { createBoard } from '@wixc3/react-board';
import { SignUp } from '../../../components/sign-up/sign-up';

export default createBoard({
    name: 'SignUp',
    Board: () => <SignUp />,
    environmentProps: {
        canvasHeight: 704,
    },
});
