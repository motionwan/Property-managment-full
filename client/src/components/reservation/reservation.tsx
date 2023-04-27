import classNames from 'classnames';
import styles from './reservation.module.scss';
import { FormRow } from '../form-row/form-row';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { SubmitButton } from '../submit-button/submit-button';

export interface ReservationProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-reservations-and-templates
 */
export const Reservation = ({ className }: ReservationProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.mainPage}>
                <form className={styles.form}>
                    <h2>Make Reservation</h2>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Guest's First Name</Label>
                        <Input placeholder="e.g R15E" id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Guest's Last Name</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Check-in Date</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Check-out Date</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Room</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <SubmitButton>ADD RESERVATION</SubmitButton>
                </form>
            </div>
        </div>
    );
};
