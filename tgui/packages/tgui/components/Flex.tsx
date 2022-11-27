/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { BooleanLike, classes, pureComponentHooks } from 'common/react';
import { BoxProps, computeBoxClassName, computeBoxProps, unit } from './Box';

export type FlexProps = BoxProps & {
  direction?: string | BooleanLike;
  wrap?: string | BooleanLike;
  align?: string | BooleanLike;
  justify?: string | BooleanLike;
  inline?: BooleanLike;
};

export const computeFlexClassName = (props: FlexProps) => {
  return classes([
    'Flex',
<<<<<<< HEAD
    props.inline && 'Flex--inline',
    Byond.IS_LTE_IE10 && 'Flex--iefix',
    Byond.IS_LTE_IE10 && props.direction === 'column' && 'Flex--iefix--column',
    computeBoxClassName(props),
=======
    Byond.IS_LTE_IE10 && (
      props.direction === 'column'
        ? 'Flex--iefix--column'
        : 'Flex--iefix'
    ),
    props.inline && 'Flex--inline',
>>>>>>> 78591096281ec448bc371e2b580a3df0a5918fcc
  ]);
};

export const computeFlexProps = (props: FlexProps) => {
<<<<<<< HEAD
  const { className, direction, wrap, align, justify, inline, ...rest } = props;
  return computeBoxProps({
=======
  const {
    className,
    direction,
    wrap,
    align,
    justify,
    inline,
    ...rest
  } = props;
  return {
>>>>>>> 78591096281ec448bc371e2b580a3df0a5918fcc
    style: {
      ...rest.style,
      'flex-direction': direction,
      'flex-wrap': wrap === true ? 'wrap' : wrap,
      'align-items': align,
      'justify-content': justify,
    },
    ...rest,
  });
};

<<<<<<< HEAD
export const Flex = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={classes([className, computeFlexClassName(rest)])}
      {...computeFlexProps(rest)}
=======
export const Flex = props => {
  const { className, ...rest } = props;
  return (
    <div
      className={classes([
        className,
        computeFlexClassName(rest),
        computeBoxClassName(rest),
      ])}
      {...computeBoxProps(computeFlexProps(rest))}
>>>>>>> 78591096281ec448bc371e2b580a3df0a5918fcc
    />
  );
};

Flex.defaultHooks = pureComponentHooks;

export type FlexItemProps = BoxProps & {
  grow?: number;
  order?: number;
  shrink?: number;
  basis?: string | BooleanLike;
  align?: string | BooleanLike;
};

export const computeFlexItemClassName = (props: FlexItemProps) => {
  return classes([
    'Flex__item',
    Byond.IS_LTE_IE10 && 'Flex__item--iefix',
<<<<<<< HEAD
    computeBoxClassName(props),
=======
    Byond.IS_LTE_IE10 && (props.grow && props.grow > 0) && 'Flex__item--iefix--grow',
>>>>>>> 78591096281ec448bc371e2b580a3df0a5918fcc
  ]);
};

export const computeFlexItemProps = (props: FlexItemProps) => {
  // prettier-ignore
  const {
    className,
    style,
    grow,
    order,
    shrink,
    basis,
    align,
    ...rest
  } = props;
<<<<<<< HEAD
  // prettier-ignore
  const computedBasis = basis
    // IE11: Set basis to specified width if it's known, which fixes certain
    // bugs when rendering tables inside the flex.
    ?? props.width
    // If grow is used, basis should be set to 0 to be consistent with
    // flex css shorthand `flex: 1`.
    ?? (grow !== undefined ? 0 : undefined);
  return computeBoxProps({
=======
  return {
>>>>>>> 78591096281ec448bc371e2b580a3df0a5918fcc
    style: {
      ...style,
      'flex-grow': grow !== undefined && Number(grow),
      'flex-shrink': shrink !== undefined && Number(shrink),
      'flex-basis': unit(computedBasis),
      'order': order,
      'align-self': align,
    },
    ...rest,
  });
};

<<<<<<< HEAD
const FlexItem = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={classes([className, computeFlexItemClassName(props)])}
      {...computeFlexItemProps(rest)}
=======
const FlexItem = props => {
  const { className, ...rest } = props;
  return (
    <div
      className={classes([
        className,
        computeFlexItemClassName(props),
        computeBoxClassName(props),
      ])}
      {...computeBoxProps(computeFlexItemProps(rest))}
>>>>>>> 78591096281ec448bc371e2b580a3df0a5918fcc
    />
  );
};

FlexItem.defaultHooks = pureComponentHooks;

Flex.Item = FlexItem;
