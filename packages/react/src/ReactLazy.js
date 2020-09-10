/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {REACT_LAZY_TYPE} from 'shared/ReactSymbols';

type Thenable<T, R> = {
  then(resolve: (T) => mixed, reject: (mixed) => mixed): R,
};

export type UninitializedLazyComponent<T> = {
  $$typeof: Symbol | number,
  _status: -1,
  _result: () => Thenable<{default: T, ...} | T, mixed>,
};

export type PendingLazyComponent<T> = {
  $$typeof: Symbol | number,
  _status: 0,
  _result: Thenable<{default: T, ...} | T, mixed>,
};

export type ResolvedLazyComponent<T> = {
  $$typeof: Symbol | number,
  _status: 1,
  _result: T,
};

export type RejectedLazyComponent = {
  $$typeof: Symbol | number,
  _status: 2,
  _result: mixed,
};

export type LazyComponent<T> =
  | UninitializedLazyComponent<T>
  | PendingLazyComponent<T>
  | ResolvedLazyComponent<T>
  | RejectedLazyComponent;

export function lazy<T>(
  ctor: () => Thenable<{default: T, ...} | T, mixed>,
): LazyComponent<T> {
  let lazyType: LazyComponent<T> = {
    $$typeof: REACT_LAZY_TYPE,
    // React uses these fields to store the result.
    _status: -1,
    _result: ctor,
  };

  return lazyType;
}
