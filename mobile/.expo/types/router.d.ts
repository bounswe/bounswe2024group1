/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/search` | `/_sitemap` | `/explore` | `/home` | `/login` | `/logout` | `/search` | `/signup`;
      DynamicRoutes: `/question/${Router.SingleRoutePart<T>}` | `/users/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/question/[questionId]` | `/users/[userId]`;
    }
  }
}
