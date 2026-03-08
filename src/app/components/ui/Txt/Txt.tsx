'use client';

import {ElementType} from 'react';
import styles from './Txt.module.scss';

type TxtVariant = 'body' | 'caption' | 'title' | 'subtitle';
type TxtWeight = 'regular' | 'medium' | 'bold';
type TxtColor = 'primary' | 'muted' | 'danger' | 'default' | 'contrast';

interface TxtProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  as?: ElementType;
  variant?: TxtVariant;
  weight?: TxtWeight;
  color?: TxtColor;
  className?: string;
}

export const Txt: React.FC<TxtProps> = ({
  as: Component = 'span',
  variant = 'body',
  weight = 'regular',
  color = 'default',
  className,
  children,
  id,
  ...restProps
}) => {
  const classes = [
    styles.txt,
    styles[`variant_${variant}`],
    styles[`weight_${weight}`],
    styles[`color_${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} id={id} {...restProps}>
      {children}
    </Component>
  );
};
