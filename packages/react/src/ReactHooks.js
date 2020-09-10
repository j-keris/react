/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  ReactContext,
  ReactEventResponder,
  ReactEventResponderListener,
} from 'shared/ReactTypes';
import invariant from 'shared/invariant';
import {REACT_RESPONDER_TYPE} from 'shared/ReactSymbols';

import ReactCurrentDispatcher from './ReactCurrentDispatcher';

type BasicStateAction<S> = (S => S) | S;
type Dispatch<A> = A => void;

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  invariant(
    dispatcher !== null,
    'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
      ' one of the following reasons:\n' +
      '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
      '2. You might be breaking the Rules of Hooks\n' +
      '3. You might have more than one copy of React in the same app\n' +
      'See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.',
  );
  return dispatcher;
}

export function useContext<T>(
  Context: ReactContext<T>,
  unstable_observedBits: number | boolean | void,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useContext(Context, unstable_observedBits);
}

export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

export function useRef<T>(initialValue: T): {|current: T|} {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

export function useEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}

export function useLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}

export function useCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}

export function useMemo<T>(
  create: () => T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}

export function useImperativeHandle<T>(
  ref: {|current: T | null|} | ((inst: T | null) => mixed) | null | void,
  create: () => T,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}

export function useDebugValue<T>(
  value: T,
  formatterFn: ?(value: T) => mixed,
): void {
  if (__DEV__) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

export const emptyObject = {};

export function useResponder(
  responder: ReactEventResponder<any, any>,
  listenerProps: ?Object,
): ?ReactEventResponderListener<any, any> {
  const dispatcher = resolveDispatcher();
  if (__DEV__) {
    if (responder == null || responder.$$typeof !== REACT_RESPONDER_TYPE) {
      console.error(
        'useResponder: invalid first argument. Expected an event responder, but instead got %s',
        responder,
      );
      return;
    }
  }
  return dispatcher.useResponder(responder, listenerProps || emptyObject);
}

export function useTransition(
  config: ?Object,
): [(() => void) => void, boolean] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useTransition(config);
}

export function useDeferredValue<T>(value: T, config: ?Object): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useDeferredValue(value, config);
}
