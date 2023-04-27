import { createBoard } from '@wixc3/react-board';
import { SignIn } from '../../../components/sign-in/sign-in';

export default createBoard({
    name: 'SignIn',
    Board: () => <SignIn />,
    environmentProps: {
        canvasWidth: 809,
        windowWidth: 1024,
        windowHeight: 768,
    },
});
