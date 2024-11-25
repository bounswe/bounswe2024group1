/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/profile` | `/(tabs)/search` | `/_sitemap` | `/home` | `/login` | `/logout` | `/profile` | `/question/new` | `/search` | `/signup`;
      DynamicRoutes: `/question/${Router.SingleRoutePart<T>}` | `/question/${Router.SingleRoutePart<T>}/answer` | `/tags/${Router.SingleRoutePart<T>}` | `/users/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/question/[questionId]` | `/question/[questionId]/answer` | `/tags/[tagId]` | `/users/[userId]`;
    }
  }
}
