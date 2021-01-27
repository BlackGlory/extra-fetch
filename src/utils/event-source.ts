import nodeEventSource from 'eventsource'

export const EventSource = nodeEventSource as any as typeof globalThis.EventSource
