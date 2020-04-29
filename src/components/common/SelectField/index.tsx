import React, { ChangeEvent } from 'react';
import _ from 'lodash';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './styles';

interface Props {
  options?: { [key: string]: any }[];
  disabled?: boolean;
  label?: string;
  labelKey?: string;
  valueKey?: string;
  value?: string | number;
  onChange(value: any, valueObject?: any): void;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const {
    options = [],
    disabled = false,
    label = '',
    labelKey = '',
    valueKey = '',
    value = '',
    onChange = () => {},
  } = props;
  const getLabel = (option: { [key: string]: any }) => option[labelKey] || '';
  const _value: any = options.find(option => option[valueKey] == value);
  const classes = useStyles();

  return (
    <Autocomplete
      options={options}
      getOptionLabel={getLabel}
      value={_value || ''}
      className={classes.root}
      disabled={disabled}
      renderInput={params => <TextField {...params} disabled={disabled} label={label} variant="outlined" />}
      onChange={(event: ChangeEvent<{}>, selectedValue: any) => onChange(_.get(selectedValue, valueKey), selectedValue)}
    />
  );
};

export default SelectField;
