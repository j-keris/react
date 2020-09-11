/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactNodeList} from 'shared/ReactTypes';
import type {Container} from './ReactDOMHostConfig';

import '../shared/checkReact';
import './ReactDOMClientInjection';
import {
  findDOMNode,
  render,
  hydrate,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from './ReactDOMLegacy';
import {createRoot, createBlockingRoot, isValidContainer} from './ReactDOMRoot';
import {useEvent} from './ReactDOMUseEvent';

import {
  batchedEventUpdates,
  batchedUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  flushSync,
  flushControlled,
  injectIntoDevTools,
  flushPassiveEffects,
  IsThisRendererActing,
  attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
} from 'react-reconciler/src/ReactFiberReconciler';
import {createPortal as createPortalImpl} from 'shared/ReactPortal';
import {canUseDOM} from 'shared/ExecutionEnvironment';
import {setBatchingImplementation} from 'legacy-events/ReactGenericBatching';
import {
  setRestoreImplementation,
  enqueueStateRestore,
  restoreStateIfNeeded,
} from 'legacy-events/ReactControlledComponent';
import {runEventsInBatch} from 'legacy-events/EventBatching';
import {
  eventNameDispatchConfigs,
  injectEventPluginsByName,
} from 'legacy-events/EventPluginRegistry';
import {
  accumulateTwoPhaseDispatches,
  accumulateDirectDispatches,
} from 'legacy-events/EventPropagators';
import ReactVersion from 'shared/ReactVersion';
import invariant from 'shared/invariant';
import {warnUnstableRenderSubtreeIntoContainer} from 'shared/ReactFeatureFlags';

import {
  getInstanceFromNode,
  getNodeFromInstance,
  getFiberCurrentPropsFromNode,
  getClosestInstanceFromNode,
} from './ReactDOMComponentTree';
import {restoreControlledState} from './ReactDOMComponent';
import {dispatchEvent} from '../events/ReactDOMEventListener';
import {
  setAttemptSynchronousHydration,
  setAttemptUserBlockingHydration,
  setAttemptContinuousHydration,
  setAttemptHydrationAtCurrentPriority,
  queueExplicitHydrationTarget,
} from '../events/ReactDOMEventReplaying';

setAttemptSynchronousHydration(attemptSynchronousHydration);
setAttemptUserBlockingHydration(attemptUserBlockingHydration);
setAttemptContinuousHydration(attemptContinuousHydration);
setAttemptHydrationAtCurrentPriority(attemptHydrationAtCurrentPriority);

let didWarnAboutUnstableCreatePortal = false;
let didWarnAboutUnstableRenderSubtreeIntoContainer = false;


setRestoreImplementation(restoreControlledState);
setBatchingImplementation(
  batchedUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  batchedEventUpdates,
);

function createPortal(
  children: ReactNodeList,
  container: Container,
  key: ?string = null,
): React$Portal {
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );
  // TODO: pass ReactDOM portal implementation as third argument
  // $FlowFixMe The Flow type is opaque but there's no way to actually create it.
  return createPortalImpl(children, container, null, key);
}

function scheduleHydration(target: Node) {
  if (target) {
    queueExplicitHydrationTarget(target);
  }
}

function renderSubtreeIntoContainer(
  parentComponent: React$Component<any, any>,
  element: React$Element<any>,
  containerNode: Container,
  callback: ?Function,
) {

  return unstable_renderSubtreeIntoContainer(
    parentComponent,
    element,
    containerNode,
    callback,
  );
}

function unstable_createPortal(
  children: ReactNodeList,
  container: Container,
  key: ?string = null,
) {

  return createPortal(children, container, key);
}

const Internals = {
  // Keep in sync with ReactDOMUnstableNativeDependencies.js
  // ReactTestUtils.js, and ReactTestUtilsAct.js. This is an array for better minification.
  Events: [
    getInstanceFromNode,
    getNodeFromInstance,
    getFiberCurrentPropsFromNode,
    injectEventPluginsByName,
    eventNameDispatchConfigs,
    accumulateTwoPhaseDispatches,
    accumulateDirectDispatches,
    enqueueStateRestore,
    restoreStateIfNeeded,
    dispatchEvent,
    runEventsInBatch,
    flushPassiveEffects,
    IsThisRendererActing,
  ],
};

export {
  createPortal,
  batchedUpdates as unstable_batchedUpdates,
  flushSync,
  Internals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ReactVersion as version,
  // Disabled behind disableLegacyReactDOMAPIs
  findDOMNode,
  hydrate,
  render,
  unmountComponentAtNode,
  // exposeConcurrentModeAPIs
  createRoot,
  createBlockingRoot,
  discreteUpdates as unstable_discreteUpdates,
  flushDiscreteUpdates as unstable_flushDiscreteUpdates,
  flushControlled as unstable_flushControlled,
  scheduleHydration as unstable_scheduleHydration,
  // Disabled behind disableUnstableRenderSubtreeIntoContainer
  renderSubtreeIntoContainer as unstable_renderSubtreeIntoContainer,
  // Disabled behind disableUnstableCreatePortal
  // Temporary alias since we already shipped React 16 RC with it.
  // TODO: remove in React 17.
  unstable_createPortal,
  // enableUseEventAPI
  useEvent as unstable_useEvent,
};

const foundDevTools = injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: __DEV__ ? 1 : 0,
  version: ReactVersion,
  rendererPackageName: 'react-dom',
});

