import classNames from 'classnames';
import styles from './add-room.module.scss';
import { FormRow } from '../form-row/form-row';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { SubmitButton } from '../submit-button/submit-button';

export interface AddRoomProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-add-rooms-and-templates
 */
export const AddRoom = ({ className }: AddRoomProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div>
                <div className={styles.mainPage}>
                    <form className={styles.form}>
                        <h2>Add Room</h2>
                        <FormRow>
                            <Label htmlFor={'firstName'}>Room Number</Label>
                            <Input placeholder="e.g R15E" id="name" name={'name'} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'firstName'}>Room Type</Label>
                            <Input id="name" name={'name'} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'firstName'}>Amenities</Label>
                            <Input id="name" name={'name'} />
                        </FormRow>
                        <SubmitButton>ADD ROOM</SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
