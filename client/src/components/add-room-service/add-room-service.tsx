import classNames from 'classnames';
import styles from './add-room-service.module.scss';
import { FormRow } from '../form-row/form-row';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { SubmitButton } from '../submit-button/submit-button';

export interface AddRoomServiceProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-add-room-services-and-templates
 */
export const AddRoomService = ({ className }: AddRoomServiceProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.mainPage}>
                <form className={styles.form}>
                    <h2>House Keeping Service</h2>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Room</Label>
                        <Input placeholder="e.g R15E" id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Date</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Description</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <SubmitButton>SUBMIT</SubmitButton>
                </form>
            </div>
        </div>
    );
};
