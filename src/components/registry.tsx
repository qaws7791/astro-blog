import * as React from 'react'

interface RegistryType {
  [key: string]: {
    component: React.LazyExoticComponent<React.ComponentType<any>>
  }
}

export const Registry: RegistryType = {
  tabs: {
    component: React.lazy(() => import('./motion/Tabs')),
  },
  circle: {
    component: React.lazy(() => import('./motion/Circle')),
  },
}
