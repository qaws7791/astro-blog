import * as React from "react";

interface RegistryType {
  [key: string]: {
    component: React.LazyExoticComponent<React.ComponentType<any>>;
  };
}

export const Registry: RegistryType = {
  tabs: {
    component: React.lazy(() => import("./motion/Tabs")),
  },
  circle: {
    component: React.lazy(() => import("./motion/Circle")),
  },
  scrollTriggeredAnimation: {
    component: React.lazy(() => import("./motion/ScrollTriggeredAnimation")),
  },
  motionValues: {
    component: React.lazy(() => import("./motion/MotionValues")),
  },
  whileExample: {
    component: React.lazy(() => import("./motion/WhileExample")),
  },
  variantsExample: {
    component: React.lazy(() => import("./motion/VariantsExample")),
  },
  motionValueExample: {
    component: React.lazy(() => import("./motion/MotionValueExample")),
  },
  layoutAnimationExample: {
    component: React.lazy(() => import("./motion/LayoutAnimationExample")),
  },
};
