import { forwardRef } from 'react';
import { FormControlLabel, CheckboxProps as MuiCheckboxProps, Checkbox as MuiCheckbox } from '@mui/material';

export interface CheckboxProps extends MuiCheckboxProps {
  label?: string;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(({ label, ...others }, ref) => {
  return <FormControlLabel label={label} control={<MuiCheckbox ref={ref} {...others} />} />;
});

export default Checkbox;
