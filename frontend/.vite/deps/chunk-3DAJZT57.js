import { require_react } from "./chunk-E55NSNTN.js";
import { __toESM } from "./chunk-4MBMRILA.js";

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}

// node_modules/@radix-ui/react-slot/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var import_react = __toESM(require_react(), 1);
function $6ed0406888f73fc4$var$setRef(ref, value) {
  if (typeof ref === "function") ref(value);
  else if (ref !== null && ref !== void 0) ref.current = value;
}
function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
  return (node) =>
    refs.forEach((ref) => $6ed0406888f73fc4$var$setRef(ref, node));
}
function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
  return (0, import_react.useCallback)(
    $6ed0406888f73fc4$export$43e446d32b3d21af(...refs),
    refs,
  );
}

// node_modules/@radix-ui/react-slot/dist/index.mjs
var $5e63c961fc1ce211$export$8c6ed5c666ac1360 = (0, import_react2.forwardRef)(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = import_react2.Children.toArray(children);
    const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (import_react2.Children.count(newElement) > 1)
            return import_react2.Children.only(null);
          return (0, import_react2.isValidElement)(newElement)
            ? newElement.props.children
            : null;
        } else return child;
      });
      return (0, import_react2.createElement)(
        $5e63c961fc1ce211$var$SlotClone,
        _extends({}, slotProps, {
          ref: forwardedRef,
        }),
        (0, import_react2.isValidElement)(newElement)
          ? (0, import_react2.cloneElement)(newElement, void 0, newChildren)
          : null,
      );
    }
    return (0, import_react2.createElement)(
      $5e63c961fc1ce211$var$SlotClone,
      _extends({}, slotProps, {
        ref: forwardedRef,
      }),
      children,
    );
  },
);
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone = (0, import_react2.forwardRef)(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if ((0, import_react2.isValidElement)(children))
      return (0, import_react2.cloneElement)(children, {
        ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
        ref: forwardedRef
          ? $6ed0406888f73fc4$export$43e446d32b3d21af(
              forwardedRef,
              children.ref,
            )
          : children.ref,
      });
    return import_react2.Children.count(children) > 1
      ? import_react2.Children.only(null)
      : null;
  },
);
$5e63c961fc1ce211$var$SlotClone.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children }) => {
  return (0, import_react2.createElement)(
    import_react2.Fragment,
    null,
    children,
  );
};
function $5e63c961fc1ce211$var$isSlottable(child) {
  return (
    (0, import_react2.isValidElement)(child) &&
    child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45
  );
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
  const overrideProps = {
    ...childProps,
  };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue)
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      else if (slotPropValue) overrideProps[propName] = slotPropValue;
    } else if (propName === "style")
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue,
      };
    else if (propName === "className")
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
  }
  return {
    ...slotProps,
    ...overrideProps,
  };
}
var $5e63c961fc1ce211$export$be92b6f5f03c0fe9 =
  $5e63c961fc1ce211$export$8c6ed5c666ac1360;

export {
  _extends,
  $6ed0406888f73fc4$export$c7b2cbe3552a0d05,
  $5e63c961fc1ce211$export$8c6ed5c666ac1360,
  $5e63c961fc1ce211$export$d9f1ccf0bdb05d45,
  $5e63c961fc1ce211$export$be92b6f5f03c0fe9,
};
//# sourceMappingURL=chunk-3DAJZT57.js.map
