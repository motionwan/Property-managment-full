import { createBoard } from '@wixc3/react-board';
import { FormRow } from '../../../components/form-row/form-row';

export default createBoard({
    name: 'FormRow',
    Board: () => <FormRow>Hello there</FormRow>,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
    },
});
