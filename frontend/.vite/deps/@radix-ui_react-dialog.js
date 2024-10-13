import {
  $5e63c961fc1ce211$export$8c6ed5c666ac1360,
  $6ed0406888f73fc4$export$c7b2cbe3552a0d05,
  _extends,
} from "./chunk-3DAJZT57.js";
import { require_react_dom } from "./chunk-45PRXBEC.js";
import { require_react } from "./chunk-E55NSNTN.js";
import { __toESM } from "./chunk-4MBMRILA.js";

// node_modules/@radix-ui/react-dialog/dist/index.mjs
var import_react15 = __toESM(require_react(), 1);

// node_modules/@radix-ui/primitive/dist/index.mjs
function $e42e1063c40fb3ef$export$b9ecd428b558ff10(
  originalEventHandler,
  ourEventHandler,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event) {
    originalEventHandler === null ||
      originalEventHandler === void 0 ||
      originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented)
      return ourEventHandler === null || ourEventHandler === void 0
        ? void 0
        : ourEventHandler(event);
  };
}

// node_modules/@radix-ui/react-context/dist/index.mjs
var import_react = __toESM(require_react(), 1);
function $c512c27ab02ef895$export$fd42f52fd3ae1109(
  rootComponentName,
  defaultContext,
) {
  const Context = (0, import_react.createContext)(defaultContext);
  function Provider(props) {
    const { children, ...context } = props;
    const value = (0, import_react.useMemo)(
      () => context,
      Object.values(context),
    );
    return (0, import_react.createElement)(
      Context.Provider,
      {
        value,
      },
      children,
    );
  }
  function useContext(consumerName) {
    const context = (0, import_react.useContext)(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(
      `\`${consumerName}\` must be used within \`${rootComponentName}\``,
    );
  }
  Provider.displayName = rootComponentName + "Provider";
  return [Provider, useContext];
}
function $c512c27ab02ef895$export$50c7b4e9d9f19c1(
  scopeName,
  createContextScopeDeps = [],
) {
  let defaultContexts = [];
  function $c512c27ab02ef895$export$fd42f52fd3ae11092(
    rootComponentName,
    defaultContext,
  ) {
    const BaseContext = (0, import_react.createContext)(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    function Provider(props) {
      const { scope, children, ...context } = props;
      const Context =
        (scope === null || scope === void 0
          ? void 0
          : scope[scopeName][index]) || BaseContext;
      const value = (0, import_react.useMemo)(
        () => context,
        Object.values(context),
      );
      return (0, import_react.createElement)(
        Context.Provider,
        {
          value,
        },
        children,
      );
    }
    function useContext(consumerName, scope) {
      const Context =
        (scope === null || scope === void 0
          ? void 0
          : scope[scopeName][index]) || BaseContext;
      const context = (0, import_react.useContext)(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(
        `\`${consumerName}\` must be used within \`${rootComponentName}\``,
      );
    }
    Provider.displayName = rootComponentName + "Provider";
    return [Provider, useContext];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return (0, import_react.createContext)(defaultContext);
    });
    return function useScope(scope) {
      const contexts =
        (scope === null || scope === void 0 ? void 0 : scope[scopeName]) ||
        scopeContexts;
      return (0, import_react.useMemo)(
        () => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts,
          },
        }),
        [scope, contexts],
      );
    };
  };
  createScope.scopeName = scopeName;
  return [
    $c512c27ab02ef895$export$fd42f52fd3ae11092,
    $c512c27ab02ef895$var$composeContextScopes(
      createScope,
      ...createContextScopeDeps,
    ),
  ];
}
function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope1 = () => {
    const scopeHooks = scopes.map((createScope) => ({
      useScope: createScope(),
      scopeName: createScope.scopeName,
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes1 = scopeHooks.reduce(
        (nextScopes, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return {
            ...nextScopes,
            ...currentScope,
          };
        },
        {},
      );
      return (0, import_react.useMemo)(
        () => ({
          [`__scope${baseScope.scopeName}`]: nextScopes1,
        }),
        [nextScopes1],
      );
    };
  };
  createScope1.scopeName = baseScope.scopeName;
  return createScope1;
}

// node_modules/@radix-ui/react-id/dist/index.mjs
var $2AODx$react = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
var $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(
  globalThis === null || globalThis === void 0 ? void 0 : globalThis.document,
)
  ? import_react2.useLayoutEffect
  : () => {};

// node_modules/@radix-ui/react-id/dist/index.mjs
var $1746a345f3d73bb7$var$useReactId =
  $2AODx$react["useId".toString()] || (() => void 0);
var $1746a345f3d73bb7$var$count = 0;
function $1746a345f3d73bb7$export$f680877a34711e37(deterministicId) {
  const [id, setId] = $2AODx$react.useState($1746a345f3d73bb7$var$useReactId());
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (!deterministicId)
      setId((reactId) =>
        reactId !== null && reactId !== void 0
          ? reactId
          : String($1746a345f3d73bb7$var$count++),
      );
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var import_react4 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
  const callbackRef = (0, import_react3.useRef)(callback);
  (0, import_react3.useEffect)(() => {
    callbackRef.current = callback;
  });
  return (0, import_react3.useMemo)(
    () =>
      (...args) => {
        var _callbackRef$current;
        return (_callbackRef$current = callbackRef.current) === null ||
          _callbackRef$current === void 0
          ? void 0
          : _callbackRef$current.call(callbackRef, ...args);
      },
    [],
  );
}

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
function $71cd76cc60e0454e$export$6f32135080cb4c3({
  prop,
  defaultProp,
  onChange = () => {},
}) {
  const [uncontrolledProp, setUncontrolledProp] =
    $71cd76cc60e0454e$var$useUncontrolledState({
      defaultProp,
      onChange,
    });
  const isControlled = prop !== void 0;
  const value1 = isControlled ? prop : uncontrolledProp;
  const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
  const setValue = (0, import_react4.useCallback)(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) handleChange(value);
      } else setUncontrolledProp(nextValue);
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  );
  return [value1, setValue];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp, onChange }) {
  const uncontrolledState = (0, import_react4.useState)(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = (0, import_react4.useRef)(value);
  const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
  (0, import_react4.useEffect)(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var import_react7 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_react5 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var $8927f6f2acc4f386$var$NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul",
];
var $8927f6f2acc4f386$export$250ffa63cdc0d034 =
  $8927f6f2acc4f386$var$NODES.reduce((primitive, node) => {
    const Node = (0, import_react5.forwardRef)((props, forwardedRef) => {
      const { asChild, ...primitiveProps } = props;
      const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : node;
      (0, import_react5.useEffect)(() => {
        window[Symbol.for("radix-ui")] = true;
      }, []);
      return (0, import_react5.createElement)(
        Comp,
        _extends({}, primitiveProps, {
          ref: forwardedRef,
        }),
      );
    });
    Node.displayName = `Primitive.${node}`;
    return {
      ...primitive,
      [node]: Node,
    };
  }, {});
function $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event) {
  if (target)
    (0, import_react_dom.flushSync)(() => target.dispatchEvent(event));
}

// node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
var import_react6 = __toESM(require_react(), 1);
function $addc16e1bbe58fd0$export$3a72a57244d6e765(
  onEscapeKeyDownProp,
  ownerDocument = globalThis === null || globalThis === void 0
    ? void 0
    : globalThis.document,
) {
  const onEscapeKeyDown =
    $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onEscapeKeyDownProp);
  (0, import_react6.useEffect)(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onEscapeKeyDown(event);
    };
    ownerDocument.addEventListener("keydown", handleKeyDown);
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown);
  }, [onEscapeKeyDown, ownerDocument]);
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var $5cb92bef7577960e$var$DISMISSABLE_LAYER_NAME = "DismissableLayer";
var $5cb92bef7577960e$var$CONTEXT_UPDATE = "dismissableLayer.update";
var $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE =
  "dismissableLayer.pointerDownOutside";
var $5cb92bef7577960e$var$FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var $5cb92bef7577960e$var$originalBodyPointerEvents;
var $5cb92bef7577960e$var$DismissableLayerContext = (0,
import_react7.createContext)({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
});
var $5cb92bef7577960e$export$177fb62ff3ec1f22 = (0, import_react7.forwardRef)(
  (props, forwardedRef) => {
    var _node$ownerDocument;
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = (0, import_react7.useContext)(
      $5cb92bef7577960e$var$DismissableLayerContext,
    );
    const [node1, setNode] = (0, import_react7.useState)(null);
    const ownerDocument =
      (_node$ownerDocument =
        node1 === null || node1 === void 0 ? void 0 : node1.ownerDocument) !==
        null && _node$ownerDocument !== void 0
        ? _node$ownerDocument
        : globalThis === null || globalThis === void 0
          ? void 0
          : globalThis.document;
    const [, force] = (0, import_react7.useState)({});
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
      forwardedRef,
      (node) => setNode(node),
    );
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
      ...context.layersWithOutsidePointerEventsDisabled,
    ].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(
      highestLayerWithOutsidePointerEventsDisabled,
    );
    const index = node1 ? layers.indexOf(node1) : -1;
    const isBodyPointerEventsDisabled =
      context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled =
      index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = $5cb92bef7577960e$var$usePointerDownOutside(
      (event) => {
        const target = event.target;
        const isPointerDownOnBranch = [...context.branches].some((branch) =>
          branch.contains(target),
        );
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside === null ||
          onPointerDownOutside === void 0 ||
          onPointerDownOutside(event);
        onInteractOutside === null ||
          onInteractOutside === void 0 ||
          onInteractOutside(event);
        if (!event.defaultPrevented)
          onDismiss === null || onDismiss === void 0 || onDismiss();
      },
      ownerDocument,
    );
    const focusOutside = $5cb92bef7577960e$var$useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) =>
        branch.contains(target),
      );
      if (isFocusInBranch) return;
      onFocusOutside === null ||
        onFocusOutside === void 0 ||
        onFocusOutside(event);
      onInteractOutside === null ||
        onInteractOutside === void 0 ||
        onInteractOutside(event);
      if (!event.defaultPrevented)
        onDismiss === null || onDismiss === void 0 || onDismiss();
    }, ownerDocument);
    $addc16e1bbe58fd0$export$3a72a57244d6e765((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown === null ||
        onEscapeKeyDown === void 0 ||
        onEscapeKeyDown(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    (0, import_react7.useEffect)(() => {
      if (!node1) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          $5cb92bef7577960e$var$originalBodyPointerEvents =
            ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node1);
      }
      context.layers.add(node1);
      $5cb92bef7577960e$var$dispatchUpdate();
      return () => {
        if (
          disableOutsidePointerEvents &&
          context.layersWithOutsidePointerEventsDisabled.size === 1
        )
          ownerDocument.body.style.pointerEvents =
            $5cb92bef7577960e$var$originalBodyPointerEvents;
      };
    }, [node1, ownerDocument, disableOutsidePointerEvents, context]);
    (0, import_react7.useEffect)(() => {
      return () => {
        if (!node1) return;
        context.layers.delete(node1);
        context.layersWithOutsidePointerEventsDisabled.delete(node1);
        $5cb92bef7577960e$var$dispatchUpdate();
      };
    }, [node1, context]);
    (0, import_react7.useEffect)(() => {
      const handleUpdate = () => force({});
      document.addEventListener(
        $5cb92bef7577960e$var$CONTEXT_UPDATE,
        handleUpdate,
      );
      return () =>
        document.removeEventListener(
          $5cb92bef7577960e$var$CONTEXT_UPDATE,
          handleUpdate,
        );
    }, []);
    return (0, import_react7.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.div,
      _extends({}, layerProps, {
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled
            ? isPointerEventsEnabled
              ? "auto"
              : "none"
            : void 0,
          ...props.style,
        },
        onFocusCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
          props.onFocusCapture,
          focusOutside.onFocusCapture,
        ),
        onBlurCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
          props.onBlurCapture,
          focusOutside.onBlurCapture,
        ),
        onPointerDownCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture,
        ),
      }),
    );
  },
);
Object.assign($5cb92bef7577960e$export$177fb62ff3ec1f22, {
  displayName: $5cb92bef7577960e$var$DISMISSABLE_LAYER_NAME,
});
var $5cb92bef7577960e$var$BRANCH_NAME = "DismissableLayerBranch";
var $5cb92bef7577960e$export$4d5eb2109db14228 = (0, import_react7.forwardRef)(
  (props, forwardedRef) => {
    const context = (0, import_react7.useContext)(
      $5cb92bef7577960e$var$DismissableLayerContext,
    );
    const ref = (0, import_react7.useRef)(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
      forwardedRef,
      ref,
    );
    (0, import_react7.useEffect)(() => {
      const node = ref.current;
      if (node) {
        context.branches.add(node);
        return () => {
          context.branches.delete(node);
        };
      }
    }, [context.branches]);
    return (0, import_react7.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.div,
      _extends({}, props, {
        ref: composedRefs,
      }),
    );
  },
);
Object.assign($5cb92bef7577960e$export$4d5eb2109db14228, {
  displayName: $5cb92bef7577960e$var$BRANCH_NAME,
});
function $5cb92bef7577960e$var$usePointerDownOutside(
  onPointerDownOutside,
  ownerDocument = globalThis === null || globalThis === void 0
    ? void 0
    : globalThis.document,
) {
  const handlePointerDownOutside =
    $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onPointerDownOutside);
  const isPointerInsideReactTreeRef = (0, import_react7.useRef)(false);
  const handleClickRef = (0, import_react7.useRef)(() => {});
  (0, import_react7.useEffect)(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent = function () {
          $5cb92bef7577960e$var$handleAndDispatchCustomEvent(
            $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            {
              discrete: true,
            },
          );
        };
        const eventDetail = {
          originalEvent: event,
        };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener("click", handleClickRef.current, {
            once: true,
          });
        } else handleAndDispatchPointerDownOutsideEvent();
      } else ownerDocument.removeEventListener("click", handleClickRef.current);
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => (isPointerInsideReactTreeRef.current = true),
  };
}
function $5cb92bef7577960e$var$useFocusOutside(
  onFocusOutside,
  ownerDocument = globalThis === null || globalThis === void 0
    ? void 0
    : globalThis.document,
) {
  const handleFocusOutside =
    $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onFocusOutside);
  const isFocusInsideReactTreeRef = (0, import_react7.useRef)(false);
  (0, import_react7.useEffect)(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = {
          originalEvent: event,
        };
        $5cb92bef7577960e$var$handleAndDispatchCustomEvent(
          $5cb92bef7577960e$var$FOCUS_OUTSIDE,
          handleFocusOutside,
          eventDetail,
          {
            discrete: false,
          },
        );
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => (isFocusInsideReactTreeRef.current = true),
    onBlurCapture: () => (isFocusInsideReactTreeRef.current = false),
  };
}
function $5cb92bef7577960e$var$dispatchUpdate() {
  const event = new CustomEvent($5cb92bef7577960e$var$CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function $5cb92bef7577960e$var$handleAndDispatchCustomEvent(
  name,
  handler,
  detail,
  { discrete },
) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail,
  });
  if (handler)
    target.addEventListener(name, handler, {
      once: true,
    });
  if (discrete) $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event);
  else target.dispatchEvent(event);
}

// node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var import_react8 = __toESM(require_react(), 1);
var $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT =
  "focusScope.autoFocusOnUnmount";
var $d3863c46a17e8a28$var$EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true,
};
var $d3863c46a17e8a28$var$FOCUS_SCOPE_NAME = "FocusScope";
var $d3863c46a17e8a28$export$20e40289641fbbb6 = (0, import_react8.forwardRef)(
  (props, forwardedRef) => {
    const {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...scopeProps
    } = props;
    const [container1, setContainer] = (0, import_react8.useState)(null);
    const onMountAutoFocus =
      $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onMountAutoFocusProp);
    const onUnmountAutoFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(
      onUnmountAutoFocusProp,
    );
    const lastFocusedElementRef = (0, import_react8.useRef)(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
      forwardedRef,
      (node) => setContainer(node),
    );
    const focusScope = (0, import_react8.useRef)({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;
    (0, import_react8.useEffect)(() => {
      if (trapped) {
        let handleFocusIn = function (event) {
            if (focusScope.paused || !container1) return;
            const target = event.target;
            if (container1.contains(target))
              lastFocusedElementRef.current = target;
            else
              $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
                select: true,
              });
          },
          handleFocusOut = function (event) {
            if (focusScope.paused || !container1) return;
            const relatedTarget = event.relatedTarget;
            if (relatedTarget === null) return;
            if (!container1.contains(relatedTarget))
              $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
                select: true,
              });
          },
          handleMutations = function (mutations) {
            const focusedElement = document.activeElement;
            if (focusedElement !== document.body) return;
            for (const mutation of mutations)
              if (mutation.removedNodes.length > 0)
                $d3863c46a17e8a28$var$focus(container1);
          };
        document.addEventListener("focusin", handleFocusIn);
        document.addEventListener("focusout", handleFocusOut);
        const mutationObserver = new MutationObserver(handleMutations);
        if (container1)
          mutationObserver.observe(container1, {
            childList: true,
            subtree: true,
          });
        return () => {
          document.removeEventListener("focusin", handleFocusIn);
          document.removeEventListener("focusout", handleFocusOut);
          mutationObserver.disconnect();
        };
      }
    }, [trapped, container1, focusScope.paused]);
    (0, import_react8.useEffect)(() => {
      if (container1) {
        $d3863c46a17e8a28$var$focusScopesStack.add(focusScope);
        const previouslyFocusedElement = document.activeElement;
        const hasFocusedCandidate = container1.contains(
          previouslyFocusedElement,
        );
        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(
            $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT,
            $d3863c46a17e8a28$var$EVENT_OPTIONS,
          );
          container1.addEventListener(
            $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT,
            onMountAutoFocus,
          );
          container1.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            $d3863c46a17e8a28$var$focusFirst(
              $d3863c46a17e8a28$var$removeLinks(
                $d3863c46a17e8a28$var$getTabbableCandidates(container1),
              ),
              {
                select: true,
              },
            );
            if (document.activeElement === previouslyFocusedElement)
              $d3863c46a17e8a28$var$focus(container1);
          }
        }
        return () => {
          container1.removeEventListener(
            $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT,
            onMountAutoFocus,
          );
          setTimeout(() => {
            const unmountEvent = new CustomEvent(
              $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT,
              $d3863c46a17e8a28$var$EVENT_OPTIONS,
            );
            container1.addEventListener(
              $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT,
              onUnmountAutoFocus,
            );
            container1.dispatchEvent(unmountEvent);
            if (!unmountEvent.defaultPrevented)
              $d3863c46a17e8a28$var$focus(
                previouslyFocusedElement !== null &&
                  previouslyFocusedElement !== void 0
                  ? previouslyFocusedElement
                  : document.body,
                {
                  select: true,
                },
              );
            container1.removeEventListener(
              $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT,
              onUnmountAutoFocus,
            );
            $d3863c46a17e8a28$var$focusScopesStack.remove(focusScope);
          }, 0);
        };
      }
    }, [container1, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
    const handleKeyDown = (0, import_react8.useCallback)(
      (event) => {
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey =
          event.key === "Tab" &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
          const container = event.currentTarget;
          const [first, last] =
            $d3863c46a17e8a28$var$getTabbableEdges(container);
          const hasTabbableElementsInside = first && last;
          if (!hasTabbableElementsInside) {
            if (focusedElement === container) event.preventDefault();
          } else {
            if (!event.shiftKey && focusedElement === last) {
              event.preventDefault();
              if (loop)
                $d3863c46a17e8a28$var$focus(first, {
                  select: true,
                });
            } else if (event.shiftKey && focusedElement === first) {
              event.preventDefault();
              if (loop)
                $d3863c46a17e8a28$var$focus(last, {
                  select: true,
                });
            }
          }
        }
      },
      [loop, trapped, focusScope.paused],
    );
    return (0, import_react8.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.div,
      _extends(
        {
          tabIndex: -1,
        },
        scopeProps,
        {
          ref: composedRefs,
          onKeyDown: handleKeyDown,
        },
      ),
    );
  },
);
Object.assign($d3863c46a17e8a28$export$20e40289641fbbb6, {
  displayName: $d3863c46a17e8a28$var$FOCUS_SCOPE_NAME,
});
function $d3863c46a17e8a28$var$focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    $d3863c46a17e8a28$var$focus(candidate, {
      select,
    });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function $d3863c46a17e8a28$var$getTabbableEdges(container) {
  const candidates = $d3863c46a17e8a28$var$getTabbableCandidates(container);
  const first = $d3863c46a17e8a28$var$findVisible(candidates, container);
  const last = $d3863c46a17e8a28$var$findVisible(
    candidates.reverse(),
    container,
  );
  return [first, last];
}
function $d3863c46a17e8a28$var$getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function $d3863c46a17e8a28$var$findVisible(elements, container) {
  for (const element of elements) {
    if (
      !$d3863c46a17e8a28$var$isHidden(element, {
        upTo: container,
      })
    )
      return element;
  }
}
function $d3863c46a17e8a28$var$isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function $d3863c46a17e8a28$var$isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function $d3863c46a17e8a28$var$focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({
      preventScroll: true,
    });
    if (
      element !== previouslyFocusedElement &&
      $d3863c46a17e8a28$var$isSelectableInput(element) &&
      select
    )
      element.select();
  }
}
var $d3863c46a17e8a28$var$focusScopesStack =
  $d3863c46a17e8a28$var$createFocusScopesStack();
function $d3863c46a17e8a28$var$createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope)
        activeFocusScope === null ||
          activeFocusScope === void 0 ||
          activeFocusScope.pause();
      stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      var _stack$;
      stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
      (_stack$ = stack[0]) === null || _stack$ === void 0 || _stack$.resume();
    },
  };
}
function $d3863c46a17e8a28$var$arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) updatedArray.splice(index, 1);
  return updatedArray;
}
function $d3863c46a17e8a28$var$removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}

// node_modules/@radix-ui/react-portal/dist/index.mjs
var import_react9 = __toESM(require_react(), 1);
var import_react_dom2 = __toESM(require_react_dom(), 1);
var $f1701beae083dbae$var$PORTAL_NAME = "Portal";
var $f1701beae083dbae$export$602eac185826482c = (0, import_react9.forwardRef)(
  (props, forwardedRef) => {
    var _globalThis$document;
    const {
      container = globalThis === null || globalThis === void 0
        ? void 0
        : (_globalThis$document = globalThis.document) === null ||
            _globalThis$document === void 0
          ? void 0
          : _globalThis$document.body,
      ...portalProps
    } = props;
    return container
      ? import_react_dom2.default.createPortal(
          (0, import_react9.createElement)(
            $8927f6f2acc4f386$export$250ffa63cdc0d034.div,
            _extends({}, portalProps, {
              ref: forwardedRef,
            }),
          ),
          container,
        )
      : null;
  },
);
Object.assign($f1701beae083dbae$export$602eac185826482c, {
  displayName: $f1701beae083dbae$var$PORTAL_NAME,
});

// node_modules/@radix-ui/react-presence/dist/index.mjs
var import_react10 = __toESM(require_react(), 1);
var import_react_dom3 = __toESM(require_react_dom(), 1);
function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
  return (0, import_react10.useReducer)((state, event) => {
    const nextState = machine[state][event];
    return nextState !== null && nextState !== void 0 ? nextState : state;
  }, initialState);
}
var $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props) => {
  const { present, children } = props;
  const presence = $921a889cee6df7e8$var$usePresence(present);
  const child =
    typeof children === "function"
      ? children({
          present: presence.isPresent,
        })
      : import_react10.Children.only(children);
  const ref = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    presence.ref,
    child.ref,
  );
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent
    ? (0, import_react10.cloneElement)(child, {
        ref,
      })
    : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = "Presence";
function $921a889cee6df7e8$var$usePresence(present) {
  const [node1, setNode] = (0, import_react10.useState)();
  const stylesRef = (0, import_react10.useRef)({});
  const prevPresentRef = (0, import_react10.useRef)(present);
  const prevAnimationNameRef = (0, import_react10.useRef)("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(
    initialState,
    {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended",
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted",
      },
      unmounted: {
        MOUNT: "mounted",
      },
    },
  );
  (0, import_react10.useEffect)(() => {
    const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(
      stylesRef.current,
    );
    prevAnimationNameRef.current =
      state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName =
        $921a889cee6df7e8$var$getAnimationName(styles);
      if (present) send("MOUNT");
      else if (
        currentAnimationName === "none" ||
        (styles === null || styles === void 0 ? void 0 : styles.display) ===
          "none"
      )
        send("UNMOUNT");
      else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) send("ANIMATION_OUT");
        else send("UNMOUNT");
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (node1) {
      const handleAnimationEnd = (event) => {
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(
          stylesRef.current,
        );
        const isCurrentAnimation = currentAnimationName.includes(
          event.animationName,
        );
        if (event.target === node1 && isCurrentAnimation)
          (0, import_react_dom3.flushSync)(() => send("ANIMATION_END"));
      };
      const handleAnimationStart = (event) => {
        if (event.target === node1)
          prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(
            stylesRef.current,
          );
      };
      node1.addEventListener("animationstart", handleAnimationStart);
      node1.addEventListener("animationcancel", handleAnimationEnd);
      node1.addEventListener("animationend", handleAnimationEnd);
      return () => {
        node1.removeEventListener("animationstart", handleAnimationStart);
        node1.removeEventListener("animationcancel", handleAnimationEnd);
        node1.removeEventListener("animationend", handleAnimationEnd);
      };
    } else send("ANIMATION_END");
  }, [node1, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: (0, import_react10.useCallback)((node) => {
      if (node) stylesRef.current = getComputedStyle(node);
      setNode(node);
    }, []),
  };
}
function $921a889cee6df7e8$var$getAnimationName(styles) {
  return (
    (styles === null || styles === void 0 ? void 0 : styles.animationName) ||
    "none"
  );
}

// node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var import_react11 = __toESM(require_react(), 1);
var $3db38b7d1fb3fe6a$var$count = 0;
function $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c() {
  (0, import_react11.useEffect)(() => {
    var _edgeGuards$, _edgeGuards$2;
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      (_edgeGuards$ = edgeGuards[0]) !== null && _edgeGuards$ !== void 0
        ? _edgeGuards$
        : $3db38b7d1fb3fe6a$var$createFocusGuard(),
    );
    document.body.insertAdjacentElement(
      "beforeend",
      (_edgeGuards$2 = edgeGuards[1]) !== null && _edgeGuards$2 !== void 0
        ? _edgeGuards$2
        : $3db38b7d1fb3fe6a$var$createFocusGuard(),
    );
    $3db38b7d1fb3fe6a$var$count++;
    return () => {
      if ($3db38b7d1fb3fe6a$var$count === 1)
        document
          .querySelectorAll("[data-radix-focus-guard]")
          .forEach((node) => node.remove());
      $3db38b7d1fb3fe6a$var$count--;
    };
  }, []);
}
function $3db38b7d1fb3fe6a$var$createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.cssText =
    "outline: none; opacity: 0; position: fixed; pointer-events: none";
  return element;
}

// node_modules/tslib/tslib.es6.mjs
var __assign = function () {
  __assign =
    Object.assign ||
    function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var React9 = __toESM(require_react());

// node_modules/react-remove-scroll/dist/es2015/UI.js
var React5 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

// node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// node_modules/use-callback-ref/dist/es2015/useRef.js
var import_react12 = __toESM(require_react());
function useCallbackRef(initialValue, callback) {
  var ref = (0, import_react12.useState)(function () {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        },
      },
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var React = __toESM(require_react());
var useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef(defaultValue || null, function (newValue) {
    return refs.forEach(function (ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(
    function () {
      var oldValue = currentValues.get(callbackRef);
      if (oldValue) {
        var prevRefs_1 = new Set(oldValue);
        var nextRefs_1 = new Set(refs);
        var current_1 = callbackRef.current;
        prevRefs_1.forEach(function (ref) {
          if (!nextRefs_1.has(ref)) {
            assignRef(ref, null);
          }
        });
        nextRefs_1.forEach(function (ref) {
          if (!prevRefs_1.has(ref)) {
            assignRef(ref, current_1);
          }
        });
      }
      currentValues.set(callbackRef, refs);
    },
    [refs],
  );
  return callbackRef;
}

// node_modules/use-sidecar/dist/es2015/hoc.js
var React2 = __toESM(require_react());

// node_modules/use-sidecar/dist/es2015/hook.js
var import_react13 = __toESM(require_react());

// node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function () {
      if (assigned) {
        throw new Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function (data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function () {
        buffer = buffer.filter(function (x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function (cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function (x) {
          return cb(x);
        },
        filter: function () {
          return buffer;
        },
      };
    },
    assignMedium: function (cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function () {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function () {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function (x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function (filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        },
      };
    },
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}

// node_modules/use-sidecar/dist/es2015/renderProp.js
var React3 = __toESM(require_react());
var import_react14 = __toESM(require_react());

// node_modules/use-sidecar/dist/es2015/exports.js
var React4 = __toESM(require_react());
var SideCar = function (_a) {
  var sideCar = _a.sideCar,
    rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React4.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

// node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function () {
  return;
};
var RemoveScroll = React5.forwardRef(function (props, parentRef) {
  var ref = React5.useRef(null);
  var _a = React5.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing,
    }),
    callbacks = _a[0],
    setCallbacks = _a[1];
  var forwardProps = props.forwardProps,
    children = props.children,
    className = props.className,
    removeScrollBar = props.removeScrollBar,
    enabled = props.enabled,
    shards = props.shards,
    sideCar = props.sideCar,
    noIsolation = props.noIsolation,
    inert = props.inert,
    allowPinchZoom = props.allowPinchZoom,
    _b = props.as,
    Container = _b === void 0 ? "div" : _b,
    rest = __rest(props, [
      "forwardProps",
      "children",
      "className",
      "removeScrollBar",
      "enabled",
      "shards",
      "sideCar",
      "noIsolation",
      "inert",
      "allowPinchZoom",
      "as",
    ]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React5.createElement(
    React5.Fragment,
    null,
    enabled &&
      React5.createElement(SideCar2, {
        sideCar: effectCar,
        removeScrollBar,
        shards,
        noIsolation,
        inert,
        setCallbacks,
        allowPinchZoom: !!allowPinchZoom,
        lockRef: ref,
      }),
    forwardProps
      ? React5.cloneElement(
          React5.Children.only(children),
          __assign(__assign({}, containerProps), { ref: containerRef }),
        )
      : React5.createElement(
          Container,
          __assign({}, containerProps, { className, ref: containerRef }),
          children,
        ),
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false,
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var React8 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var React7 = __toESM(require_react());

// node_modules/react-style-singleton/dist/es2015/hook.js
var React6 = __toESM(require_react());

// node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function () {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};

// node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document) return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function () {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function (style) {
      if (counter == 0) {
        if ((stylesheet = makeStyleTag())) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function () {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    },
  };
};

// node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function () {
  var sheet = stylesheetSingleton();
  return function (styles, isDynamic) {
    React6.useEffect(
      function () {
        sheet.add(styles);
        return function () {
          sheet.remove();
        };
      },
      [styles && isDynamic],
    );
  };
};

// node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function () {
  var useStyle = styleHookSingleton();
  var Sheet = function (_a) {
    var styles = _a.styles,
      dynamic = _a.dynamic;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet;
};

// node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0,
};
var parse = function (x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function (gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
  };
};

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function (_a, allowRelative, gapMode, important) {
  var left = _a.left,
    top = _a.top,
    right = _a.right,
    gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  ."
    .concat(noScrollbarsClassName, " {\n   overflow: hidden ")
    .concat(important, ";\n   padding-right: ")
    .concat(gap, "px ")
    .concat(important, ";\n  }\n  body[")
    .concat(lockAttribute, "] {\n    overflow: hidden ")
    .concat(important, ";\n    overscroll-behavior: contain;\n    ")
    .concat(
      [
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === "margin" &&
          "\n    padding-left: "
            .concat(left, "px;\n    padding-top: ")
            .concat(top, "px;\n    padding-right: ")
            .concat(
              right,
              "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ",
            )
            .concat(gap, "px ")
            .concat(important, ";\n    "),
        gapMode === "padding" &&
          "padding-right: ".concat(gap, "px ").concat(important, ";"),
      ]
        .filter(Boolean)
        .join(""),
      "\n  }\n  \n  .",
    )
    .concat(zeroRightClassName, " {\n    right: ")
    .concat(gap, "px ")
    .concat(important, ";\n  }\n  \n  .")
    .concat(fullWidthClassName, " {\n    margin-right: ")
    .concat(gap, "px ")
    .concat(important, ";\n  }\n  \n  .")
    .concat(zeroRightClassName, " .")
    .concat(zeroRightClassName, " {\n    right: 0 ")
    .concat(important, ";\n  }\n  \n  .")
    .concat(fullWidthClassName, " .")
    .concat(fullWidthClassName, " {\n    margin-right: 0 ")
    .concat(important, ";\n  }\n  \n  body[")
    .concat(lockAttribute, "] {\n    ")
    .concat(removedBarSizeVariable, ": ")
    .concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function () {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function () {
  React7.useEffect(function () {
    document.body.setAttribute(
      lockAttribute,
      (getCurrentUseCounter() + 1).toString(),
    );
    return function () {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function (_a) {
  var noRelative = _a.noRelative,
    noImportant = _a.noImportant,
    _b = _a.gapMode,
    gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = React7.useMemo(
    function () {
      return getGapWidth(gapMode);
    },
    [gapMode],
  );
  return React7.createElement(Style, {
    styles: getStyles(
      gap,
      !noRelative,
      gapMode,
      !noImportant ? "!important" : "",
    ),
  });
};

// node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    options = Object.defineProperty({}, "passive", {
      get: function () {
        passiveSupported = true;
        return true;
      },
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function (node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function (node, overflow) {
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(
      styles.overflowY === styles.overflowX &&
      !alwaysContainsScroll(node) &&
      styles[overflow] === "visible"
    )
  );
};
var elementCouldBeVScrolled = function (node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function (node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function (axis, node) {
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current),
        s = _a[1],
        d = _a[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function (_a) {
  var scrollTop = _a.scrollTop,
    scrollHeight = _a.scrollHeight,
    clientHeight = _a.clientHeight;
  return [scrollTop, scrollHeight, clientHeight];
};
var getHScrollVariables = function (_a) {
  var scrollLeft = _a.scrollLeft,
    scrollWidth = _a.scrollWidth,
    clientWidth = _a.clientWidth;
  return [scrollLeft, scrollWidth, clientWidth];
};
var elementCouldBeScrolled = function (axis, node) {
  return axis === "v"
    ? elementCouldBeVScrolled(node)
    : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function (axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function (
  axis,
  endTarget,
  event,
  sourceDelta,
  noOverscroll,
) {
  var directionFactor = getDirectionFactor(
    axis,
    window.getComputedStyle(endTarget).direction,
  );
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target),
      position = _a[0],
      scroll_1 = _a[1],
      capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (
    // portaled content
    (!targetInLock && target !== document.body) || // self content
    (targetInLock && (endTarget.contains(target) || endTarget === target))
  );
  if (
    isDeltaPositive &&
    ((noOverscroll && availableScroll === 0) ||
      (!noOverscroll && delta > availableScroll))
  ) {
    shouldCancelScroll = true;
  } else if (
    !isDeltaPositive &&
    ((noOverscroll && availableScrollTop === 0) ||
      (!noOverscroll && -delta > availableScrollTop))
  ) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function (event) {
  return "changedTouches" in event
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0];
};
var getDeltaXY = function (event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function (ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function (id) {
  return "\n  .block-interactivity-"
    .concat(id, " {pointer-events: none;}\n  .allow-interactivity-")
    .concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React8.useRef([]);
  var touchStartRef = React8.useRef([0, 0]);
  var activeAxis = React8.useRef();
  var id = React8.useState(idCounter++)[0];
  var Style2 = React8.useState(function () {
    return styleSingleton();
  })[0];
  var lastProps = React8.useRef(props);
  React8.useEffect(
    function () {
      lastProps.current = props;
    },
    [props],
  );
  React8.useEffect(
    function () {
      if (props.inert) {
        document.body.classList.add("block-interactivity-".concat(id));
        var allow_1 = __spreadArray(
          [props.lockRef.current],
          (props.shards || []).map(extractRef),
          true,
        ).filter(Boolean);
        allow_1.forEach(function (el) {
          return el.classList.add("allow-interactivity-".concat(id));
        });
        return function () {
          document.body.classList.remove("block-interactivity-".concat(id));
          allow_1.forEach(function (el) {
            return el.classList.remove("allow-interactivity-".concat(id));
          });
        };
      }
      return;
    },
    [props.inert, props.lockRef.current, props.shards],
  );
  var shouldCancelEvent = React8.useCallback(function (event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if (
      "touches" in event &&
      moveDirection === "h" &&
      target.type === "range"
    ) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(
      moveDirection,
      target,
    );
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(
        moveDirection,
        target,
      );
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (
      !activeAxis.current &&
      "changedTouches" in event &&
      (deltaX || deltaY)
    ) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(
      cancelingAxis,
      parent,
      event,
      cancelingAxis === "h" ? deltaX : deltaY,
      true,
    );
  }, []);
  var shouldPrevent = React8.useCallback(function (_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function (e) {
      return (
        e.name === event.type &&
        e.target === event.target &&
        deltaCompare(e.delta, delta)
      );
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || [])
        .map(extractRef)
        .filter(Boolean)
        .filter(function (node) {
          return node.contains(event.target);
        });
      var shouldStop =
        shardNodes.length > 0
          ? shouldCancelEvent(event, shardNodes[0])
          : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React8.useCallback(function (name, delta, target, should) {
    var event = { name, delta, target, should };
    shouldPreventQueue.current.push(event);
    setTimeout(function () {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(
        function (e) {
          return e !== event;
        },
      );
    }, 1);
  }, []);
  var scrollTouchStart = React8.useCallback(function (event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React8.useCallback(function (event) {
    shouldCancel(
      event.type,
      getDeltaXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  var scrollTouchMove = React8.useCallback(function (event) {
    shouldCancel(
      event.type,
      getTouchXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  React8.useEffect(function () {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove,
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function () {
      lockStack = lockStack.filter(function (inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar,
    inert = props.inert;
  return React8.createElement(
    React8.Fragment,
    null,
    inert ? React8.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar
      ? React8.createElement(RemoveScrollBar, { gapMode: "margin" })
      : null,
  );
}

// node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = React9.forwardRef(function (props, ref) {
  return React9.createElement(
    RemoveScroll,
    __assign({}, props, { ref, sideCar: sidecar_default }),
  );
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll;

// node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function (originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget)
    ? originalTarget[0]
    : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function (node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function (parent, targets) {
  return targets
    .map(function (target) {
      if (parent.contains(target)) {
        return target;
      }
      var correctedTarget = unwrapHost(target);
      if (correctedTarget && parent.contains(correctedTarget)) {
        return correctedTarget;
      }
      console.error(
        "aria-hidden",
        target,
        "in not contained inside",
        parent,
        ". Doing nothing",
      );
      return null;
    })
    .filter(function (x) {
      return Boolean(x);
    });
};
var applyAttributeToOthers = function (
  originalTarget,
  parentNode,
  markerName,
  controlAttribute,
) {
  var targets = correctTargets(
    parentNode,
    Array.isArray(originalTarget) ? originalTarget : [originalTarget],
  );
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function (el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function (parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function (node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function () {
    hiddenNodes.forEach(function (node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function (originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(
    Array.isArray(originalTarget) ? originalTarget : [originalTarget],
  );
  var activeParentNode = parentNode || getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function () {
      return null;
    };
  }
  targets.push.apply(
    targets,
    Array.from(activeParentNode.querySelectorAll("[aria-live]")),
  );
  return applyAttributeToOthers(
    targets,
    activeParentNode,
    markerName,
    "aria-hidden",
  );
};

// node_modules/@radix-ui/react-dialog/dist/index.mjs
var $5d3850c4d0b4e6c7$var$DIALOG_NAME = "Dialog";
var [
  $5d3850c4d0b4e6c7$var$createDialogContext,
  $5d3850c4d0b4e6c7$export$cc702773b8ea3e41,
] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($5d3850c4d0b4e6c7$var$DIALOG_NAME);
var [
  $5d3850c4d0b4e6c7$var$DialogProvider,
  $5d3850c4d0b4e6c7$var$useDialogContext,
] = $5d3850c4d0b4e6c7$var$createDialogContext(
  $5d3850c4d0b4e6c7$var$DIALOG_NAME,
);
var $5d3850c4d0b4e6c7$export$3ddf2d174ce01153 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true,
  } = props;
  const triggerRef = (0, import_react15.useRef)(null);
  const contentRef = (0, import_react15.useRef)(null);
  const [open = false, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  return (0, import_react15.createElement)(
    $5d3850c4d0b4e6c7$var$DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: $1746a345f3d73bb7$export$f680877a34711e37(),
      titleId: $1746a345f3d73bb7$export$f680877a34711e37(),
      descriptionId: $1746a345f3d73bb7$export$f680877a34711e37(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: (0, import_react15.useCallback)(
        () => setOpen((prevOpen) => !prevOpen),
        [setOpen],
      ),
      modal,
    },
    children,
  );
};
Object.assign($5d3850c4d0b4e6c7$export$3ddf2d174ce01153, {
  displayName: $5d3850c4d0b4e6c7$var$DIALOG_NAME,
});
var $5d3850c4d0b4e6c7$var$TRIGGER_NAME = "DialogTrigger";
var $5d3850c4d0b4e6c7$export$2e1e1122cf0cba88 = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$TRIGGER_NAME,
      __scopeDialog,
    );
    const composedTriggerRef = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
      forwardedRef,
      context.triggerRef,
    );
    return (0, import_react15.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.button,
      _extends(
        {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": context.open,
          "aria-controls": context.contentId,
          "data-state": $5d3850c4d0b4e6c7$var$getState(context.open),
        },
        triggerProps,
        {
          ref: composedTriggerRef,
          onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
            props.onClick,
            context.onOpenToggle,
          ),
        },
      ),
    );
  },
);
Object.assign($5d3850c4d0b4e6c7$export$2e1e1122cf0cba88, {
  displayName: $5d3850c4d0b4e6c7$var$TRIGGER_NAME,
});
var $5d3850c4d0b4e6c7$var$PORTAL_NAME = "DialogPortal";
var [
  $5d3850c4d0b4e6c7$var$PortalProvider,
  $5d3850c4d0b4e6c7$var$usePortalContext,
] = $5d3850c4d0b4e6c7$var$createDialogContext(
  $5d3850c4d0b4e6c7$var$PORTAL_NAME,
  {
    forceMount: void 0,
  },
);
var $5d3850c4d0b4e6c7$export$dad7c95542bacce0 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = $5d3850c4d0b4e6c7$var$useDialogContext(
    $5d3850c4d0b4e6c7$var$PORTAL_NAME,
    __scopeDialog,
  );
  return (0, import_react15.createElement)(
    $5d3850c4d0b4e6c7$var$PortalProvider,
    {
      scope: __scopeDialog,
      forceMount,
    },
    import_react15.Children.map(children, (child) =>
      (0, import_react15.createElement)(
        $921a889cee6df7e8$export$99c2b779aa4e8b8b,
        {
          present: forceMount || context.open,
        },
        (0, import_react15.createElement)(
          $f1701beae083dbae$export$602eac185826482c,
          {
            asChild: true,
            container,
          },
          child,
        ),
      ),
    ),
  );
};
Object.assign($5d3850c4d0b4e6c7$export$dad7c95542bacce0, {
  displayName: $5d3850c4d0b4e6c7$var$PORTAL_NAME,
});
var $5d3850c4d0b4e6c7$var$OVERLAY_NAME = "DialogOverlay";
var $5d3850c4d0b4e6c7$export$bd1d06c79be19e17 = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const portalContext = $5d3850c4d0b4e6c7$var$usePortalContext(
      $5d3850c4d0b4e6c7$var$OVERLAY_NAME,
      props.__scopeDialog,
    );
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$OVERLAY_NAME,
      props.__scopeDialog,
    );
    return context.modal
      ? (0, import_react15.createElement)(
          $921a889cee6df7e8$export$99c2b779aa4e8b8b,
          {
            present: forceMount || context.open,
          },
          (0, import_react15.createElement)(
            $5d3850c4d0b4e6c7$var$DialogOverlayImpl,
            _extends({}, overlayProps, {
              ref: forwardedRef,
            }),
          ),
        )
      : null;
  },
);
Object.assign($5d3850c4d0b4e6c7$export$bd1d06c79be19e17, {
  displayName: $5d3850c4d0b4e6c7$var$OVERLAY_NAME,
});
var $5d3850c4d0b4e6c7$var$DialogOverlayImpl = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$OVERLAY_NAME,
      __scopeDialog,
    );
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      (0, import_react15.createElement)(
        Combination_default,
        {
          as: $5e63c961fc1ce211$export$8c6ed5c666ac1360,
          allowPinchZoom: true,
          shards: [context.contentRef],
        },
        (0, import_react15.createElement)(
          $8927f6f2acc4f386$export$250ffa63cdc0d034.div,
          _extends(
            {
              "data-state": $5d3850c4d0b4e6c7$var$getState(context.open),
            },
            overlayProps,
            {
              ref: forwardedRef,
              style: {
                pointerEvents: "auto",
                ...overlayProps.style,
              },
            },
          ),
        ),
      )
    );
  },
);
var $5d3850c4d0b4e6c7$var$CONTENT_NAME = "DialogContent";
var $5d3850c4d0b4e6c7$export$b6d9565de1e068cf = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const portalContext = $5d3850c4d0b4e6c7$var$usePortalContext(
      $5d3850c4d0b4e6c7$var$CONTENT_NAME,
      props.__scopeDialog,
    );
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$CONTENT_NAME,
      props.__scopeDialog,
    );
    return (0, import_react15.createElement)(
      $921a889cee6df7e8$export$99c2b779aa4e8b8b,
      {
        present: forceMount || context.open,
      },
      context.modal
        ? (0, import_react15.createElement)(
            $5d3850c4d0b4e6c7$var$DialogContentModal,
            _extends({}, contentProps, {
              ref: forwardedRef,
            }),
          )
        : (0, import_react15.createElement)(
            $5d3850c4d0b4e6c7$var$DialogContentNonModal,
            _extends({}, contentProps, {
              ref: forwardedRef,
            }),
          ),
    );
  },
);
Object.assign($5d3850c4d0b4e6c7$export$b6d9565de1e068cf, {
  displayName: $5d3850c4d0b4e6c7$var$CONTENT_NAME,
});
var $5d3850c4d0b4e6c7$var$DialogContentModal = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$CONTENT_NAME,
      props.__scopeDialog,
    );
    const contentRef = (0, import_react15.useRef)(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
      forwardedRef,
      context.contentRef,
      contentRef,
    );
    (0, import_react15.useEffect)(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return (0, import_react15.createElement)(
      $5d3850c4d0b4e6c7$var$DialogContentImpl,
      _extends({}, props, {
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
          props.onCloseAutoFocus,
          (event) => {
            var _context$triggerRef$c;
            event.preventDefault();
            (_context$triggerRef$c = context.triggerRef.current) === null ||
              _context$triggerRef$c === void 0 ||
              _context$triggerRef$c.focus();
          },
        ),
        onPointerDownOutside: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick =
              originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
          },
        ),
        onFocusOutside: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
          props.onFocusOutside,
          (event) => event.preventDefault(),
        ),
      }),
    );
  },
);
var $5d3850c4d0b4e6c7$var$DialogContentNonModal = (0,
import_react15.forwardRef)((props, forwardedRef) => {
  const context = $5d3850c4d0b4e6c7$var$useDialogContext(
    $5d3850c4d0b4e6c7$var$CONTENT_NAME,
    props.__scopeDialog,
  );
  const hasInteractedOutsideRef = (0, import_react15.useRef)(false);
  const hasPointerDownOutsideRef = (0, import_react15.useRef)(false);
  return (0, import_react15.createElement)(
    $5d3850c4d0b4e6c7$var$DialogContentImpl,
    _extends({}, props, {
      ref: forwardedRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (event) => {
        var _props$onCloseAutoFoc;
        (_props$onCloseAutoFoc = props.onCloseAutoFocus) === null ||
          _props$onCloseAutoFoc === void 0 ||
          _props$onCloseAutoFoc.call(props, event);
        if (!event.defaultPrevented) {
          var _context$triggerRef$c2;
          if (!hasInteractedOutsideRef.current)
            (_context$triggerRef$c2 = context.triggerRef.current) === null ||
              _context$triggerRef$c2 === void 0 ||
              _context$triggerRef$c2.focus();
          event.preventDefault();
        }
        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;
      },
      onInteractOutside: (event) => {
        var _props$onInteractOuts, _context$triggerRef$c3;
        (_props$onInteractOuts = props.onInteractOutside) === null ||
          _props$onInteractOuts === void 0 ||
          _props$onInteractOuts.call(props, event);
        if (!event.defaultPrevented) {
          hasInteractedOutsideRef.current = true;
          if (event.detail.originalEvent.type === "pointerdown")
            hasPointerDownOutsideRef.current = true;
        }
        const target = event.target;
        const targetIsTrigger =
          (_context$triggerRef$c3 = context.triggerRef.current) === null ||
          _context$triggerRef$c3 === void 0
            ? void 0
            : _context$triggerRef$c3.contains(target);
        if (targetIsTrigger) event.preventDefault();
        if (
          event.detail.originalEvent.type === "focusin" &&
          hasPointerDownOutsideRef.current
        )
          event.preventDefault();
      },
    }),
  );
});
var $5d3850c4d0b4e6c7$var$DialogContentImpl = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const {
      __scopeDialog,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      ...contentProps
    } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$CONTENT_NAME,
      __scopeDialog,
    );
    const contentRef = (0, import_react15.useRef)(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
      forwardedRef,
      contentRef,
    );
    $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c();
    return (0, import_react15.createElement)(
      import_react15.Fragment,
      null,
      (0, import_react15.createElement)(
        $d3863c46a17e8a28$export$20e40289641fbbb6,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
        },
        (0, import_react15.createElement)(
          $5cb92bef7577960e$export$177fb62ff3ec1f22,
          _extends(
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": $5d3850c4d0b4e6c7$var$getState(context.open),
            },
            contentProps,
            {
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false),
            },
          ),
        ),
      ),
      false,
    );
  },
);
var $5d3850c4d0b4e6c7$var$TITLE_NAME = "DialogTitle";
var $5d3850c4d0b4e6c7$export$16f7638e4a34b909 = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$TITLE_NAME,
      __scopeDialog,
    );
    return (0, import_react15.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.h2,
      _extends(
        {
          id: context.titleId,
        },
        titleProps,
        {
          ref: forwardedRef,
        },
      ),
    );
  },
);
Object.assign($5d3850c4d0b4e6c7$export$16f7638e4a34b909, {
  displayName: $5d3850c4d0b4e6c7$var$TITLE_NAME,
});
var $5d3850c4d0b4e6c7$var$DESCRIPTION_NAME = "DialogDescription";
var $5d3850c4d0b4e6c7$export$94e94c2ec2c954d5 = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$DESCRIPTION_NAME,
      __scopeDialog,
    );
    return (0, import_react15.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.p,
      _extends(
        {
          id: context.descriptionId,
        },
        descriptionProps,
        {
          ref: forwardedRef,
        },
      ),
    );
  },
);
Object.assign($5d3850c4d0b4e6c7$export$94e94c2ec2c954d5, {
  displayName: $5d3850c4d0b4e6c7$var$DESCRIPTION_NAME,
});
var $5d3850c4d0b4e6c7$var$CLOSE_NAME = "DialogClose";
var $5d3850c4d0b4e6c7$export$fba2fb7cd781b7ac = (0, import_react15.forwardRef)(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = $5d3850c4d0b4e6c7$var$useDialogContext(
      $5d3850c4d0b4e6c7$var$CLOSE_NAME,
      __scopeDialog,
    );
    return (0, import_react15.createElement)(
      $8927f6f2acc4f386$export$250ffa63cdc0d034.button,
      _extends(
        {
          type: "button",
        },
        closeProps,
        {
          ref: forwardedRef,
          onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
            props.onClick,
            () => context.onOpenChange(false),
          ),
        },
      ),
    );
  },
);
Object.assign($5d3850c4d0b4e6c7$export$fba2fb7cd781b7ac, {
  displayName: $5d3850c4d0b4e6c7$var$CLOSE_NAME,
});
function $5d3850c4d0b4e6c7$var$getState(open) {
  return open ? "open" : "closed";
}
var $5d3850c4d0b4e6c7$var$TITLE_WARNING_NAME = "DialogTitleWarning";
var [
  $5d3850c4d0b4e6c7$export$69b62a49393917d6,
  $5d3850c4d0b4e6c7$var$useWarningContext,
] = $c512c27ab02ef895$export$fd42f52fd3ae1109(
  $5d3850c4d0b4e6c7$var$TITLE_WARNING_NAME,
  {
    contentName: $5d3850c4d0b4e6c7$var$CONTENT_NAME,
    titleName: $5d3850c4d0b4e6c7$var$TITLE_NAME,
    docsSlug: "dialog",
  },
);
var $5d3850c4d0b4e6c7$export$be92b6f5f03c0fe9 =
  $5d3850c4d0b4e6c7$export$3ddf2d174ce01153;
var $5d3850c4d0b4e6c7$export$41fb9f06171c75f4 =
  $5d3850c4d0b4e6c7$export$2e1e1122cf0cba88;
var $5d3850c4d0b4e6c7$export$602eac185826482c =
  $5d3850c4d0b4e6c7$export$dad7c95542bacce0;
var $5d3850c4d0b4e6c7$export$c6fdb837b070b4ff =
  $5d3850c4d0b4e6c7$export$bd1d06c79be19e17;
var $5d3850c4d0b4e6c7$export$7c6e2c02157bb7d2 =
  $5d3850c4d0b4e6c7$export$b6d9565de1e068cf;
var $5d3850c4d0b4e6c7$export$f99233281efd08a0 =
  $5d3850c4d0b4e6c7$export$16f7638e4a34b909;
var $5d3850c4d0b4e6c7$export$393edc798c47379d =
  $5d3850c4d0b4e6c7$export$94e94c2ec2c954d5;
var $5d3850c4d0b4e6c7$export$f39c2d165cd861fe =
  $5d3850c4d0b4e6c7$export$fba2fb7cd781b7ac;
export {
  $5d3850c4d0b4e6c7$export$f39c2d165cd861fe as Close,
  $5d3850c4d0b4e6c7$export$7c6e2c02157bb7d2 as Content,
  $5d3850c4d0b4e6c7$export$393edc798c47379d as Description,
  $5d3850c4d0b4e6c7$export$3ddf2d174ce01153 as Dialog,
  $5d3850c4d0b4e6c7$export$fba2fb7cd781b7ac as DialogClose,
  $5d3850c4d0b4e6c7$export$b6d9565de1e068cf as DialogContent,
  $5d3850c4d0b4e6c7$export$94e94c2ec2c954d5 as DialogDescription,
  $5d3850c4d0b4e6c7$export$bd1d06c79be19e17 as DialogOverlay,
  $5d3850c4d0b4e6c7$export$dad7c95542bacce0 as DialogPortal,
  $5d3850c4d0b4e6c7$export$16f7638e4a34b909 as DialogTitle,
  $5d3850c4d0b4e6c7$export$2e1e1122cf0cba88 as DialogTrigger,
  $5d3850c4d0b4e6c7$export$c6fdb837b070b4ff as Overlay,
  $5d3850c4d0b4e6c7$export$602eac185826482c as Portal,
  $5d3850c4d0b4e6c7$export$be92b6f5f03c0fe9 as Root,
  $5d3850c4d0b4e6c7$export$f99233281efd08a0 as Title,
  $5d3850c4d0b4e6c7$export$41fb9f06171c75f4 as Trigger,
  $5d3850c4d0b4e6c7$export$69b62a49393917d6 as WarningProvider,
  $5d3850c4d0b4e6c7$export$cc702773b8ea3e41 as createDialogScope,
};
//# sourceMappingURL=@radix-ui_react-dialog.js.map
