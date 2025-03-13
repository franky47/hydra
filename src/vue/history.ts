// This file contains a fork of vue-router's memory history implementation,
// with patches to trigger listeners on navigation events.

import { RouterHistory } from 'vue-router'

// https://github.com/vuejs/router/tree/main/packages/router/src/history/common.ts

export type HistoryLocation = string
/**
 * Allowed variables in HTML5 history state. Note that pushState clones the state
 * passed and does not accept everything: e.g.: it doesn't accept symbols, nor
 * functions as values. It also ignores Symbols as keys.
 *
 * @internal
 */
export type HistoryStateValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | HistoryState
  | HistoryStateArray

/**
 * Allowed HTML history.state
 */
export interface HistoryState {
  [x: number]: HistoryStateValue
  [x: string]: HistoryStateValue
}

/**
 * Allowed arrays for history.state.
 *
 * @internal
 */
export interface HistoryStateArray extends Array<HistoryStateValue> {}

export enum NavigationType {
  pop = 'pop',
  push = 'push'
}

export enum NavigationDirection {
  back = 'back',
  forward = 'forward',
  unknown = ''
}

export interface NavigationInformation {
  type: NavigationType
  direction: NavigationDirection
  delta: number
}

export interface NavigationCallback {
  (
    to: HistoryLocation,
    from: HistoryLocation,
    information: NavigationInformation
  ): void
}

/**
 * Starting location for Histories
 */
export const START: HistoryLocation = ''

export type ValueContainer<T> = { value: T }

// remove any character before the hash
const BEFORE_HASH_RE = /^[^#]+#/
export function createHref(base: string, location: HistoryLocation): string {
  return base.replace(BEFORE_HASH_RE, '#') + location
}

// https://github.com/vuejs/router/tree/main/packages/router/src/history/memory.ts
// with patch to trigger listeners on navigation

export function createMemoryHistory(base: string = ''): RouterHistory {
  let listeners: NavigationCallback[] = []
  let queue: HistoryLocation[] = [START]
  let position: number = 0

  function setLocation(location: HistoryLocation) {
    position++
    if (position !== queue.length) {
      // we are in the middle, we remove everything from here in the queue
      queue.splice(position)
    }
    queue.push(location)
  }

  function triggerListeners(
    to: HistoryLocation,
    from: HistoryLocation,
    { direction, delta }: Pick<NavigationInformation, 'direction' | 'delta'>
  ): void {
    const info: NavigationInformation = {
      direction,
      delta,
      type: NavigationType.pop
    }
    for (const callback of listeners) {
      callback(to, from, info)
    }
  }

  const routerHistory: RouterHistory = {
    // rewritten by Object.defineProperty
    location: START,
    // TODO: should be kept in queue
    state: {},
    base,
    createHref: createHref.bind(null, base),

    replace(to) {
      const from = queue[position]
      // remove current entry and decrement position
      queue.splice(position--, 1)
      setLocation(to)
      triggerListeners(to, from, {
        direction: NavigationDirection.unknown,
        delta: 0
      })
    },

    push(to, data?: HistoryState) {
      const from = queue[position]
      setLocation(to)
      triggerListeners(to, from, {
        direction: NavigationDirection.forward,
        delta: 1
      })
    },

    listen(callback) {
      listeners.push(callback)
      return () => {
        const index = listeners.indexOf(callback)
        if (index > -1) listeners.splice(index, 1)
      }
    },
    destroy() {
      listeners = []
      queue = [START]
      position = 0
    },

    go(delta, shouldTrigger = true) {
      const from = this.location
      const direction: NavigationDirection =
        // we are considering delta === 0 going forward, but in abstract mode
        // using 0 for the delta doesn't make sense like it does in html5 where
        // it reloads the page
        delta < 0 ? NavigationDirection.back : NavigationDirection.forward
      position = Math.max(0, Math.min(position + delta, queue.length - 1))
      if (shouldTrigger) {
        triggerListeners(this.location, from, {
          direction,
          delta
        })
      }
    }
  }

  Object.defineProperty(routerHistory, 'location', {
    enumerable: true,
    get: () => queue[position]
  })

  return routerHistory
}
