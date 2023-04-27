import classNames from 'classnames';
import styles from './add-hotel.module.scss';
import { FormRow } from '../form-row/form-row';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { SubmitButton } from '../submit-button/submit-button';
import FormRow_module from '../form-row/form-row.module.scss';

export interface AddHotelProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-add-hotels-and-templates
 */
export const AddHotel = ({ className }: AddHotelProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div></div>
            <div className={styles.mainPage}>
                <form className={styles.form}>
                    <h2>Add Hotel</h2>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Hotel Name</Label>
                        <Input id="name" name={'name'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Address</Label>
                        <Input id="firstName" name={'firstName'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Phone Number</Label>
                        <Input id="firstName" name={'firstName'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Email</Label>
                        <Input id="firstName" name={'firstName'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>City</Label>
                        <Input id="firstName" name={'firstName'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>State/Region</Label>
                        <Input id="firstName" name={'firstName'} />
                    </FormRow>
                    <FormRow>
                        <Label htmlFor={'firstName'}>Country</Label>
                        <Input id="firstName" name={'firstName'} />
                    </FormRow>
                    <SubmitButton>ADD HOTEL</SubmitButton>
                </form>
            </div>
        </div>
    );
};
