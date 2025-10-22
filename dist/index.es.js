import te, { useRef as D, useEffect as H } from "react";
import { createPortal as ne } from "react-dom";
var W = { exports: {} }, P = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Z;
function ae() {
  if (Z) return P;
  Z = 1;
  var c = Symbol.for("react.transitional.element"), l = Symbol.for("react.fragment");
  function f(R, o, s) {
    var b = null;
    if (s !== void 0 && (b = "" + s), o.key !== void 0 && (b = "" + o.key), "key" in o) {
      s = {};
      for (var _ in o)
        _ !== "key" && (s[_] = o[_]);
    } else s = o;
    return o = s.ref, {
      $$typeof: c,
      type: R,
      key: b,
      ref: o !== void 0 ? o : null,
      props: s
    };
  }
  return P.Fragment = l, P.jsx = f, P.jsxs = f, P;
}
var O = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var B;
function oe() {
  return B || (B = 1, process.env.NODE_ENV !== "production" && function() {
    function c(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Q ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case j:
          return "Fragment";
        case v:
          return "Profiler";
        case $:
          return "StrictMode";
        case T:
          return "Suspense";
        case h:
          return "SuspenseList";
        case K:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case w:
            return "Portal";
          case S:
            return (e.displayName || "Context") + ".Provider";
          case u:
            return (e._context.displayName || "Context") + ".Consumer";
          case m:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case Y:
            return r = e.displayName || null, r !== null ? r : c(e.type) || "Memo";
          case U:
            r = e._payload, e = e._init;
            try {
              return c(e(r));
            } catch {
            }
        }
      return null;
    }
    function l(e) {
      return "" + e;
    }
    function f(e) {
      try {
        l(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, n = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          n
        ), l(e);
      }
    }
    function R(e) {
      if (e === j) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === U)
        return "<...>";
      try {
        var r = c(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var e = I.A;
      return e === null ? null : e.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function b(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function _(e, r) {
      function t() {
        V || (V = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function y() {
      var e = c(this.type);
      return G[e] || (G[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function x(e, r, t, n, E, d, C, L) {
      return t = d.ref, e = {
        $$typeof: g,
        type: e,
        key: r,
        props: d,
        _owner: E
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: y
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: C
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: L
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function N(e, r, t, n, E, d, C, L) {
      var a = r.children;
      if (a !== void 0)
        if (n)
          if (ee(a)) {
            for (n = 0; n < a.length; n++)
              A(a[n]);
            Object.freeze && Object.freeze(a);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else A(a);
      if (q.call(r, "key")) {
        a = c(e);
        var k = Object.keys(r).filter(function(re) {
          return re !== "key";
        });
        n = 0 < k.length ? "{key: someKey, " + k.join(": ..., ") + ": ...}" : "{key: someKey}", z[a + n] || (k = 0 < k.length ? "{" + k.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          n,
          a,
          k,
          a
        ), z[a + n] = !0);
      }
      if (a = null, t !== void 0 && (f(t), a = "" + t), b(r) && (f(r.key), a = "" + r.key), "key" in r) {
        t = {};
        for (var F in r)
          F !== "key" && (t[F] = r[F]);
      } else t = r;
      return a && _(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), x(
        e,
        a,
        d,
        E,
        o(),
        t,
        C,
        L
      );
    }
    function A(e) {
      typeof e == "object" && e !== null && e.$$typeof === g && e._store && (e._store.validated = 1);
    }
    var i = te, g = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), S = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), K = Symbol.for("react.activity"), Q = Symbol.for("react.client.reference"), I = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, ee = Array.isArray, M = console.createTask ? console.createTask : function() {
      return null;
    };
    i = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var V, G = {}, J = i.react_stack_bottom_frame.bind(
      i,
      s
    )(), X = M(R(s)), z = {};
    O.Fragment = j, O.jsx = function(e, r, t, n, E) {
      var d = 1e4 > I.recentlyCreatedOwnerStacks++;
      return N(
        e,
        r,
        t,
        !1,
        n,
        E,
        d ? Error("react-stack-top-frame") : J,
        d ? M(R(e)) : X
      );
    }, O.jsxs = function(e, r, t, n, E) {
      var d = 1e4 > I.recentlyCreatedOwnerStacks++;
      return N(
        e,
        r,
        t,
        !0,
        n,
        E,
        d ? Error("react-stack-top-frame") : J,
        d ? M(R(e)) : X
      );
    };
  }()), O;
}
process.env.NODE_ENV === "production" ? W.exports = ae() : W.exports = oe();
var p = W.exports;
function le({
  isOpen: c,
  onClose: l,
  title: f,
  children: R,
  footer: o,
  closeOnOverlay: s = !0,
  closeOnEsc: b = !0,
  showCloseButton: _ = !0,
  size: y = "md",
  initialFocusRef: x,
  className: N = ""
}) {
  const A = D(null), i = D(null), g = D(`modal-title-${Math.random().toString(36).slice(2)}`), w = D(null);
  if (H(() => {
    var m;
    if (!c) return;
    w.current = document.activeElement;
    const v = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const u = (x == null ? void 0 : x.current) || ((m = i.current) == null ? void 0 : m.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) || i.current, S = requestAnimationFrame(() => u == null ? void 0 : u.focus());
    return () => {
      var T, h;
      cancelAnimationFrame(S), document.body.style.overflow = v, w.current && ((h = (T = w.current).focus) == null || h.call(T));
    };
  }, [c, x]), H(() => {
    if (!c || !b) return;
    const v = (u) => {
      if (u.key === "Escape" && (u.stopPropagation(), l == null || l()), u.key === "Tab" && i.current) {
        const S = i.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ), m = Array.from(S).filter(
          (Y) => !Y.hasAttribute("disabled") && !Y.getAttribute("aria-hidden")
        );
        if (m.length === 0) {
          u.preventDefault(), i.current.focus();
          return;
        }
        const T = m[0], h = m[m.length - 1];
        !u.shiftKey && document.activeElement === h && (u.preventDefault(), T.focus()), u.shiftKey && document.activeElement === T && (u.preventDefault(), h.focus());
      }
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [c, b, l]), !c) return null;
  const j = typeof y == "number" ? `${y}px` : y === "sm" ? "380px" : y === "lg" ? "900px" : "600px", $ = (v) => {
    s && v.target === A.current && (l == null || l());
  };
  return ne(
    /* @__PURE__ */ p.jsx(
      "div",
      {
        ref: A,
        className: "hrn-modal__overlay",
        onMouseDown: $,
        children: /* @__PURE__ */ p.jsxs(
          "div",
          {
            className: `hrn-modal__dialog ${N}`,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": f ? g.current : void 0,
            style: { maxWidth: j },
            ref: i,
            tabIndex: -1,
            children: [
              (f || _) && /* @__PURE__ */ p.jsxs("div", { className: "hrn-modal__header", children: [
                f ? /* @__PURE__ */ p.jsx("h2", { id: g.current, className: "hrn-modal__title", children: f }) : /* @__PURE__ */ p.jsx("span", {}),
                _ && /* @__PURE__ */ p.jsx(
                  "button",
                  {
                    type: "button",
                    className: "hrn-modal__close",
                    "aria-label": "Close dialog",
                    onClick: l,
                    children: "×"
                  }
                )
              ] }),
              /* @__PURE__ */ p.jsx("div", { className: "hrn-modal__body", children: R }),
              o && /* @__PURE__ */ p.jsx("div", { className: "hrn-modal__footer", children: o })
            ]
          }
        )
      }
    ),
    document.body
  );
}
export {
  le as default
};
