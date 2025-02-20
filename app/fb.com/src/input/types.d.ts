import { number } from 'yargs';

export interface FDSFormTextAreaProps {
  addOnBottom?: React.ReactNode;
  autoComplete?: boolean;
  auxContent?: React.ReactNode;
  describedBy?: any;
  disabled?: boolean;
  helperText?: React.ReactNode;
  hideLabel?: boolean;
  label?: React.ReactNode;
  maxLength?: number;
  maxRows?: number;
  minRows?: number;
  //
  onBlur?: any;
  onFocus?: any;
  onValueChange?: any;

  placeholder?: string | number;
  suppressFocusRing?: boolean;
  validationState?: any;
  validator?: any;
  value?: any;
}

export interface FDSFormTextInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  // autoComplete?: boolean;
  autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD?: boolean;
  auxContent?: React.ReactNode;
  disabled?: boolean;
  emojiSkittle?: any;
  helperText?: React.ReactNode;
  helperTextIsHidden?: boolean;
  icon?: React.ReactNode;
  iconSize?: number;
  inputMode?: any;
  label?: React.ReactNode;
  labelRef?: any;
  maxLength?: number;
  //
  onBlur?: any;
  onClick?: any;
  onFocus?: any;
  onValueChange?: any;

  placeholder?: string | number;
  readOnly?: boolean;

  suppressFocusRing?: boolean;
  type?: HTMLInputTypeAttribute;
  validationState?: any;
  validator?: any;
  value?: any;
}
