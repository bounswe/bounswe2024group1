"use client";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import React from "react";
import { View } from "react-native";

export const LinearGradient = React.forwardRef(
  ({ className, ...props }: any, ref?: any) => {
    // @ts-ignore
    return <View {...props} className={tva({ base: className })} ref={ref} />;
  }
);
