(this.webpackJsonpfrontend = this.webpackJsonpfrontend || []).push([
  [0],
  {
    105: function (e, t, a) {
      e.exports = a(156);
    },
    156: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        l = a.n(n),
        r = a(75),
        c = a.n(r),
        o = a(2),
        s = a(94),
        i = a.n(s),
        m = a(1),
        u = { token: null, user: null, profile: null },
        d = Object(n.createContext)(
          p({
            token: u.token,
            user: u.user,
            profile: u.profile,
            setState: function () {
              return console.error(
                "You are using AuthContext without AuthProvider!"
              );
            },
          })
        );
      function E() {
        return Object(n.useContext)(d);
      }
      function b(e) {
        var t = e.children,
          a = (function (e) {
            var t = Object(n.useState)(function () {
                return (function (e) {
                  if (!window.localStorage) return e;
                  var t = window.localStorage.getItem("dp-auth");
                  if (!t) return e;
                  try {
                    var a = JSON.parse(t),
                      n = a.token,
                      l = a.user,
                      r = a.profile;
                    if (n && l && r) return { token: n, user: l, profile: r };
                  } catch (c) {}
                  return e;
                })(e);
              }),
              a = Object(m.a)(t, 2),
              l = a[0],
              r = a[1],
              c = Object(n.useCallback)(function (e) {
                r(e),
                  (function (e) {
                    if (!window.localStorage) return;
                    window.localStorage.setItem("dp-auth", JSON.stringify(e));
                  })(e);
              }, []);
            return [l, c];
          })(u),
          r = Object(m.a)(a, 2),
          c = r[0],
          o = r[1],
          s = Object(n.useMemo)(
            function () {
              return p({
                token: c.token,
                user: c.user,
                profile: c.profile,
                setState: o,
              });
            },
            [c, o]
          );
        return l.a.createElement(d.Provider, { value: s }, t);
      }
      function p(e) {
        var t = e.token,
          a = e.user,
          n = e.profile,
          l = e.setState;
        return {
          token: t,
          user: a,
          profile: n,
          signin: function (e) {
            var t = e.token,
              a = e.user,
              n = e.profile;
            return l({ token: t, user: a, profile: n });
          },
          signout: function () {
            return (
              l({ token: null, user: null, profile: null }) &
              localStorage.removeItem("dp-auth")
            );
          },
        };
      }
      var h = i.a.create({ baseURL: "api/" }),
        v = Object(n.createContext)(h);
      function g(e) {
        var t = e.children,
          a = h;
        return (
          (function (e) {
            var t = E().token;
            Object(n.useLayoutEffect)(
              function () {
                t
                  ? (e.defaults.headers.common.Authorization = "Bearer ".concat(
                      t
                    ))
                  : delete e.defaults.headers.common.Authorization;
              },
              [t, e]
            );
          })(a),
          (function (e) {
            var t = E().signout,
              a = Object(n.useRef)(t);
            Object(n.useEffect)(
              function () {
                a.current = t;
              },
              [t]
            ),
              Object(n.useEffect)(
                function () {
                  var t = e.interceptors.response.use(
                    function (e) {
                      return e;
                    },
                    function (e) {
                      return (
                        e &&
                          e.response &&
                          401 === e.response.status &&
                          a.current &&
                          a.current(),
                        Promise.reject(e)
                      );
                    }
                  );
                  return function () {
                    e.interceptors.request.eject(t);
                  };
                },
                [e]
              );
          })(a),
          l.a.createElement(v.Provider, { value: a }, t)
        );
      }
      var f = a(12),
        w = a(10);
      function y(e) {
        var t = e.component,
          a = Object(w.a)(e, ["component"]),
          n = E();
        return l.a.createElement(
          f.b,
          Object.assign({}, a, {
            render: function (e) {
              return n.token
                ? l.a.createElement(f.a, { to: { pathname: "/" } })
                : l.a.createElement(t, e);
            },
          })
        );
      }
      function x(e) {
        var t = e.component,
          a = Object(w.a)(e, ["component"]),
          n = E();
        return l.a.createElement(
          f.b,
          Object.assign({}, a, {
            render: function (e) {
              return n.token
                ? l.a.createElement(t, e)
                : l.a.createElement(f.a, { to: { pathname: "/sign-in" } });
            },
          })
        );
      }
      var N = function (e) {
          for (
            var t = e.level, a = (Object(w.a)(e, ["level"]), t), n = [], r = 0;
            r < a;
            ++r
          )
            n.push(l.a.createElement("br", { key: r }));
          return l.a.createElement("div", null, n);
        },
        O = function () {
          var e = new Date().getFullYear();
          return l.a.createElement(
            "div",
            null,
            l.a.createElement(N, { level: "4" }),
            l.a.createElement(
              "footer",
              {
                className:
                  "page-footer font-small bg-dark fixed-bottom border-top-0",
              },
              l.a.createElement(
                "div",
                { className: "footer-copyright text-center py-3" },
                l.a.createElement(
                  "b",
                  { className: "text-white" },
                  "Copyright \xa9 ",
                  e
                )
              )
            )
          );
        },
        C = a(78),
        j = a(32),
        S = a.n(j),
        k =
          (a(129),
          function (e) {
            var t = e.icon,
              a = e.variant,
              n = e.spin,
              r = e.className,
              c = Object(w.a)(e, ["icon", "variant", "spin", "className"]);
            return l.a.createElement(
              "i",
              Object.assign(
                {
                  className: S()(
                    "fa".concat(a || "s"),
                    "fa-".concat(t),
                    { "fa-spin": n },
                    r
                  ),
                },
                c
              )
            );
          }),
        T = function (e) {
          var t = e.isPrivate,
            a = E();
          return l.a.createElement(
            "div",
            null,
            l.a.createElement(
              "nav",
              {
                className:
                  "navbar navbar-expand-sm navbar-light bg-light fixed-top shadow",
              },
              l.a.createElement(
                o.b,
                { className: "navbar-brand", to: "/" },
                l.a.createElement(k, { icon: "graduation-cap" }),
                l.a.createElement("b", null, " E-MAKE")
              ),
              t
                ? l.a.createElement(
                    l.a.Fragment,
                    null,
                    l.a.createElement(
                      "button",
                      {
                        className: "navbar-toggler",
                        type: "button",
                        "data-toggle": "collapse",
                        "data-target": "#navbarNavDp",
                        "aria-controls": "navbarNavDp",
                        "aria-expanded": "false",
                        "aria-label": "Toggle navigation",
                      },
                      l.a.createElement("span", {
                        className: "navbar-toggler-icon",
                      })
                    ),
                    l.a.createElement(
                      "div",
                      {
                        className: "collapse navbar-collapse",
                        id: "navbarNavDp",
                      },
                      l.a.createElement(
                        "ul",
                        { className: "navbar-nav mr-auto" },
                        l.a.createElement(
                          "li",
                          { className: "nav-item" },
                          l.a.createElement(
                            o.b,
                            { className: "nav-link", to: "/" },
                            l.a.createElement("b", null, "Get Started")
                          )
                        ),
                        l.a.createElement(
                          "li",
                          { className: "nav-item" },
                          l.a.createElement(
                            o.b,
                            { className: "nav-link", to: "/modules" },
                            l.a.createElement("b", null, "Modules")
                          )
                        ),
                        l.a.createElement(
                          "li",
                          { className: "nav-item" },
                          l.a.createElement(
                            o.b,
                            { className: "nav-link", to: "/courses" },
                            l.a.createElement("b", null, "Courses")
                          )
                        )
                      ),
                      l.a.createElement(
                        C.Online,
                        null,
                        l.a.createElement(k, { icon: "signal text-success" })
                      ),
                      l.a.createElement(
                        C.Offline,
                        null,
                        l.a.createElement(k, { icon: "times text-danger" })
                      ),
                      l.a.createElement(
                        "ul",
                        { className: "navbar-nav" },
                        l.a.createElement(
                          "li",
                          { className: "nav-item dropdown" },
                          l.a.createElement(
                            o.b,
                            {
                              to: "",
                              className: "nav-link dropdown-toggle",
                              id: "navbarDropdownMenuLink",
                              "data-toggle": "dropdown",
                              "aria-haspopup": "true",
                              "aria-expanded": "false",
                            },
                            l.a.createElement("b", null, a.profile)
                          ),
                          l.a.createElement(
                            "div",
                            {
                              className: "dropdown-menu",
                              "aria-labelledby": "navbarDropdownMenuLink",
                            },
                            l.a.createElement(
                              o.b,
                              { className: "dropdown-item", to: "/profile" },
                              "My profile"
                            ),
                            l.a.createElement(
                              o.b,
                              { className: "dropdown-item", to: "/my-modules" },
                              "My modules"
                            ),
                            l.a.createElement(
                              o.b,
                              { className: "dropdown-item", to: "/my-courses" },
                              "My courses"
                            )
                          )
                        )
                      ),
                      l.a.createElement(
                        o.b,
                        {
                          to: "/",
                          onClick: function () {
                            a.signout();
                          },
                        },
                        l.a.createElement(k, { icon: "sign-out-alt" }),
                        l.a.createElement("b", null, "Sign out")
                      )
                    )
                  )
                : null
            ),
            l.a.createElement(N, { level: "4" })
          );
        };
      function I(e) {
        var t = e.children,
          a = (e.isPrivate, E());
        return l.a.createElement(
          "div",
          { style: { height: "100%" } },
          l.a.createElement(T, { isPrivate: a.token }),
          l.a.createElement(N, { level: "1" }),
          t,
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(O, null)
        );
      }
      var A = function (e) {
          var t = e.level,
            a = Object(w.a)(e, ["level"]),
            n = "h".concat(t || "1");
          return l.a.createElement(n, a);
        },
        M = function (e) {
          var t = e.title,
            a = e.type,
            n = void 0 === a ? "button" : a,
            r = e.variant,
            c = void 0 === r ? "primary" : r,
            o = e.size,
            s = e.className,
            i = e.children,
            m = Object(w.a)(e, [
              "title",
              "type",
              "variant",
              "size",
              "className",
              "children",
            ]);
          return l.a.createElement(
            "button",
            Object.assign(
              {
                className: S()(
                  "btn",
                  "btn-".concat(c),
                  o ? "btn-".concat(o) : null,
                  s
                ),
                type: n,
              },
              m
            ),
            t || i
          );
        };
      function B() {
        return l.a.createElement(
          "div",
          { className: "container" },
          l.a.createElement(
            "div",
            { className: "row" },
            l.a.createElement(
              "div",
              { className: "col mb-4" },
              l.a.createElement(k, {
                icon: "file-alt",
                className: "fa-5x text-warning",
              }),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(A, { level: "4" }, "View Modules"),
              l.a.createElement(N, null),
              l.a.createElement(
                "p",
                { className: "mt-3" },
                "View all the modules you have been given access to."
              ),
              l.a.createElement(
                o.b,
                { to: "/modules" },
                l.a.createElement(
                  M,
                  { variant: "warning", className: "mt-2 text-white" },
                  l.a.createElement("b", null, "Continue")
                )
              )
            ),
            l.a.createElement(
              "div",
              { className: "col mb-4" },
              l.a.createElement(k, {
                icon: "book",
                className: "fa-5x text-danger",
              }),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(A, { level: "4" }, "Enter Courses"),
              l.a.createElement(N, null),
              l.a.createElement(
                "p",
                { className: "mt-3" },
                "Enter any course you have been given access to."
              ),
              l.a.createElement(
                o.b,
                { to: "/courses" },
                l.a.createElement(
                  M,
                  { variant: "danger", className: "mt-2 text-white" },
                  l.a.createElement("b", null, "Continue")
                )
              )
            ),
            l.a.createElement(
              "div",
              { className: "col mb-4" },
              l.a.createElement(k, {
                icon: "id-badge",
                className: "fa-5x text-secondary",
              }),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(A, { level: "4" }, "Edit Profile"),
              l.a.createElement(N, null),
              l.a.createElement(
                "p",
                { className: "mt-3" },
                "View and manage your profile information."
              ),
              l.a.createElement(
                o.b,
                { to: "/profile" },
                l.a.createElement(
                  M,
                  { variant: "secondary", className: "mt-2 text-white" },
                  l.a.createElement("b", null, "Continue")
                )
              )
            ),
            l.a.createElement(
              "div",
              { className: "col mb-4" },
              l.a.createElement(k, {
                icon: "file-medical",
                className: "fa-5x text-info",
              }),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(A, { level: "4" }, "Manage Modules"),
              l.a.createElement(N, null),
              l.a.createElement(
                "p",
                { className: "mt-3" },
                "Create, edit, delete or give access to your modules."
              ),
              l.a.createElement(
                o.b,
                { to: "/my-modules" },
                l.a.createElement(
                  M,
                  { variant: "info", className: "mt-2 text-white" },
                  l.a.createElement("b", null, "Continue")
                )
              )
            ),
            l.a.createElement(
              "div",
              { className: "col mb-4" },
              l.a.createElement(k, {
                icon: "book-medical",
                className: "fa-5x text-success",
              }),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(A, { level: "4" }, "Manage Courses"),
              l.a.createElement(N, null),
              l.a.createElement(
                "p",
                { className: "mt-3" },
                "Create, edit, delete or give access to your courses."
              ),
              l.a.createElement(
                o.b,
                { to: "/my-courses" },
                l.a.createElement(
                  M,
                  { variant: "success", className: "mt-2 text-white" },
                  l.a.createElement("b", null, "Continue")
                )
              )
            )
          )
        );
      }
      function R() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "GET STARTED"),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(
            "p",
            { className: "mb-5" },
            "This page is meant to show you what you can do with ",
            l.a.createElement("b", null, "E-MAKE"),
            "."
          ),
          l.a.createElement("hr", {
            style: { width: "600px", background: "black" },
          }),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(B, null)
        );
      }
      function P() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            A,
            { level: "1" },
            l.a.createElement(k, { icon: "graduation-cap" }),
            " E-MAKE"
          ),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(A, { level: "2" }, "Welcome to E-MAKE"),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(
            "div",
            { align: "center", className: "mb-2" },
            l.a.createElement(
              "p",
              { className: "mt-2 mb-2" },
              l.a.createElement(
                "b",
                null,
                "With this application, you can quickly and easily:"
              )
            ),
            l.a.createElement(
              "li",
              null,
              "Create and manage your own online e-learning courses"
            ),
            l.a.createElement(
              "li",
              null,
              "Invite other users to your courses and watch their progress"
            ),
            l.a.createElement(
              "li",
              null,
              "Take online e-learning courses created by other users"
            )
          )
        );
      }
      var q = a(11),
        D = a(3),
        Y = function (e) {
          var t = e.className,
            a = e.variant,
            n = Object(w.a)(e, ["className", "variant"]);
          return l.a.createElement(
            "div",
            Object.assign(
              { className: S()("alert", "alert-".concat(a || "danger"), t) },
              n
            )
          );
        },
        F = function (e) {
          var t = e.muted,
            a = e.className,
            n = Object(w.a)(e, ["muted", "className"]);
          return l.a.createElement(
            "p",
            Object.assign({ className: S()({ "text-muted": t }, a) }, n)
          );
        },
        L = function (e) {
          var t = e.title,
            a = e.error,
            n = e.variant;
          return l.a.createElement(
            Y,
            { variant: n },
            l.a.createElement(A, { level: "2" }, t || ""),
            l.a.createElement(F, null, "".concat(a || ""))
          );
        },
        H = function () {
          return l.a.createElement(
            "div",
            { className: "text-center h1 text-muted p-5" },
            l.a.createElement(k, { icon: "sync-alt", spin: !0 })
          );
        },
        V = function (e) {
          var t = e.status,
            a = e.message;
          return l.a.createElement(
            "div",
            { align: "center" },
            "loading" === t
              ? l.a.createElement(H, null)
              : "error" === t
              ? l.a.createElement(L, { error: a })
              : "success" === t && a
              ? l.a.createElement(L, { variant: "success", error: a })
              : null
          );
        },
        U = D.a().shape({
          mail: D.c().label("E-mail").email().required(),
          pass: D.c().label("Password").required(),
        });
      function Q() {
        var e = Object(n.useState)(null),
          t = Object(m.a)(e, 2),
          a = t[0],
          r = t[1],
          c = Object(n.useState)(null),
          s = Object(m.a)(c, 2),
          i = s[0],
          u = s[1],
          d = E();
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            q.a,
            {
              initialValues: { mail: "", pass: "" },
              onSubmit: function (e, t) {
                !(function (e) {
                  r("loading"),
                    h
                      .post("api/users/getUser", { mail: e.mail, pass: e.pass })
                      .then(function (t) {
                        t.data.data
                          ? (r("idle"),
                            d.signin({
                              token: t.data.data.token,
                              user: e.mail,
                              profile: t.data.data.name,
                            }))
                          : (r("error"), u("Incorrect e-mail or password"));
                      })
                      .catch(function (e) {
                        r("error"), u(e.message);
                      });
                })(e);
              },
              validationSchema: U,
            },
            function (e) {
              return l.a.createElement(
                "form",
                { onSubmit: e.handleSubmit },
                l.a.createElement(N, { level: "1" }),
                l.a.createElement(
                  "div",
                  null,
                  l.a.createElement("input", {
                    type: "text",
                    onChange: e.handleChange,
                    onBlur: e.handleBlur,
                    value: e.values.mail,
                    style: e.errors.mail
                      ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                      : { width: "300px" },
                    placeholder: "e-mail",
                    name: "mail",
                  }),
                  e.errors.mail &&
                    l.a.createElement(
                      l.a.Fragment,
                      null,
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "b",
                        { className: "text-danger" },
                        e.errors.mail
                      )
                    )
                ),
                l.a.createElement(
                  "div",
                  { className: "mt-2" },
                  l.a.createElement("input", {
                    type: "password",
                    onChange: e.handleChange,
                    onBlur: e.handleBlur,
                    value: e.values.pass,
                    style: e.errors.pass
                      ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                      : { width: "300px" },
                    placeholder: "password",
                    name: "pass",
                  }),
                  e.errors.pass &&
                    l.a.createElement(
                      l.a.Fragment,
                      null,
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "b",
                        { className: "text-danger" },
                        e.errors.pass
                      )
                    )
                ),
                l.a.createElement(N, { level: "2" }),
                l.a.createElement(
                  M,
                  {
                    className: "btn btn-success mr-2",
                    style: { width: "150px" },
                    type: "submit",
                  },
                  l.a.createElement("b", null, "Login")
                ),
                l.a.createElement(
                  o.b,
                  { to: "/register" },
                  l.a.createElement(
                    M,
                    {
                      className: "btn btn-primary",
                      style: { width: "150px" },
                      type: "button",
                    },
                    l.a.createElement("b", null, "Register")
                  )
                ),
                l.a.createElement(N, { level: "2" })
              );
            }
          ),
          l.a.createElement(V, { status: a, message: i })
        );
      }
      function G() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(P, null),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement("hr", {
            style: { width: "400px", background: "black" },
          }),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(A, { level: "2" }, "Sign in to proceed"),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(Q, null)
        );
      }
      var J = D.a().shape({
        mail: D.c().label("E-mail").email().required(),
        name: D.c().label("Name").required(),
        pass: D.c()
          .label("Password")
          .required()
          .min(3, "Password should contain at least 3 characters"),
        pass2: D.c()
          .label("Password confirmation")
          .required()
          .oneOf([D.b("pass"), null], "Passwords must match"),
      });
      function z() {
        var e = Object(n.useState)(null),
          t = Object(m.a)(e, 2),
          a = t[0],
          r = t[1],
          c = Object(n.useState)(null),
          s = Object(m.a)(c, 2),
          i = s[0],
          u = s[1];
        function d(e) {
          return (
            r("loading"),
            h
              .post("api/users/getUserMail", { mail: e.mail })
              .then(function (t) {
                t.data.data
                  ? (r("error"), u("E-mail is already in use, try again"))
                  : (function (e) {
                      h.post("api/users/createNewUser", {
                        mail: e.mail,
                        name: e.name,
                        pass: e.pass,
                      })
                        .then(function (e) {
                          r("success"),
                            u("Registration complete, you can sign in now");
                        })
                        .catch(function (e) {
                          r("error"), u(e.message);
                        });
                    })(e);
              })
              .catch(function (e) {
                r("error"), u(e.message);
              }),
            0
          );
        }
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            q.a,
            {
              initialValues: { mail: "", pass: "", pass2: "" },
              onSubmit: function (e, t) {
                d(e);
              },
              validationSchema: J,
            },
            function (e) {
              return l.a.createElement(
                "form",
                { onSubmit: e.handleSubmit },
                l.a.createElement(N, { level: "1" }),
                l.a.createElement(
                  "div",
                  null,
                  l.a.createElement("input", {
                    type: "text",
                    onChange: e.handleChange,
                    onBlur: e.handleBlur,
                    value: e.values.mail,
                    style: e.errors.mail
                      ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                      : { width: "300px" },
                    placeholder: "e-mail",
                    name: "mail",
                  }),
                  e.errors.mail &&
                    l.a.createElement(
                      l.a.Fragment,
                      null,
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "b",
                        { className: "text-danger" },
                        e.errors.mail
                      )
                    )
                ),
                l.a.createElement(
                  "div",
                  { className: "mt-2" },
                  l.a.createElement("input", {
                    type: "text",
                    onChange: e.handleChange,
                    onBlur: e.handleBlur,
                    value: e.values.name,
                    style: e.errors.name
                      ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                      : { width: "300px" },
                    placeholder: "name",
                    name: "name",
                  }),
                  e.errors.name &&
                    l.a.createElement(
                      l.a.Fragment,
                      null,
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "b",
                        { className: "text-danger" },
                        e.errors.name
                      )
                    )
                ),
                l.a.createElement(
                  "div",
                  { className: "mt-2" },
                  l.a.createElement("input", {
                    type: "password",
                    onChange: e.handleChange,
                    onBlur: e.handleBlur,
                    value: e.values.pass,
                    style: e.errors.pass
                      ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                      : { width: "300px" },
                    placeholder: "password",
                    name: "pass",
                  }),
                  e.errors.pass &&
                    l.a.createElement(
                      l.a.Fragment,
                      null,
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "b",
                        { className: "text-danger" },
                        e.errors.pass
                      )
                    )
                ),
                l.a.createElement(
                  "div",
                  { className: "mt-2" },
                  l.a.createElement("input", {
                    type: "password",
                    onChange: e.handleChange,
                    onBlur: e.handleBlur,
                    value: e.values.pass2,
                    style: e.errors.pass2
                      ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                      : { width: "300px" },
                    placeholder: "confirm password",
                    name: "pass2",
                  }),
                  e.errors.pass2 &&
                    l.a.createElement(
                      l.a.Fragment,
                      null,
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "b",
                        { className: "text-danger" },
                        e.errors.pass2
                      )
                    )
                ),
                l.a.createElement(N, { level: "2" }),
                l.a.createElement(
                  M,
                  {
                    className: "btn btn-success mr-2",
                    style: { width: "150px" },
                    type: "submit",
                  },
                  l.a.createElement("b", null, "Submit")
                ),
                l.a.createElement(
                  o.b,
                  { to: "/sign-in" },
                  l.a.createElement(
                    M,
                    {
                      className: "btn btn-primary",
                      style: { width: "150px" },
                      type: "button",
                    },
                    l.a.createElement("b", null, "Sign in")
                  )
                ),
                l.a.createElement(N, { level: "2" })
              );
            }
          ),
          l.a.createElement(V, { status: a, message: i })
        );
      }
      function W() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(P, null),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement("hr", {
            style: { width: "400px", background: "black" },
          }),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(A, { level: "2" }, "Create your account"),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(z, null)
        );
      }
      var X = a(6),
        K = a.n(X),
        Z = a(99),
        _ = a.n(Z),
        $ = D.a().shape({
          old: D.c().label("Old password (current one)").required(),
          new: D.c()
            .label("New password")
            .required()
            .notOneOf(
              [D.b("old"), null],
              "New password is the same as old password"
            )
            .min(3, "New password should contain at least 3 characters"),
          new2: D.c()
            .label("Password confirmation")
            .required()
            .oneOf([D.b("new"), null], "Passwords must match"),
        });
      function ee() {
        var e = Object(n.useState)(null),
          t = Object(m.a)(e, 2),
          a = t[0],
          r = t[1],
          c = Object(n.useState)(null),
          o = Object(m.a)(c, 2),
          s = o[0],
          i = o[1],
          u = E();
        function d() {
          return (
            K()({
              title: "Do you want to delete this account?",
              text:
                "You are about to delete your account. Are you sure about it?",
              icon: "warning",
              buttons: ["No", "Yes"],
            }).then(function (e) {
              e &&
                (r("loading"),
                h
                  .post("api/users/deleteUser", {
                    mail: u.user,
                    token: u.token,
                  })
                  .then(function (e) {
                    u.signout();
                  })
                  .catch(function (e) {
                    r("error"), i(e.message);
                  }));
            }),
            0
          );
        }
        function b(e) {
          return (
            r("loading"),
            h
              .post("api/users/getUserToken", { mail: u.user, pass: e.old })
              .then(function (t) {
                t.data.data
                  ? (function (e) {
                      h.post("api/users/changePassword", {
                        mail: u.user,
                        token: u.token,
                        pass: e.new,
                      })
                        .then(function (e) {
                          r("success"), i("Password was successfully changed");
                        })
                        .catch(function (e) {
                          r("error"), i(e.message);
                        });
                    })(e)
                  : (r("error"), i("Old password is incorrect"));
              })
              .catch(function (e) {
                r("error"), i(e.message);
              }),
            0
          );
        }
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            q.a,
            {
              initialValues: {
                user: u.user,
                profile: u.profile,
                old: "",
                new: "",
                new2: "",
              },
              onSubmit: function (e, t) {
                b(e);
              },
              validationSchema: $,
            },
            function (e) {
              return l.a.createElement(
                "form",
                { onSubmit: e.handleSubmit },
                l.a.createElement(
                  "div",
                  { className: "container" },
                  l.a.createElement(
                    "div",
                    { className: "row justify-content-center" },
                    l.a.createElement(
                      "div",
                      { className: "col-auto my-auto text-left" },
                      l.a.createElement("img", {
                        src: _.a,
                        alt: "avatar",
                        height: "215px",
                      })
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col-auto my-auto" },
                      l.a.createElement(
                        "div",
                        { className: "row mb-3" },
                        l.a.createElement("input", {
                          type: "text",
                          onBlur: e.handleBlur,
                          value: e.values.user,
                          style: { width: "200px" },
                          name: "user",
                          disabled: !0,
                        })
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row mb-3" },
                        l.a.createElement("input", {
                          type: "text",
                          onBlur: e.handleBlur,
                          value: e.values.profile,
                          style: { width: "200px" },
                          name: "profile",
                          disabled: !0,
                        })
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement("input", {
                          type: "password",
                          onChange: e.handleChange,
                          onBlur: e.handleBlur,
                          value: e.values.old,
                          style: e.errors.old
                            ? {
                                width: "200px",
                                backgroundColor: "rgba(255,0,0,0.2)",
                              }
                            : { width: "200px" },
                          placeholder: "old password",
                          name: "old",
                        })
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row mb-3", style: { width: "200px" } },
                        e.errors.old &&
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.old
                          )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement("input", {
                          type: "password",
                          onChange: e.handleChange,
                          onBlur: e.handleBlur,
                          value: e.values.new,
                          style: e.errors.new
                            ? {
                                width: "200px",
                                backgroundColor: "rgba(255,0,0,0.2)",
                              }
                            : { width: "200px" },
                          placeholder: "new password",
                          name: "new",
                        })
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row mb-3", style: { width: "200px" } },
                        e.errors.new &&
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.new
                          )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement("input", {
                          type: "password",
                          onChange: e.handleChange,
                          onBlur: e.handleBlur,
                          value: e.values.new2,
                          style: e.errors.new2
                            ? {
                                width: "200px",
                                backgroundColor: "rgba(255,0,0,0.2)",
                              }
                            : { width: "200px" },
                          placeholder: "confirm new password",
                          name: "new2",
                        })
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row", style: { width: "200px" } },
                        e.errors.new2 &&
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.new2
                          )
                      )
                    )
                  ),
                  l.a.createElement(N, { level: "2" }),
                  l.a.createElement(
                    "div",
                    { className: "row" },
                    l.a.createElement(
                      "div",
                      { className: "col" },
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-danger ml-3",
                          style: { width: "200px" },
                          type: "button",
                          onClick: d,
                        },
                        l.a.createElement("b", null, "Delete account")
                      ),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-success ml-3",
                          style: { width: "200px" },
                          type: "submit",
                        },
                        l.a.createElement("b", null, "Change password")
                      )
                    )
                  )
                ),
                l.a.createElement(N, { level: "1" })
              );
            }
          ),
          l.a.createElement("br", null),
          l.a.createElement(V, { status: a, message: s })
        );
      }
      function te() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "MY PROFILE"),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(ee, null)
        );
      }
      var ae = a(20),
        ne = a.n(ae),
        le = a(35),
        re = a.n(le);
      function ce(e) {
        var t = e.inviteTo,
          a = e.courseName,
          r = e.closeInvite,
          c = Object(n.useState)(null),
          o = Object(m.a)(c, 2),
          s = o[0],
          i = o[1],
          u = Object(n.useState)(null),
          d = Object(m.a)(u, 2),
          E = d[0],
          b = d[1],
          p = Object(n.useState)("20"),
          v = Object(m.a)(p, 2),
          g = v[0],
          f = v[1],
          w = function () {
            i(null), b(null), f("20"), r();
          };
        return l.a.createElement(
          re.a,
          {
            isOpen: null != t,
            onRequestClose: w,
            style: {
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                minWidth: "800px",
                maxHeight: "calc(100vh - 100px)",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                overflowY: "auto",
              },
            },
            ariaHideApp: !1,
          },
          l.a.createElement(
            "div",
            { align: "center" },
            l.a.createElement(A, { level: "2" }, "CREATE INVITE LINK"),
            l.a.createElement(N, { level: "2" }),
            "success" !== s
              ? l.a.createElement(
                  "div",
                  null,
                  l.a.createElement(
                    "b",
                    null,
                    "Invite other people to following course:"
                  ),
                  l.a.createElement(N, { level: "1" }),
                  l.a.createElement("input", {
                    type: "text",
                    value: a,
                    style: { width: "300px", height: "30px" },
                    disabled: !0,
                  }),
                  l.a.createElement(N, { level: "2" }),
                  l.a.createElement(
                    "b",
                    null,
                    "Select expiration time of invite link:"
                  ),
                  l.a.createElement(N, { level: "1" }),
                  l.a.createElement(
                    "select",
                    {
                      value: g,
                      style: { width: "300px", height: "30px" },
                      onChange: function (e) {
                        f(e.target.value);
                      },
                    },
                    l.a.createElement("option", { value: "20" }, "20 minutes"),
                    l.a.createElement("option", { value: "60" }, "1 hour"),
                    l.a.createElement("option", { value: "1440" }, "1 day"),
                    l.a.createElement("option", { value: "4320" }, "3 days"),
                    l.a.createElement("option", { value: "10080" }, "1 week")
                  ),
                  l.a.createElement(N, { level: "1" })
                )
              : l.a.createElement(
                  "b",
                  null,
                  "Following invite link has been successfully generated:"
                ),
            l.a.createElement(N, { level: "1" }),
            "loading" === s
              ? l.a.createElement(H, null)
              : "error" === s
              ? l.a.createElement(L, { error: E })
              : "success" === s
              ? l.a.createElement("p", null, E)
              : null,
            l.a.createElement(N, { level: "2" }),
            "success" !== s
              ? l.a.createElement(
                  M,
                  {
                    className: "btn btn-success ml-2 mr-2",
                    style: { width: "150px" },
                    type: "submit",
                    onClick: function () {
                      i("loading"),
                        h
                          .post("api/invites/createNewInviteLink", {
                            courseName: a,
                            courseId: t,
                            expiration: g,
                          })
                          .then(function (e) {
                            var t =
                              window.location.origin +
                              "/invites/" +
                              e.data.data;
                            i("success"), b(t);
                          })
                          .catch(function (e) {
                            i("error"), b(e.message);
                          });
                    },
                  },
                  l.a.createElement("b", null, "Next")
                )
              : l.a.createElement(
                  M,
                  {
                    className: "btn btn-info ml-2 mr-2",
                    style: { width: "150px" },
                    type: "button",
                    onClick: function () {
                      var e = document.createElement("input");
                      document.body.appendChild(e),
                        e.setAttribute("value", E),
                        e.select(),
                        document.execCommand("copy"),
                        document.body.removeChild(e);
                    },
                  },
                  l.a.createElement("b", null, "Copy")
                ),
            l.a.createElement(
              M,
              {
                className: "btn btn-secondary ml-2 mr-2",
                style: { width: "150px" },
                type: "button",
                onClick: w,
              },
              l.a.createElement("b", null, "Close")
            )
          )
        );
      }
      function oe(e) {
        var t = e.isEditable,
          a = e.noCoursesMessage,
          r = Object(n.useState)(null),
          c = Object(m.a)(r, 2),
          s = c[0],
          i = c[1],
          u = Object(n.useState)(""),
          d = Object(m.a)(u, 2),
          b = d[0],
          p = d[1],
          v = Object(n.useState)(!1),
          g = Object(m.a)(v, 2),
          f = g[0],
          w = g[1],
          y = Object(n.useState)(null),
          x = Object(m.a)(y, 2),
          O = x[0],
          C = x[1],
          j = Object(n.useState)([]),
          S = Object(m.a)(j, 2),
          T = S[0],
          I = S[1],
          A = Object(n.useState)("loading"),
          B = Object(m.a)(A, 2),
          R = B[0],
          P = B[1],
          q = Object(n.useState)(null),
          D = Object(m.a)(q, 2),
          Y = D[0],
          F = D[1],
          L = E(),
          H = t ? L.user : L.token,
          U = t ? "courses/getMyCourses" : "courses/getAccessibleCourses";
        Object(n.useEffect)(
          function () {
            h.post("api/" + U, { user: H })
              .then(function (e) {
                I(e.data.data), P("success");
              })
              .catch(function (e) {
                P("error"), F(e.message);
              });
          },
          [f, U, H]
        );
        var Q = function (e) {
            P("loading"),
              h
                .post("api/courses/deleteCourses", { selectedCourses: e })
                .then(function (e) {
                  F("Course(s) successfully deleted"), w(!f), C(null);
                })
                .catch(function (e) {
                  P("error"), F(e.message);
                });
          },
          G = [
            { name: "Name", selector: "name", sortable: !0, wrap: !0 },
            { name: "From", selector: "org", sortable: !0, wrap: !0 },
            { name: "Category", selector: "cat", sortable: !0, wrap: !0 },
            { name: "Level", selector: "level", sortable: !0, wrap: !0 },
            { name: "Duration", selector: "length", sortable: !0, wrap: !0 },
            {
              name: "Author",
              selector: "author",
              sortable: !0,
              omit: t,
              wrap: !0,
            },
            { name: "Status", selector: "status", sortable: !0, wrap: !0 },
            {
              name: "Actions",
              cell: function (e) {
                return l.a.createElement(
                  "div",
                  { className: "row" },
                  t
                    ? l.a.createElement(
                        "div",
                        null,
                        l.a.createElement(
                          M,
                          {
                            variant: "success",
                            className: "ml-1 mr-1",
                            onClick: function (t) {
                              return (function (e) {
                                P("idle"), i(e._id), p(e.name);
                              })(e);
                            },
                          },
                          l.a.createElement(k, { icon: "user-plus" })
                        ),
                        l.a.createElement(
                          o.b,
                          { to: { pathname: "/edit-course/".concat(e._id) } },
                          l.a.createElement(
                            M,
                            { variant: "primary", className: "ml-1 mr-1" },
                            l.a.createElement(k, { icon: "edit" })
                          )
                        ),
                        l.a.createElement(
                          M,
                          {
                            variant: "danger",
                            className: "ml-1 mr-1",
                            onClick: function (t) {
                              return (function (e) {
                                K()({
                                  title: "Do you want to delete this course?",
                                  text:
                                    "You are about to delete this course. Are you sure about it?",
                                  icon: "warning",
                                  buttons: ["No", "Yes"],
                                }).then(function (t) {
                                  t && Q([e]);
                                });
                              })(e);
                            },
                          },
                          l.a.createElement(k, { icon: "trash-alt" })
                        )
                      )
                    : "Active" === e.status
                    ? l.a.createElement(
                        o.b,
                        { to: { pathname: "/enter-course/".concat(e._id) } },
                        l.a.createElement(
                          M,
                          { variant: "info", className: "ml-1 mr-1" },
                          l.a.createElement(k, { icon: "book-open" })
                        )
                      )
                    : l.a.createElement(
                        M,
                        {
                          variant: "info",
                          disabled: !0,
                          className: "ml-1 mr-1",
                        },
                        l.a.createElement(k, { icon: "book-dead" })
                      )
                );
              },
              ignoreRowClick: !0,
              allowOverflow: !0,
              minWidth: t ? "200px" : "100px",
              button: !0,
            },
          ];
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            "div",
            { className: "w-responsive pl-5 pr-5" },
            l.a.createElement(ne.a, {
              columns: G,
              data: T,
              customStyles: {
                headCells: { style: { fontSize: "16px" } },
                cells: { style: { fontSize: "14px" } },
              },
              highlightOnHover: !0,
              responsive: !0,
              pagination: !0,
              noDataComponent: a,
              selectableRows: t,
              subHeader: t,
              subHeaderAlign: "right",
              onSelectedRowsChange: function (e) {
                return C(e.selectedRows);
              },
              clearSelectedRows: f,
              contextActions: l.a.createElement(
                M,
                {
                  variant: "danger",
                  className: "mr-3",
                  onClick: function () {
                    K()({
                      title: "Do you want to delete selection?",
                      text:
                        "You are about to delete these courses. Are you sure about it?",
                      icon: "warning",
                      buttons: ["No", "Yes"],
                    }).then(function (e) {
                      e && Q(O);
                    });
                  },
                },
                l.a.createElement(k, { icon: "trash-alt" }),
                l.a.createElement("b", null, " Remove")
              ),
              subHeaderComponent: l.a.createElement(
                o.b,
                { to: "/add-course" },
                l.a.createElement(
                  M,
                  { variant: "warning", className: "mr-3" },
                  l.a.createElement(k, { icon: "plus" }),
                  l.a.createElement("b", null, " New course")
                )
              ),
            })
          ),
          l.a.createElement(ce, {
            inviteTo: s,
            courseName: b,
            closeInvite: function () {
              i(null);
            },
          }),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(V, { status: R, message: Y })
        );
      }
      function se() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "ALL COURSES"),
          l.a.createElement("br", null),
          l.a.createElement(oe, {
            isEditable: !1,
            noCoursesMessage: "You have access to 0 courses",
          })
        );
      }
      function ie(e) {
        var t = e.isEditable,
          a = e.noModulesMessage,
          r = Object(n.useState)(!1),
          c = Object(m.a)(r, 2),
          s = c[0],
          i = c[1],
          u = Object(n.useState)(null),
          d = Object(m.a)(u, 2),
          b = d[0],
          p = d[1],
          v = Object(n.useState)([]),
          g = Object(m.a)(v, 2),
          f = g[0],
          w = g[1],
          y = Object(n.useState)("loading"),
          x = Object(m.a)(y, 2),
          O = x[0],
          C = x[1],
          j = Object(n.useState)(null),
          S = Object(m.a)(j, 2),
          T = S[0],
          I = S[1],
          A = E(),
          B = t ? A.user : A.token,
          R = t ? "modules/getMyModules" : "modules/getAccessibleModules";
        Object(n.useEffect)(
          function () {
            h.post("api/" + R, { user: B })
              .then(function (e) {
                if (e.data.data) {
                  var t = [];
                  e.data.data.forEach(function (e) {
                    var a = 0;
                    e.content &&
                      e.content.length > 0 &&
                      e.content.forEach(function (e) {
                        a += e.points;
                      });
                    var n = {
                      _id: e._id,
                      name: e.name,
                      cat: e.cat,
                      type: e.type,
                      author: e.author,
                      limit: e.limit,
                      timer: e.timer,
                      points: a,
                    };
                    t.push(n);
                  }),
                    w(t),
                    C("success");
                }
              })
              .catch(function (e) {
                C("error"), I(e.message);
              });
          },
          [s, R, B]
        );
        var P = function (e) {
            C("loading"),
              h
                .post("api/modules/deleteModules", { selectedModules: e })
                .then(function (e) {
                  I("Module(s) successfully deleted"), i(!s), p(null);
                })
                .catch(function (e) {
                  C("error"), I(e.message);
                });
          },
          q = [
            { name: "Name", selector: "name", sortable: !0, wrap: !0 },
            { name: "Category", selector: "cat", sortable: !0, wrap: !0 },
            { name: "Type", selector: "type", sortable: !0, wrap: !0 },
            { name: "Max points", selector: "points", sortable: !0, wrap: !0 },
            {
              name: "Author",
              selector: "author",
              sortable: !0,
              omit: t,
              wrap: !0,
            },
            { name: "Time limit", selector: "limit", sortable: !0, wrap: !0 },
            { name: "Timer", selector: "timer", sortable: !0, wrap: !0 },
            {
              name: "Actions",
              cell: function (e) {
                return l.a.createElement(
                  "div",
                  { className: "row" },
                  t
                    ? l.a.createElement(
                        "div",
                        null,
                        l.a.createElement(
                          o.b,
                          { to: { pathname: "/edit-module/".concat(e._id) } },
                          l.a.createElement(
                            M,
                            { variant: "primary", className: "ml-1 mr-1" },
                            l.a.createElement(k, { icon: "edit" })
                          )
                        ),
                        l.a.createElement(
                          M,
                          {
                            variant: "danger",
                            className: "ml-1 mr-1",
                            onClick: function (t) {
                              return (function (e) {
                                K()({
                                  title: "Do you want to delete this module?",
                                  text:
                                    "You are about to delete this module. Are you sure about it?",
                                  icon: "warning",
                                  buttons: ["No", "Yes"],
                                }).then(function (t) {
                                  t && P([e]);
                                });
                              })(e);
                            },
                          },
                          l.a.createElement(k, { icon: "trash-alt" })
                        )
                      )
                    : l.a.createElement(
                        o.b,
                        { to: { pathname: "/enter-module/".concat(e._id) } },
                        l.a.createElement(
                          M,
                          { variant: "info", className: "ml-1 mr-1" },
                          l.a.createElement(k, { icon: "eye" })
                        )
                      )
                );
              },
              ignoreRowClick: !0,
              allowOverflow: !0,
              minWidth: t ? "150px" : "100px",
              button: !0,
            },
          ];
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            "div",
            { className: "w-responsive pl-5 pr-5" },
            l.a.createElement(ne.a, {
              columns: q,
              data: f,
              customStyles: {
                headCells: { style: { fontSize: "16px" } },
                cells: { style: { fontSize: "14px" } },
              },
              highlightOnHover: !0,
              responsive: !0,
              pagination: !0,
              noDataComponent: a,
              selectableRows: t,
              subHeader: t,
              subHeaderAlign: "right",
              onSelectedRowsChange: function (e) {
                return p(e.selectedRows);
              },
              clearSelectedRows: s,
              contextActions: l.a.createElement(
                M,
                {
                  variant: "danger",
                  className: "mr-3",
                  onClick: function () {
                    K()({
                      title: "Do you want to delete selection?",
                      text:
                        "You are about to delete these modules. Are you sure about it?",
                      icon: "warning",
                      buttons: ["No", "Yes"],
                    }).then(function (e) {
                      e && P(b);
                    });
                  },
                },
                l.a.createElement(k, { icon: "trash-alt" }),
                l.a.createElement("b", null, " Remove")
              ),
              subHeaderComponent: l.a.createElement(
                o.b,
                { to: "/add-module" },
                l.a.createElement(
                  M,
                  { variant: "warning", className: "mr-3" },
                  l.a.createElement(k, { icon: "plus" }),
                  l.a.createElement("b", null, " New module")
                )
              ),
            })
          ),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(V, { status: O, message: T })
        );
      }
      function me() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "ALL MODULES"),
          l.a.createElement("br", null),
          l.a.createElement(ie, {
            isEditable: !1,
            noCoursesMessage: "You have access to 0 modules",
          })
        );
      }
      function ue(e) {
        var t = e.name,
          a = e.counter;
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "4" }, "Welcome to ", t, "!"),
          l.a.createElement("br", null),
          l.a.createElement(
            "p",
            null,
            "This course has ",
            l.a.createElement("b", null, a),
            " sections in total. Complete the last section to successfully finish this course!"
          ),
          l.a.createElement(
            "p",
            { className: "text-danger" },
            l.a.createElement(
              "b",
              null,
              l.a.createElement(
                "i",
                null,
                "* If you cannot unlock any new sections, try getting better results in sections you currently have"
              )
            )
          )
        );
      }
      function de(e) {
        var t = e.name;
        e.counter;
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(k, {
            icon: "thumbs-up",
            className: "fa-5x text-success",
          }),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(A, { level: "4" }, "Congratulations!"),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(
            "p",
            null,
            "You have successfully unlocked all sections of ",
            l.a.createElement("b", null, t),
            "!",
            l.a.createElement("br", null),
            "Finish the last section to complete this course!"
          )
        );
      }
      function Ee(e) {
        var t = e.course,
          a = e.section,
          n = e.name,
          r = e.maxPoints,
          c = e.points;
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(A, { level: "2" }, n),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(
            "p",
            null,
            "You currently have ",
            l.a.createElement("b", null, c),
            " out of ",
            l.a.createElement("b", null, r),
            " points!"
          ),
          l.a.createElement(
            "p",
            { className: "text-danger" },
            l.a.createElement(
              "b",
              null,
              l.a.createElement(
                "i",
                null,
                "* Your progress is not saved until you finish a section"
              )
            ),
            l.a.createElement("br", null),
            c > 0
              ? l.a.createElement(
                  "b",
                  null,
                  l.a.createElement(
                    "i",
                    null,
                    "* Your current progress will be rewritten"
                  )
                )
              : null
          ),
          l.a.createElement(N, { level: "1" }),
          l.a.createElement(
            o.b,
            { to: { pathname: "/enter-course/".concat(t, "/").concat(a) } },
            l.a.createElement(
              M,
              {
                className: "btn btn-warning",
                style: { width: "200px" },
                type: "button",
              },
              l.a.createElement("b", null, "Start")
            )
          ),
          l.a.createElement(N, { level: "1" })
        );
      }
      function be(e) {
        var t = Object(n.useState)([]),
          a = Object(m.a)(t, 2),
          r = a[0],
          c = a[1],
          o = Object(n.useState)("COURSE"),
          s = Object(m.a)(o, 2),
          i = s[0],
          u = s[1],
          d = Object(n.useState)(0),
          b = Object(m.a)(d, 2),
          p = b[0],
          v = b[1],
          g = Object(n.useState)([]),
          f = Object(m.a)(g, 2),
          w = f[0],
          y = f[1],
          x = Object(n.useState)(0),
          O = Object(m.a)(x, 2),
          C = O[0],
          j = O[1],
          S = Object(n.useState)("loading"),
          k = Object(m.a)(S, 2),
          T = k[0],
          I = k[1],
          M = Object(n.useState)(null),
          B = Object(m.a)(M, 2),
          R = B[0],
          P = B[1],
          q = E();
        return (
          Object(n.useEffect)(
            function () {
              h.post("api/users/getSelectedUsers", { tokens: [q.token] })
                .then(function (t) {
                  if (t.data.data) {
                    var a = t.data.data[0],
                      n = 0,
                      l = [],
                      r = [],
                      o = 0;
                    if (a.progress && a.progress.length > 0) {
                      var s = a.progress.find(function (t) {
                        return t.course === e.match.params.course;
                      });
                      s &&
                        (s.rewards.forEach(function (e) {
                          n += e.points;
                        }),
                        (l = s.rewards));
                    }
                    h.post("api/courses/getCourse", {
                      course: e.match.params.course,
                    })
                      .then(function (e) {
                        if (e.data.data) {
                          var t = e.data.data;
                          t.content &&
                            t.content.length > 0 &&
                            t.content.forEach(function (e) {
                              n >= e.unlockPoints && o++, r.push(e);
                            }),
                            r.sort(function (e, t) {
                              return e.unlockPoints > t.unlockPoints
                                ? 1
                                : t.unlockPoints > e.unlockPoints
                                ? -1
                                : 0;
                            }),
                            c(l),
                            u(t.name),
                            v(t.content.length),
                            j(o),
                            y(r),
                            I("success");
                        }
                      })
                      .catch(function (e) {
                        I("error"), P(e.message);
                      });
                  }
                })
                .catch(function (e) {
                  I("error"), P(e.message);
                });
            },
            [q.token, e.match.params.course]
          ),
          l.a.createElement(
            "div",
            { align: "center" },
            l.a.createElement(A, { level: "1" }, i),
            l.a.createElement(N, { level: "2" }),
            0 !== C && w.length === C
              ? l.a.createElement(de, { name: i, counter: p })
              : l.a.createElement(ue, { name: i, counter: p }),
            l.a.createElement(N, { level: "2" }),
            l.a.createElement(
              "div",
              { className: "row" },
              l.a.createElement(
                "div",
                {
                  className: "col border nav flex-column nav-pills",
                  id: "v-pills-tab",
                  role: "tablist",
                  "aria-orientation": "vertical",
                },
                w.map(function (e, t) {
                  return l.a.createElement(
                    "a",
                    {
                      key: t,
                      className:
                        "nav-link" +
                        (t === C - 1 ? " active" : t >= C ? " disabled" : ""),
                      id: t + "-tab",
                      "data-toggle": "pill",
                      href: "#tab" + t,
                      role: "tab",
                      "aria-controls": "tab" + t,
                      "aria-selected": "true",
                    },
                    e.name
                  );
                })
              ),
              l.a.createElement(
                "div",
                {
                  className: "col-9 border tab-content",
                  id: "v-pills-tabContent",
                },
                w.map(function (t, a) {
                  return l.a.createElement(
                    "div",
                    {
                      key: a,
                      className:
                        "tab-pane fade" + (a === C - 1 ? " show active" : ""),
                      id: "tab" + a,
                      role: "tabpanel",
                      "aria-labelledby": a + "-tab",
                    },
                    l.a.createElement(Ee, {
                      course: e.match.params.course,
                      section: t._id,
                      name: t.name,
                      maxPoints: t.rewardPoints,
                      points: r.find(function (e) {
                        return e.section === t._id;
                      })
                        ? r.find(function (e) {
                            return e.section === t._id;
                          }).points
                        : 0,
                    })
                  );
                })
              )
            ),
            l.a.createElement(N, { level: "2" }),
            l.a.createElement(V, { status: T, message: R })
          )
        );
      }
      var pe = a(103),
        he = a.n(pe),
        ve = a(59),
        ge = a.n(ve);
      function fe(e) {
        var t = e.name,
          a = e.timer,
          n = e.limit,
          r = e.seconds;
        if ("Clock" === a) {
          var c = ge.a.duration({ s: r }),
            o = ge()().startOf("day").add(c).format("HH:mm:ss");
          return l.a.createElement(
            l.a.Fragment,
            null,
            l.a.createElement(
              "div",
              {
                className:
                  "row border border-top-0 border-dark align-self-center",
              },
              l.a.createElement(
                "div",
                {
                  className:
                    "col alert alert-secondary align-self-center mt-3 ml-4 mr-4",
                },
                l.a.createElement(
                  A,
                  { level: "4" },
                  l.a.createElement("b", null, t)
                )
              ),
              l.a.createElement(
                "div",
                {
                  className:
                    "col alert alert-info align-self-center mt-3 ml-4 mr-4",
                },
                l.a.createElement(A, { level: "4" }, o)
              )
            ),
            l.a.createElement(N, { level: "3" })
          );
        }
        if ("Countdown" === a) {
          var s = ge.a.duration({ s: 60 * n - r }),
            i = ge()().startOf("day").add(s).format("HH:mm:ss");
          return l.a.createElement(
            l.a.Fragment,
            null,
            l.a.createElement(
              "div",
              {
                className:
                  "row border border-top-0 border-dark align-self-center",
              },
              l.a.createElement(
                "div",
                {
                  className:
                    "col alert alert-secondary align-self-center mt-3 ml-4 mr-4",
                },
                l.a.createElement(
                  A,
                  { level: "4" },
                  l.a.createElement("b", null, t)
                )
              ),
              l.a.createElement(
                "div",
                {
                  className:
                    "col alert alert-danger align-self-center mt-3 ml-4 mr-4",
                },
                l.a.createElement(A, { level: "4" }, i)
              )
            ),
            l.a.createElement(N, { level: "3" })
          );
        }
        return l.a.createElement(
          l.a.Fragment,
          null,
          l.a.createElement(
            "div",
            {
              className:
                "row border border-top-0 border-dark align-self-center",
            },
            l.a.createElement(
              "div",
              {
                className:
                  "col alert alert-secondary align-self-center mt-3 ml-4 mr-4",
              },
              l.a.createElement(
                A,
                { level: "4" },
                l.a.createElement("b", null, t)
              )
            )
          ),
          l.a.createElement(N, { level: "3" })
        );
      }
      function we(e) {
        var t = e.moduleId,
          a = e.addPoints,
          r = e.changeTab,
          c = Object(n.useState)([]),
          o = Object(m.a)(c, 2),
          s = o[0],
          i = o[1],
          u = Object(n.useState)(null),
          d = Object(m.a)(u, 2),
          E = d[0],
          b = d[1],
          p = Object(n.useState)(null),
          v = Object(m.a)(p, 2),
          g = v[0],
          f = v[1],
          w = Object(n.useState)(null),
          y = Object(m.a)(w, 2),
          x = y[0],
          O = y[1],
          C = Object(n.useState)(null),
          j = Object(m.a)(C, 2),
          S = j[0],
          k = j[1],
          T = Object(n.useState)(null),
          I = Object(m.a)(T, 2),
          B = I[0],
          R = I[1],
          P = Object(n.useState)(0),
          q = Object(m.a)(P, 2),
          D = q[0],
          Y = q[1],
          F = Object(n.useState)("loading"),
          L = Object(m.a)(F, 2),
          H = L[0],
          U = L[1],
          Q = Object(n.useState)(null),
          G = Object(m.a)(Q, 2),
          J = G[0],
          z = G[1],
          W = function (e) {
            var t = e.toUpperCase();
            return (t = t.replace(/\s/g, ""));
          },
          X = function () {
            var e = 0;
            if ("Info" === g)
              s.forEach(function (t) {
                D >= 60 * t.rqmt && (e += t.points);
              });
            else {
              var t = 1;
              s.forEach(function (a) {
                if ("HTML" !== a.sType) {
                  var n = "question-" + t;
                  if ("Text answer" === a.sType) {
                    W(a.rqmt) === W(document.getElementById(n).value) &&
                      (e += a.points);
                  } else {
                    var l = a.rqmt.split(";;;").slice(0, -1),
                      r = document.getElementsByName(n),
                      c = Array.prototype.slice.call(r).filter(function (e) {
                        return !0 === e.checked;
                      });
                    if ("One correct choice" === a.sType)
                      c[0] && l[0] && c[0].id === l[0] && (e += a.points);
                    else {
                      var o = 0;
                      if (0 === l.length)
                        o = a.points - (c.length / r.length) * a.points;
                      else {
                        var s = 0;
                        c.forEach(function (e) {
                          l.includes(e.id) ? (s += 1) : (s -= 1);
                        }),
                          (o = (o = (s / l.length) * a.points) < 0 ? 0 : o);
                      }
                      e += o;
                    }
                  }
                  t += 1;
                }
              });
            }
            a(e), r("results");
          };
        return (
          (function (e, t) {
            var a = Object(n.useRef)();
            Object(n.useEffect)(
              function () {
                a.current = e;
              },
              [e]
            ),
              Object(n.useEffect)(
                function () {
                  if (null !== t) {
                    var e = setInterval(function () {
                      a.current();
                    }, t);
                    return function () {
                      return clearInterval(e);
                    };
                  }
                },
                [t]
              );
          })(function () {
            (document.hasFocus() || "Countdown" === B) && Y(D + 1),
              null !== x && 0 !== x && D >= 60 * x && X();
          }, 1e3),
          Object(n.useEffect)(
            function () {
              h.post("api/modules/getModule", { module: t })
                .then(function (e) {
                  b(e.data.data.name),
                    f(e.data.data.type),
                    O(e.data.data.limit),
                    R(e.data.data.timer),
                    i(e.data.data.content),
                    (function (e, t) {
                      var a = 1,
                        n = "";
                      if (
                        (e.forEach(function (e) {
                          if (
                            "HTML" === e.sType ||
                            "Video or media" === e.sType
                          )
                            (n += e.data), (n += "<br /><br />");
                          else if ("Text answer" === e.sType)
                            (n += e.data),
                              (n +=
                                "<input style='width:250px;' id='question-" +
                                a +
                                "' />"),
                              (n += "<br /><br /><br />"),
                              (a += 1);
                          else {
                            var t =
                                "One correct choice" === e.sType
                                  ? "radio"
                                  : "checkbox",
                              l = e.data.split(";;;")[0],
                              r = e.data.split(";;;").slice(1, -1);
                            if (
                              ((n += l),
                              (n +=
                                "<div style='display: inline-block;' align='left'>"),
                              e.rnd)
                            )
                              for (var c = r.length - 1; c > 0; c--) {
                                var o = Math.floor(Math.random() * (c + 1)),
                                  s = r[c];
                                (r[c] = r[o]), (r[o] = s);
                              }
                            r.forEach(function (e) {
                              (n += "<input type='" + t + "' id='" + e),
                                (n +=
                                  "' name='question-" +
                                  a +
                                  "' /> " +
                                  e +
                                  "<br />");
                            }),
                              (n += "<br /><br />"),
                              (a += 1);
                          }
                        }),
                        n)
                      ) {
                        var l = "<div align='center'>";
                        "Test" === t &&
                          (l =
                            "<div style='display: inline-block;max-width: 75%;' align='left'>"),
                          (l += n),
                          k((l += "</div>"));
                      }
                    })(e.data.data.content, e.data.data.type),
                    U("success");
                })
                .catch(function (e) {
                  U("error"), z(e.message);
                });
            },
            [t]
          ),
          l.a.createElement(
            "div",
            { align: "center" },
            l.a.createElement(
              "div",
              { className: "w-75" },
              l.a.createElement(fe, { name: E, timer: B, limit: x, seconds: D })
            ),
            S
              ? he()(S)
              : l.a.createElement(
                  l.a.Fragment,
                  null,
                  l.a.createElement(
                    A,
                    { level: "2" },
                    "This module contains no content"
                  ),
                  l.a.createElement(N, { level: "1" })
                ),
            l.a.createElement(V, { status: H, message: J }),
            l.a.createElement(N, { level: "1" }),
            l.a.createElement(
              M,
              {
                className: "btn btn-success",
                style: { width: "200px" },
                type: "button",
                onClick: X,
                disabled: null === g,
              },
              l.a.createElement("b", null, "Next")
            )
          )
        );
      }
      function ye(e) {
        var t = Object(n.useState)(0),
          a = Object(m.a)(t, 2),
          r = a[0],
          c = a[1],
          o = Object(n.useState)(),
          s = Object(m.a)(o, 2),
          i = s[0],
          u = s[1],
          d = Object(n.useState)([]),
          b = Object(m.a)(d, 2),
          p = b[0],
          v = b[1],
          g = Object(n.useState)(0),
          w = Object(m.a)(g, 2),
          y = w[0],
          x = w[1],
          O = Object(n.useState)("loading"),
          C = Object(m.a)(O, 2),
          j = C[0],
          S = C[1],
          T = Object(n.useState)(null),
          I = Object(m.a)(T, 2),
          B = I[0],
          R = I[1],
          P = E();
        return (
          Object(n.useEffect)(
            function () {
              h.post("api/courses/getSection", {
                courseId: e.match.params.course,
                sectionId: e.match.params.section,
              })
                .then(function (e) {
                  e.data.data && (v(e.data.data), u("start"), S("success"));
                })
                .catch(function (e) {
                  S("error"), R(e.message);
                });
            },
            [e.match.params.course, e.match.params.section]
          ),
          "redirect" === i
            ? l.a.createElement(f.a, {
                push: !0,
                to: {
                  pathname: "/enter-course/".concat(e.match.params.course),
                },
              })
            : l.a.createElement(
                "div",
                { align: "center" },
                "start" === i
                  ? l.a.createElement(we, {
                      moduleId: p.modules[y],
                      addPoints: function (e) {
                        c(r + e);
                      },
                      changeTab: function () {
                        y < p.modules.length - 1 ? x(y + 1) : u("end");
                      },
                    })
                  : "end" === i
                  ? l.a.createElement(
                      l.a.Fragment,
                      null,
                      (r * p.rewardMargin).toFixed(0) < p.minPoints
                        ? l.a.createElement(
                            l.a.Fragment,
                            null,
                            l.a.createElement(k, {
                              icon: "thumbs-down",
                              className: "fa-5x text-danger",
                            }),
                            l.a.createElement(N, { level: "1" }),
                            l.a.createElement(
                              A,
                              { level: "2" },
                              "BETTER LUCK NEXT TIME!"
                            ),
                            l.a.createElement(N, { level: "2" }),
                            l.a.createElement(
                              "p",
                              null,
                              "You were unable to meet the minimum requirement for this section.",
                              l.a.createElement("br", null),
                              "Therefore you will get",
                              " ",
                              l.a.createElement(
                                "b",
                                null,
                                (r * p.rewardMargin).toFixed(0) - p.penalty
                              ),
                              " ",
                              "point(s) out of ",
                              l.a.createElement("b", null, p.rewardPoints),
                              "!"
                            )
                          )
                        : l.a.createElement(
                            l.a.Fragment,
                            null,
                            l.a.createElement(k, {
                              icon: "thumbs-up",
                              className: "fa-5x text-success",
                            }),
                            l.a.createElement(N, { level: "1" }),
                            l.a.createElement(
                              A,
                              { level: "2" },
                              "CONGRATULATIONS!"
                            ),
                            l.a.createElement(N, { level: "2" }),
                            l.a.createElement(
                              "p",
                              null,
                              "You got",
                              " ",
                              l.a.createElement(
                                "b",
                                null,
                                0 !== p.rewardMargin
                                  ? (r * p.rewardMargin).toFixed(0)
                                  : p.rewardPoints
                              ),
                              " ",
                              "point(s) out of ",
                              l.a.createElement("b", null, p.rewardPoints),
                              "!"
                            )
                          ),
                      l.a.createElement(N, { level: "2" }),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-success ml-2 mr-2",
                          style: { width: "200px" },
                          type: "button",
                          onClick: function () {
                            var t = p.rewardPoints;
                            0 !== p.rewardMargin &&
                              (t = (r * p.rewardMargin).toFixed(0)) <
                                p.minPoints &&
                              (t -= p.penalty),
                              h
                                .post("api/users/saveProgress", {
                                  user: P.token,
                                  course: e.match.params.course,
                                  section: e.match.params.section,
                                  points: t,
                                })
                                .then(function (e) {
                                  u("redirect");
                                })
                                .catch(function (e) {
                                  S("error"), R(e.message);
                                });
                          },
                        },
                        l.a.createElement("b", null, "Finish")
                      ),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-info ml-2 mr-2",
                          style: { width: "200px" },
                          type: "button",
                          onClick: function () {
                            S("idle"), c(0), x(0), u("start");
                          },
                        },
                        l.a.createElement("b", null, "Retry")
                      )
                    )
                  : null,
                l.a.createElement(N, { level: "1" }),
                l.a.createElement(V, { status: j, message: B })
              )
        );
      }
      function xe(e) {
        var t = Object(n.useState)(0),
          a = Object(m.a)(t, 2),
          r = a[0],
          c = a[1],
          o = Object(n.useState)("module"),
          s = Object(m.a)(o, 2),
          i = s[0],
          u = s[1],
          d = function (e) {
            u(e);
          };
        return l.a.createElement(
          "div",
          { align: "center" },
          "module" === i
            ? l.a.createElement(we, {
                moduleId: e.match.params.module,
                addPoints: function (e) {
                  c(r + e);
                },
                changeTab: d,
              })
            : l.a.createElement(
                l.a.Fragment,
                null,
                l.a.createElement(k, {
                  icon: "check-circle",
                  className: "fa-5x text-muted",
                }),
                l.a.createElement(N, { level: "1" }),
                l.a.createElement(A, { level: "2" }, "CONGRATULATIONS!"),
                l.a.createElement(N, { level: "2" }),
                l.a.createElement(
                  "p",
                  null,
                  "You got ",
                  l.a.createElement("b", null, r),
                  " point(s)!"
                ),
                l.a.createElement(N, { level: "2" }),
                l.a.createElement(
                  M,
                  {
                    className: "btn btn-info",
                    style: { width: "200px" },
                    type: "button",
                    onClick: function () {
                      c(0), d("module");
                    },
                  },
                  l.a.createElement("b", null, "Retry")
                )
              )
        );
      }
      var Ne = D.a().shape({
        name: D.c().label("Name").required(),
        org: D.c().label("Organizer").required(),
        cat: D.c().label("Category").required(),
        length: D.c().label("Duration").required(),
      });
      function Oe(e) {
        var t = e.courseId,
          a = e.changeTab,
          r = E(),
          c = Object(n.useState)({
            name: "",
            org: "",
            cat: "",
            level: "Beginner",
            length: "",
            status: "Active",
            author: r.user,
          }),
          o = Object(m.a)(c, 2),
          s = o[0],
          i = o[1],
          u = Object(n.useState)("loading"),
          d = Object(m.a)(u, 2),
          b = d[0],
          p = d[1],
          v = Object(n.useState)(null),
          g = Object(m.a)(v, 2),
          f = g[0],
          w = g[1];
        return (
          Object(n.useEffect)(
            function () {
              t
                ? h
                    .post("api/courses/getCourse", { course: t })
                    .then(function (e) {
                      i(e.data.data), p("success");
                    })
                    .catch(function (e) {
                      p("error"), w(e.message);
                    })
                : p("idle");
            },
            [t]
          ),
          l.a.createElement(
            "div",
            { align: "center" },
            l.a.createElement(
              q.a,
              {
                initialValues: {
                  name: s.name,
                  org: s.org,
                  cat: s.cat,
                  level: s.level,
                  length: s.length,
                  status: s.status,
                  author: s.author,
                },
                onSubmit: function (e, n) {
                  !(function (e) {
                    p("loading"),
                      t
                        ? h
                            .post("api/courses/updateCourseInfo", {
                              courseId: t,
                              name: e.name,
                              org: e.org,
                              cat: e.cat,
                              level: e.level,
                              length: e.length,
                              status: e.status,
                            })
                            .then(function (e) {
                              p("success"), w("Course successfully updated");
                            })
                            .catch(function (e) {
                              p("error"), w(e.message);
                            })
                        : h
                            .post("api/courses/createNewCourse", {
                              name: e.name,
                              org: e.org,
                              cat: e.cat,
                              level: e.level,
                              length: e.length,
                              status: e.status,
                              author: e.author,
                              withAccess: r.token,
                            })
                            .then(function (e) {
                              a(e.data.data);
                            })
                            .catch(function (e) {
                              p("error"), w(e.message);
                            });
                  })(e);
                },
                validationSchema: Ne,
                enableReinitialize: !0,
              },
              function (e) {
                return l.a.createElement(
                  "form",
                  { onSubmit: e.handleSubmit },
                  l.a.createElement(
                    "div",
                    { className: "container" },
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement("b", null, "Name (should be unique)"),
                      l.a.createElement("br", null),
                      l.a.createElement("input", {
                        type: "text",
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.name,
                        style: e.errors.name
                          ? {
                              width: "300px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "300px", height: "30px" },
                        name: "name",
                        placeholder: "name",
                      }),
                      e.errors.name &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement("br", null),
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.name
                          )
                        )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement(
                        "b",
                        null,
                        "Organizer (who is this course from)"
                      ),
                      l.a.createElement("br", null),
                      l.a.createElement("input", {
                        type: "text",
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.org,
                        style: e.errors.org
                          ? {
                              width: "300px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "300px", height: "30px" },
                        name: "org",
                        placeholder: "organizer",
                      }),
                      e.errors.org &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement("br", null),
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.org
                          )
                        )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement(
                        "b",
                        null,
                        "Category (medical, technical, etc.)"
                      ),
                      l.a.createElement("br", null),
                      l.a.createElement("input", {
                        type: "text",
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.cat,
                        style: e.errors.cat
                          ? {
                              width: "300px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "300px", height: "30px" },
                        name: "cat",
                        placeholder: "category",
                      }),
                      e.errors.cat &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement("br", null),
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.cat
                          )
                        )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement(
                        "b",
                        null,
                        "Duration (how long it should take)"
                      ),
                      l.a.createElement("br", null),
                      l.a.createElement("input", {
                        type: "text",
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.length,
                        style: e.errors.length
                          ? {
                              width: "300px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "300px", height: "30px" },
                        name: "length",
                        placeholder: "duration",
                      }),
                      e.errors.length &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement("br", null),
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.length
                          )
                        )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement(
                        "b",
                        null,
                        "Level (estimated difficulty)"
                      ),
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "select",
                        {
                          onChange: e.handleChange,
                          onBlur: e.handleBlur,
                          value: e.values.level,
                          style: { width: "300px", height: "30px" },
                          name: "level",
                        },
                        l.a.createElement(
                          "option",
                          { value: "Beginner" },
                          "Beginner"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "Elementary" },
                          "Elementary"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "Intermediate" },
                          "Intermediate"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "Advanced" },
                          "Advanced"
                        )
                      )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement(
                        "b",
                        null,
                        "Status (current accessibility)"
                      ),
                      l.a.createElement("br", null),
                      l.a.createElement(
                        "select",
                        {
                          onChange: e.handleChange,
                          onBlur: e.handleBlur,
                          value: e.values.status,
                          style: { width: "300px", height: "30px" },
                          name: "status",
                        },
                        l.a.createElement(
                          "option",
                          { value: "Active" },
                          "Active"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "Inactive" },
                          "Inactive"
                        )
                      )
                    ),
                    l.a.createElement(N, { level: "2" }),
                    l.a.createElement(
                      "div",
                      { className: "row justify-content-center" },
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-primary",
                          style: { width: "250px" },
                          type: "submit",
                        },
                        l.a.createElement("b", null, "Save course info")
                      )
                    )
                  ),
                  l.a.createElement(N, { level: "2" })
                );
              }
            ),
            l.a.createElement(N, { level: "1" }),
            l.a.createElement(V, { status: b, message: f })
          )
        );
      }
      var Ce = a(18),
        je = D.a().shape({ name: D.c().label("Name").required() });
      function Se(e) {
        var t = e.sectionId,
          a = e.courseId,
          r = e.closeModal,
          c = {
            name: "",
            rewardMargin: 0,
            rewardPoints: 0,
            unlockPoints: 0,
            minPoints: 0,
            penalty: 0,
          },
          o = [{ _id: "new", name: "select module", points: 0 }],
          s = Object(n.useState)("loading"),
          i = Object(m.a)(s, 2),
          u = i[0],
          d = i[1],
          b = Object(n.useState)(null),
          p = Object(m.a)(b, 2),
          v = p[0],
          g = p[1],
          f = Object(n.useState)(c),
          w = Object(m.a)(f, 2),
          y = w[0],
          x = w[1],
          O = Object(n.useState)(o),
          C = Object(m.a)(O, 2),
          j = C[0],
          S = C[1],
          T = Object(n.useState)(0),
          I = Object(m.a)(T, 2),
          B = I[0],
          R = I[1],
          P = Object(n.useState)([]),
          D = Object(m.a)(P, 2),
          Y = D[0],
          F = D[1],
          V = E(),
          U = function (e) {
            d("loading"), g(null), x(c), S(o), R(0), F([]), r(e);
          },
          Q = function () {
            var e = Object(Ce.a)(j);
            e.push(o[0]), S(e);
          },
          G = function (e, t) {
            var a = Object(Ce.a)(j),
              n = 0;
            (a[e] = Y.find(function (e) {
              return e._id === t;
            })),
              S(a),
              a.forEach(function (e) {
                n += e.points;
              }),
              R(n);
          };
        return (
          Object(n.useEffect)(
            function () {
              h.post("api/modules/getAccessibleModules", { user: V.token })
                .then(function (e) {
                  if (e.data.data) {
                    var n = [{ _id: "new", name: "select module", points: 0 }];
                    e.data.data.forEach(function (e) {
                      var t = 0;
                      e.content &&
                        e.content.length > 0 &&
                        e.content.forEach(function (e) {
                          t += e.points;
                        });
                      var a = { _id: e._id, name: e.name, points: t };
                      n.push(a);
                    }),
                      F(n),
                      t &&
                        ("new" !== t
                          ? h
                              .post("api/courses/getSection", {
                                courseId: a,
                                sectionId: t,
                              })
                              .then(function (e) {
                                var t;
                                (t = e.data.data.modules),
                                  h
                                    .post("api/modules/getModules", {
                                      modules: t,
                                    })
                                    .then(function (e) {
                                      if (e.data.data) {
                                        var a = Array(e.data.data.length),
                                          n = 0;
                                        e.data.data.forEach(function (e) {
                                          var l = 0;
                                          e.content.forEach(function (e) {
                                            l += e.points;
                                          });
                                          var r = {
                                              _id: e._id,
                                              name: e._name,
                                              points: l,
                                            },
                                            c = t.indexOf(e._id);
                                          (a[c] = r), (n += l);
                                        }),
                                          S(a),
                                          R(n);
                                      }
                                    }),
                                  x(e.data.data),
                                  d("success");
                              })
                              .catch(function (e) {
                                d("error"), g(e.message);
                              })
                          : d("idle"));
                  }
                })
                .catch(function (e) {
                  d("error"), g(e.message);
                });
            },
            [a, t, V.token]
          ),
          l.a.createElement(
            re.a,
            {
              isOpen: null !== t,
              onRequestClose: function (e) {
                return U(!0);
              },
              style: {
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  minWidth: "650px",
                  maxHeight: "calc(100vh - 100px)",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  overflowY: "auto",
                },
              },
              ariaHideApp: !1,
            },
            l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                A,
                { level: "2" },
                "new" === t ? "ADD SECTION" : "EDIT SECTION"
              ),
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                q.a,
                {
                  initialValues: {
                    name: y.name,
                    rewardPoints: y.rewardPoints,
                    unlockPoints: y.unlockPoints,
                    minPoints: y.minPoints,
                    penalty: y.penalty,
                  },
                  onSubmit: function (e, n) {
                    !(function (e) {
                      d("loading");
                      var n = [];
                      if (
                        (j.forEach(function (e) {
                          n.push(e._id);
                        }),
                        n.includes("new"))
                      )
                        return (
                          d("error"), void g("All modules must be selected")
                        );
                      var l;
                      if (
                        ((l = n),
                        l.filter(function (e, t) {
                          return l.indexOf(e) !== t;
                        })).length > 0
                      )
                        return (
                          d("error"),
                          void g("One module cannot be selected more than once")
                        );
                      var r = 0 === B ? 0 : e.rewardPoints / B,
                        c = {
                          name: e.name,
                          modules: n,
                          rewardMargin: r,
                          rewardPoints: e.rewardPoints,
                          unlockPoints: e.unlockPoints,
                          minPoints: e.minPoints,
                          penalty: e.penalty,
                        };
                      "new" === t
                        ? h
                            .post("api/courses/addNewSection", {
                              courseId: a,
                              section: c,
                            })
                            .then(function (e) {
                              U(!1);
                            })
                            .catch(function (e) {
                              d("error"), g(e.message);
                            })
                        : h
                            .post("api/courses/updateSection", {
                              sectionId: t,
                              courseId: a,
                              section: c,
                            })
                            .then(function (e) {
                              U(!1);
                            })
                            .catch(function (e) {
                              d("error"), g(e.message);
                            });
                    })(e);
                  },
                  validationSchema: je,
                  enableReinitialize: !0,
                },
                function (e) {
                  return l.a.createElement(
                    "form",
                    { onSubmit: e.handleSubmit },
                    l.a.createElement(
                      "div",
                      { className: "container" },
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Name (should be unique)"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "text",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.name,
                            style: e.errors.name
                              ? {
                                  width: "250px",
                                  height: "30px",
                                  backgroundColor: "rgba(255,0,0,0.2)",
                                }
                              : { width: "250px", height: "30px" },
                            name: "name",
                            placeholder: "name",
                          }),
                          e.errors.name &&
                            l.a.createElement(
                              l.a.Fragment,
                              null,
                              l.a.createElement("br", null),
                              l.a.createElement(
                                "b",
                                { className: "text-danger" },
                                e.errors.name
                              )
                            )
                        ),
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Points needed for unlocking"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "number",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.unlockPoints,
                            min: "0",
                            max: "10000",
                            style: { width: "250px", height: "30px" },
                            name: "unlockPoints",
                          })
                        )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Points from selected modules"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "text",
                            value: B,
                            style: { width: "250px", height: "30px" },
                            name: "modulePoints",
                            disabled: !0,
                          })
                        ),
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Total points for this section"
                          ),
                          " ",
                          l.a.createElement(k, {
                            icon: "question-circle",
                            title:
                              'Total points determine how many points you can get for this section regardless of the number of points you can get for all of its modules.\nFor example: if you have three modules and the maximum number of points you can get for each of them separately is 2 (meaning you should be able to get 6 points in total for this section), then if you set "Total points for this section" to 3, the maximum number of points for each module in this section will instead automatically become 1 (thus making it 3 in total for the entire section).',
                          }),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "number",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.rewardPoints,
                            min: "0",
                            max: "10000",
                            style: { width: "250px", height: "30px" },
                            name: "rewardPoints",
                          })
                        )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Minimum points required"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "number",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.minPoints,
                            min: "0",
                            max: e.values.rewardPoints,
                            style: { width: "250px", height: "30px" },
                            name: "minPoints",
                          })
                        ),
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement("b", null, "Penalty for failing"),
                          " ",
                          l.a.createElement(k, {
                            icon: "question-circle",
                            title:
                              "Penalty determines how many points will be subtracted from the total number of received points for this section in case the minimum requirement is not met. Make sure to use this option carefully (if you subtract too many points, it might not be possible to finish the course).",
                          }),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "number",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.penalty,
                            min: "0",
                            max: "10000",
                            style: { width: "250px", height: "30px" },
                            name: "penalty",
                          })
                        )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Modules (in chronological order)"
                          ),
                          l.a.createElement("br", null),
                          j.map(function (e, t) {
                            return l.a.createElement(
                              "div",
                              { key: t },
                              l.a.createElement(
                                "select",
                                {
                                  className: "mb-1",
                                  onChange: function (e) {
                                    return G(t, e.target.value);
                                  },
                                  onBlur: function (e) {
                                    return G(t, e.target.value);
                                  },
                                  value: e._id,
                                  style: { width: "430px", height: "38px" },
                                },
                                Y.map(function (e, t) {
                                  return l.a.createElement(
                                    "option",
                                    { key: t, value: e._id },
                                    e.name
                                  );
                                })
                              ),
                              l.a.createElement(
                                M,
                                {
                                  className: "btn btn-danger ml-2",
                                  type: "button",
                                  disabled: 1 === j.length,
                                  onClick: function (a) {
                                    return (function (e, t) {
                                      var a = Object(Ce.a)(j),
                                        n = B;
                                      a.splice(e, 1), (n -= t), S(a), R(n);
                                    })(t, e.points);
                                  },
                                },
                                l.a.createElement(k, { icon: "minus" })
                              ),
                              l.a.createElement(
                                M,
                                {
                                  className: "btn btn-info ml-1",
                                  onClick: function (e) {
                                    return (function (e) {
                                      var t = Object(Ce.a)(j),
                                        a = t[e + 1];
                                      (t[e + 1] = t[e]), (t[e] = a), S(t);
                                    })(t);
                                  },
                                  disabled: t >= j.length - 1,
                                },
                                l.a.createElement(k, {
                                  icon: "long-arrow-alt-down",
                                })
                              ),
                              l.a.createElement(
                                M,
                                {
                                  className: "btn btn-info ml-1",
                                  onClick: function (e) {
                                    return (function (e) {
                                      var t = Object(Ce.a)(j),
                                        a = t[e - 1];
                                      (t[e - 1] = t[e]), (t[e] = a), S(t);
                                    })(t);
                                  },
                                  disabled: t <= 0,
                                },
                                l.a.createElement(k, {
                                  icon: "long-arrow-alt-up",
                                })
                              )
                            );
                          }),
                          l.a.createElement(
                            M,
                            {
                              className: "btn btn-success",
                              style: { width: "200px" },
                              type: "button",
                              onClick: Q,
                            },
                            l.a.createElement("b", null, "Insert")
                          )
                        )
                      ),
                      l.a.createElement(N, { level: "2" }),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-primary ml-2 mr-2",
                          style: { width: "200px" },
                          type: "submit",
                        },
                        l.a.createElement("b", null, "Save")
                      ),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-secondary ml-2 mr-2 ",
                          style: { width: "200px" },
                          type: "button",
                          onClick: U,
                        },
                        l.a.createElement("b", null, "Close")
                      )
                    ),
                    l.a.createElement(N, { level: "2" }),
                    "loading" === u
                      ? l.a.createElement(H, null)
                      : "error" === u
                      ? l.a.createElement(L, { error: v })
                      : null
                  );
                }
              )
            )
          )
        );
      }
      function ke(e) {
        var t = e.courseId,
          a = e.changeTab,
          r = Object(n.useState)(null),
          c = Object(m.a)(r, 2),
          s = c[0],
          i = c[1],
          u = Object(n.useState)(!1),
          d = Object(m.a)(u, 2),
          E = d[0],
          b = d[1],
          p = Object(n.useState)(null),
          v = Object(m.a)(p, 2),
          g = v[0],
          f = v[1],
          w = Object(n.useState)([]),
          y = Object(m.a)(w, 2),
          x = y[0],
          O = y[1],
          C = Object(n.useState)("loading"),
          j = Object(m.a)(C, 2),
          S = j[0],
          T = j[1],
          I = Object(n.useState)(null),
          A = Object(m.a)(I, 2),
          B = A[0],
          R = A[1];
        Object(n.useEffect)(
          function () {
            h.post("api/courses/getCourse", { course: t })
              .then(function (e) {
                O(e.data.data.content), T("success");
              })
              .catch(function (e) {
                T("error"), R(e.message);
              });
          },
          [t, E]
        );
        var P = function (e) {
            T("loading"),
              h
                .post("api/courses/removeSections", {
                  course: t,
                  selectedSections: e,
                })
                .then(function (e) {
                  R("Section(s) successfully removed"), b(!E), f(null);
                })
                .catch(function (e) {
                  T("error"), R(e.message);
                });
          },
          q = [
            { name: "Name", selector: "name", sortable: !0, wrap: !0 },
            {
              name: "Points for unlocking",
              selector: "unlockPoints",
              sortable: !0,
              wrap: !0,
            },
            {
              name: "Rewarded points",
              selector: "rewardPoints",
              sortable: !0,
              wrap: !0,
            },
            {
              name: "Minimum requirement",
              selector: "minPoints",
              sortable: !0,
              wrap: !0,
            },
            { name: "Penalty", selector: "penalty", sortable: !0, wrap: !0 },
            {
              name: "Actions",
              cell: function (e) {
                return l.a.createElement(
                  "div",
                  null,
                  l.a.createElement(
                    M,
                    {
                      variant: "primary",
                      className: "ml-1 mr-1",
                      onClick: function (t) {
                        return (function (e) {
                          i(e._id);
                        })(e);
                      },
                    },
                    l.a.createElement(k, { icon: "folder-open" })
                  ),
                  l.a.createElement(
                    M,
                    {
                      variant: "danger",
                      className: "ml-1 mr-1",
                      onClick: function (t) {
                        return (function (e) {
                          K()({
                            title: "Do you want to remove this part?",
                            text:
                              "You are about to remove this part. Are you sure about it?",
                            icon: "warning",
                            buttons: ["No", "Yes"],
                          }).then(function (t) {
                            t && P([e]);
                          });
                        })(e);
                      },
                    },
                    l.a.createElement(k, { icon: "folder-minus" })
                  )
                );
              },
              ignoreRowClick: !0,
              allowOverflow: !0,
              minWidth: "150px",
              button: !0,
            },
          ];
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            "div",
            { className: "w-responsive pl-5 pr-5" },
            l.a.createElement(ne.a, {
              columns: q,
              data: x,
              customStyles: {
                headCells: { style: { fontSize: "16px" } },
                cells: { style: { fontSize: "14px" } },
              },
              highlightOnHover: !0,
              responsive: !0,
              pagination: !0,
              noDataComponent: "This course is currently empty",
              selectableRows: !0,
              subHeader: !0,
              subHeaderAlign: "right",
              onSelectedRowsChange: function (e) {
                return f(e.selectedRows);
              },
              clearSelectedRows: E,
              contextActions: l.a.createElement(
                M,
                {
                  variant: "danger",
                  className: "mr-3",
                  onClick: function () {
                    K()({
                      title: "Do you want to remove these parts?",
                      text:
                        "You are about to remove these parts. Are you sure about it?",
                      icon: "warning",
                      buttons: ["No", "Yes"],
                    }).then(function (e) {
                      e && P(g);
                    });
                  },
                },
                l.a.createElement(k, { icon: "folder-minus" }),
                l.a.createElement("b", null, " Remove")
              ),
              subHeaderComponent: l.a.createElement(
                M,
                {
                  variant: "warning",
                  className: "mr-3",
                  onClick: function () {
                    i("new");
                  },
                },
                l.a.createElement(k, { icon: "folder-plus" }),
                l.a.createElement("b", null, " Add section")
              ),
            })
          ),
          l.a.createElement(Se, {
            sectionId: s,
            courseId: t,
            closeModal: function (e) {
              i(null), T("idle"), e || b(!E);
            },
          }),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(V, { status: S, message: B }),
          l.a.createElement(N, { level: "1" }),
          a
            ? l.a.createElement(
                M,
                {
                  className: "btn btn-success",
                  style: { width: "200px" },
                  type: "button",
                  onClick: function () {
                    a("redirect");
                  },
                },
                l.a.createElement("b", null, "Finish course")
              )
            : l.a.createElement(
                o.b,
                { to: { pathname: "/enter-course/".concat(t) } },
                l.a.createElement(
                  M,
                  { className: "btn btn-info", style: { width: "200px" } },
                  l.a.createElement("b", null, "Preview")
                )
              )
        );
      }
      function Te() {
        var e = Object(n.useState)("info"),
          t = Object(m.a)(e, 2),
          a = t[0],
          r = t[1],
          c = function (e) {
            r(e);
          };
        return "redirect" === a
          ? l.a.createElement(f.a, { push: !0, to: "/my-courses" })
          : l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(A, { level: "1" }, "NEW COURSE"),
              l.a.createElement(N, { level: "2" }),
              "info" === a
                ? l.a.createElement(Oe, { courseId: null, changeTab: c })
                : l.a.createElement(ke, { courseId: a, changeTab: c })
            );
      }
      var Ie = D.a().shape({
        name: D.c().label("Name").required(),
        cat: D.c().label("Category").required(),
      });
      function Ae(e) {
        var t = e.moduleId,
          a = e.changeTab,
          r = E(),
          c = Object(n.useState)({
            name: "",
            cat: "",
            type: "Info",
            author: r.user,
            limit: 0,
            timer: "None",
          }),
          o = Object(m.a)(c, 2),
          s = o[0],
          i = o[1],
          u = Object(n.useState)("loading"),
          d = Object(m.a)(u, 2),
          b = d[0],
          p = d[1],
          v = Object(n.useState)(null),
          g = Object(m.a)(v, 2),
          f = g[0],
          w = g[1];
        return (
          Object(n.useEffect)(
            function () {
              t
                ? h
                    .post("api/modules/getModule", { module: t })
                    .then(function (e) {
                      i(e.data.data), p("success");
                    })
                    .catch(function (e) {
                      p("error"), w(e.message);
                    })
                : p("idle");
            },
            [t]
          ),
          l.a.createElement(
            "div",
            { align: "center" },
            l.a.createElement(
              q.a,
              {
                initialValues: {
                  name: s.name,
                  cat: s.cat,
                  type: s.type,
                  author: s.author,
                  limit: s.limit,
                  timer: s.timer,
                },
                onSubmit: function (e, n) {
                  !(function (e) {
                    p("loading"),
                      t
                        ? h
                            .post("api/modules/updateModuleInfo", {
                              moduleId: t,
                              name: e.name,
                              cat: e.cat,
                              type: e.type,
                              limit: e.limit,
                              timer: e.timer,
                            })
                            .then(function (e) {
                              p("success"), w("Module successfully updated");
                            })
                            .catch(function (e) {
                              p("error"), w(e.message);
                            })
                        : h
                            .post("api/modules/createNewModule", {
                              name: e.name,
                              cat: e.cat,
                              type: e.type,
                              author: e.author,
                              limit: e.limit,
                              timer: e.timer,
                              withAccess: r.token,
                            })
                            .then(function (e) {
                              a(e.data.data);
                            })
                            .catch(function (e) {
                              p("error"), w(e.message);
                            });
                  })(e);
                },
                validationSchema: Ie,
                enableReinitialize: !0,
              },
              function (e) {
                return l.a.createElement(
                  "form",
                  { onSubmit: e.handleSubmit },
                  l.a.createElement(
                    "div",
                    { className: "container" },
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement("b", null, "Name (should be unique)"),
                      l.a.createElement("br", null),
                      l.a.createElement("input", {
                        type: "text",
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.name,
                        style: e.errors.name
                          ? {
                              width: "300px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "300px", height: "30px" },
                        name: "name",
                        placeholder: "name",
                      }),
                      e.errors.name &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement("br", null),
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.name
                          )
                        )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "col mb-4" },
                      l.a.createElement(
                        "b",
                        null,
                        "Category (medical, technical, etc.)"
                      ),
                      l.a.createElement("br", null),
                      l.a.createElement("input", {
                        type: "text",
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.cat,
                        style: e.errors.cat
                          ? {
                              width: "300px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "300px", height: "30px" },
                        name: "cat",
                        placeholder: "category",
                      }),
                      e.errors.cat &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement("br", null),
                          l.a.createElement(
                            "b",
                            { className: "text-danger" },
                            e.errors.cat
                          )
                        )
                    )
                  ),
                  l.a.createElement(
                    "div",
                    { className: "col mb-4" },
                    l.a.createElement(
                      "b",
                      null,
                      "Type (either giving info or testing)"
                    ),
                    l.a.createElement("br", null),
                    l.a.createElement(
                      "select",
                      {
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.type,
                        style: { width: "300px", height: "30px" },
                        name: "type",
                      },
                      l.a.createElement("option", { value: "Info" }, "Info"),
                      l.a.createElement("option", { value: "Test" }, "Test")
                    )
                  ),
                  l.a.createElement(
                    "div",
                    { className: "col mb-4" },
                    l.a.createElement(
                      "b",
                      null,
                      "Time limit (in minutes, 0 means none)"
                    ),
                    l.a.createElement("br", null),
                    l.a.createElement("input", {
                      type: "number",
                      onChange: e.handleChange,
                      onBlur: e.handleBlur,
                      value: e.values.limit,
                      min: "0",
                      max: "1440",
                      style: { width: "300px", height: "30px" },
                      name: "limit",
                    })
                  ),
                  l.a.createElement(
                    "div",
                    { className: "col mb-4" },
                    l.a.createElement("b", null, "Timer (multiple types)"),
                    l.a.createElement("br", null),
                    l.a.createElement(
                      "select",
                      {
                        onChange: e.handleChange,
                        onBlur: e.handleBlur,
                        value: e.values.timer,
                        style: { width: "300px", height: "30px" },
                        name: "timer",
                      },
                      l.a.createElement(
                        "option",
                        { value: "None" },
                        "None (will not display any timer)"
                      ),
                      l.a.createElement(
                        "option",
                        { value: "Clock" },
                        "Clock (starting from 00:00:00)"
                      ),
                      l.a.createElement(
                        "option",
                        { value: "Countdown", disabled: 0 === e.values.limit },
                        'Countdown ("Time limit" must not be 0)'
                      )
                    )
                  ),
                  l.a.createElement(N, { level: "2" }),
                  l.a.createElement(
                    "div",
                    { className: "row justify-content-center" },
                    l.a.createElement(
                      M,
                      {
                        className: "btn btn-primary",
                        style: { width: "250px" },
                        type: "submit",
                      },
                      l.a.createElement("b", null, "Save module info")
                    )
                  ),
                  l.a.createElement(N, { level: "2" })
                );
              }
            ),
            l.a.createElement(N, { level: "1" }),
            l.a.createElement(V, { status: b, message: f })
          )
        );
      }
      var Me = a(55),
        Be = a.n(Me),
        Re = D.a().shape({ name: D.c().label("Name").required() });
      function Pe(e) {
        var t = e.segmentId,
          a = e.moduleId,
          r = e.type,
          c = e.closeModal,
          o = { name: "", rqmt: "0", points: 0, rnd: !1 },
          s = Object(n.useState)("loading"),
          i = Object(m.a)(s, 2),
          u = i[0],
          d = i[1],
          E = Object(n.useState)(null),
          b = Object(m.a)(E, 2),
          p = b[0],
          v = b[1],
          g = Object(n.useState)(o),
          f = Object(m.a)(g, 2),
          w = f[0],
          y = f[1],
          x = Object(n.useState)(null),
          O = Object(m.a)(x, 2),
          C = O[0],
          j = O[1],
          S = function (e) {
            d("loading"), v(null), y(o), j(null), c(e);
          };
        return (
          Object(n.useEffect)(
            function () {
              t &&
                ("new" !== t
                  ? h
                      .post("api/modules/getSegment", {
                        moduleId: a,
                        segmentId: t,
                      })
                      .then(function (e) {
                        j(e.data.data.data), y(e.data.data), d("success");
                      })
                      .catch(function (e) {
                        d("error"), v(e.message);
                      })
                  : (j(""), d("idle")));
            },
            [a, t]
          ),
          l.a.createElement(
            re.a,
            {
              isOpen: null !== t,
              onRequestClose: function (e) {
                return S(!0);
              },
              style: {
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  minWidth: "650px",
                  maxHeight: "calc(100vh - 100px)",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  overflowY: "auto",
                },
              },
              ariaHideApp: !1,
            },
            l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                A,
                { level: "2" },
                "new" === t ? "ADD INFO SEGMENT" : "EDIT INFO SEGMENT"
              ),
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                q.a,
                {
                  initialValues: {
                    name: w.name,
                    sType: r,
                    rqmt: w.rqmt,
                    points: w.points,
                    rnd: !1,
                  },
                  onSubmit: function (e, n) {
                    !(function (e) {
                      if ((d("loading"), C)) {
                        var n = {
                          name: e.name,
                          sType: r,
                          rqmt: e.rqmt,
                          points: e.points,
                          data: C,
                          rnd: !1,
                        };
                        "new" === t
                          ? h
                              .post("api/modules/addNewSegment", {
                                moduleId: a,
                                segment: n,
                              })
                              .then(function (e) {
                                S(!1);
                              })
                              .catch(function (e) {
                                d("error"), v(e.message);
                              })
                          : h
                              .post("api/modules/updateSegment", {
                                segmentId: t,
                                moduleId: a,
                                segment: n,
                              })
                              .then(function (e) {
                                S(!1);
                              })
                              .catch(function (e) {
                                d("error"), v(e.message);
                              });
                      } else d("error"), v("Data is a required field");
                    })(e);
                  },
                  validationSchema: Re,
                  enableReinitialize: !0,
                },
                function (e) {
                  return l.a.createElement(
                    "form",
                    { onSubmit: e.handleSubmit },
                    l.a.createElement(
                      "div",
                      { className: "container" },
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Name (should be unique)"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "text",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.name,
                            style: e.errors.name
                              ? {
                                  width: "250px",
                                  height: "30px",
                                  backgroundColor: "rgba(255,0,0,0.2)",
                                }
                              : { width: "250px", height: "30px" },
                            name: "name",
                            placeholder: "name",
                          }),
                          e.errors.name &&
                            l.a.createElement(
                              l.a.Fragment,
                              null,
                              l.a.createElement("br", null),
                              l.a.createElement(
                                "b",
                                { className: "text-danger" },
                                e.errors.name
                              )
                            )
                        ),
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            'Type (next to "Add" button)'
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "text",
                            value: e.values.sType,
                            style: { width: "250px", height: "30px" },
                            name: "sType",
                            placeholder: "type",
                            disabled: !0,
                          })
                        )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Required time (in minutes)"
                          ),
                          " ",
                          l.a.createElement(k, {
                            icon: "question-circle",
                            title:
                              "Required time determines how many minutes your student must spend on this module in order to get the set number of points (0 means none).",
                          }),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "number",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.rqmt,
                            min: "0",
                            max: "1440",
                            style: { width: "250px", height: "30px" },
                            name: "rqmt",
                          })
                        ),
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Points (if requirement is met)"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "number",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.points,
                            min: "0",
                            max: "1000",
                            style: { width: "250px", height: "30px" },
                            name: "points",
                          })
                        )
                      ),
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        "HTML" === r
                          ? l.a.createElement(
                              "div",
                              { className: "col mb-4" },
                              l.a.createElement("b", null, "Data"),
                              l.a.createElement("br", null),
                              C || "new" === t
                                ? l.a.createElement(Be.a, {
                                    onChange: function (e) {
                                      return j(e.editor.getData());
                                    },
                                    onBlur: function (e) {
                                      return j(e.editor.getData());
                                    },
                                    data: C,
                                    name: "data",
                                  })
                                : null
                            )
                          : l.a.createElement(
                              "div",
                              { className: "col mb-4" },
                              l.a.createElement(
                                "b",
                                null,
                                "Embedded Video Link"
                              ),
                              l.a.createElement("br", null),
                              l.a.createElement("textarea", {
                                onChange: function (e) {
                                  return j(e.target.value);
                                },
                                onBlur: function (e) {
                                  return j(e.target.value);
                                },
                                value: C,
                                style: { width: "555px", height: "150px" },
                                name: "data",
                              })
                            )
                      ),
                      l.a.createElement(N, { level: "2" }),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-primary ml-2 mr-2",
                          style: { width: "200px" },
                          type: "submit",
                        },
                        l.a.createElement("b", null, "Save")
                      ),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-secondary ml-2 mr-2 ",
                          style: { width: "200px" },
                          type: "button",
                          onClick: S,
                        },
                        l.a.createElement("b", null, "Close")
                      )
                    ),
                    l.a.createElement(N, { level: "2" }),
                    "loading" === u
                      ? l.a.createElement(H, null)
                      : "error" === u
                      ? l.a.createElement(L, { error: p })
                      : null
                  );
                }
              )
            )
          )
        );
      }
      var qe = D.a().shape({ name: D.c().label("Name").required() });
      function De(e) {
        var t = e.segmentId,
          a = e.moduleId,
          r = e.type,
          c = e.closeModal,
          o = { name: "", rqmt: "", points: 0, rnd: !1 },
          s = Object(n.useState)("loading"),
          i = Object(m.a)(s, 2),
          u = i[0],
          d = i[1],
          E = Object(n.useState)(null),
          b = Object(m.a)(E, 2),
          p = b[0],
          v = b[1],
          g = Object(n.useState)(o),
          f = Object(m.a)(g, 2),
          w = f[0],
          y = f[1],
          x = Object(n.useState)(null),
          O = Object(m.a)(x, 2),
          C = O[0],
          j = O[1],
          S = Object(n.useState)([""]),
          T = Object(m.a)(S, 2),
          I = T[0],
          B = T[1],
          R = Object(n.useState)([""]),
          P = Object(m.a)(R, 2),
          D = P[0],
          Y = P[1],
          F = Object(n.useState)(null),
          V = Object(m.a)(F, 2),
          U = V[0],
          Q = V[1],
          G = function () {
            var e = Object(Ce.a)(I);
            e.push(""), B(e);
          },
          J = function (e, t) {
            var a = Object(Ce.a)(I),
              n = Object(Ce.a)(D),
              l = n.indexOf(a[e]);
            (a[e] = t), (n[l] = t), B(a), Y(n);
          },
          z = function (e) {
            d("loading"),
              v(null),
              y(o),
              j(null),
              B([""]),
              Y([""]),
              Q(null),
              c(e);
          };
        return (
          Object(n.useEffect)(
            function () {
              t &&
                ("new" !== t
                  ? h
                      .post("api/modules/getSegment", {
                        moduleId: a,
                        segmentId: t,
                      })
                      .then(function (e) {
                        if (
                          "One correct choice" === e.data.data.sType ||
                          "Multiple correct choices" === e.data.data.sType
                        ) {
                          var t = e.data.data.data,
                            a = e.data.data.rqmt,
                            n = t.split(";;;")[0],
                            l = t.split(";;;").slice(1, -1),
                            r = a.split(";;;").slice(0, -1);
                          j(n), B(l), Y(r);
                        }
                        Q(e.data.data.data), y(e.data.data), d("success");
                      })
                      .catch(function (e) {
                        d("error"), v(e.message);
                      })
                  : (Q(""), d("idle")));
            },
            [a, t]
          ),
          l.a.createElement(
            re.a,
            {
              isOpen: null !== t,
              onRequestClose: function (e) {
                return z(!0);
              },
              style: {
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  minWidth: "650px",
                  maxHeight: "calc(100vh - 100px)",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  overflowY: "auto",
                },
              },
              ariaHideApp: !1,
            },
            l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                A,
                { level: "2" },
                "new" === t ? "ADD TEST SEGMENT" : "EDIT TEST SEGMENT"
              ),
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                q.a,
                {
                  initialValues: {
                    name: w.name,
                    sType: r,
                    rqmt: w.rqmt,
                    points: w.points,
                    rnd: w.rnd,
                  },
                  onSubmit: function (e, n) {
                    !(function (e) {
                      if ((d("loading"), U || C)) {
                        var n = U,
                          l = e.rqmt;
                        if (
                          ("One correct choice" === e.sType ||
                            "Multiple correct choices" === e.sType) &&
                          ((n = ""),
                          (n += C),
                          (n += ";;;"),
                          I.forEach(function (e) {
                            (n += e), (n += ";;;");
                          }),
                          D &&
                            ((l = ""),
                            D.forEach(function (e) {
                              e && ((l += e), (l += ";;;"));
                            })),
                          "One correct choice" === r && "" === l)
                        )
                          return v("One answer is required"), void d("error");
                        var c = {
                          name: e.name,
                          sType: r,
                          rqmt: "HTML" === r ? "0" : l,
                          points: e.points,
                          data: n,
                          rnd: e.rnd,
                        };
                        "new" === t
                          ? h
                              .post("api/modules/addNewSegment", {
                                moduleId: a,
                                segment: c,
                              })
                              .then(function (e) {
                                z(!1);
                              })
                              .catch(function (e) {
                                d("error"), v(e.message);
                              })
                          : h
                              .post("api/modules/updateSegment", {
                                segmentId: t,
                                moduleId: a,
                                segment: c,
                              })
                              .then(function (e) {
                                z(!1);
                              })
                              .catch(function (e) {
                                d("error"), v(e.message);
                              });
                      } else
                        d("error"),
                          "HTML" === e.sType
                            ? v("Data is a required field")
                            : v("Question is a required field");
                    })(e);
                  },
                  validationSchema: qe,
                  enableReinitialize: !0,
                },
                function (e) {
                  return l.a.createElement(
                    "form",
                    { onSubmit: e.handleSubmit },
                    l.a.createElement(
                      "div",
                      { className: "container" },
                      l.a.createElement(
                        "div",
                        { className: "row" },
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            "Name (should be unique)"
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "text",
                            onChange: e.handleChange,
                            onBlur: e.handleBlur,
                            value: e.values.name,
                            style: e.errors.name
                              ? {
                                  width: "250px",
                                  height: "30px",
                                  backgroundColor: "rgba(255,0,0,0.2)",
                                }
                              : { width: "250px", height: "30px" },
                            name: "name",
                            placeholder: "name",
                          }),
                          e.errors.name &&
                            l.a.createElement(
                              l.a.Fragment,
                              null,
                              l.a.createElement("br", null),
                              l.a.createElement(
                                "b",
                                { className: "text-danger" },
                                e.errors.name
                              )
                            )
                        ),
                        l.a.createElement(
                          "div",
                          { className: "col mb-4" },
                          l.a.createElement(
                            "b",
                            null,
                            'Type (next to "Add" button)'
                          ),
                          l.a.createElement("br", null),
                          l.a.createElement("input", {
                            type: "text",
                            value: e.values.sType,
                            style: { width: "250px", height: "30px" },
                            name: "sType",
                            placeholder: "category",
                            disabled: !0,
                          })
                        )
                      ),
                      "Text answer" === r
                        ? l.a.createElement(
                            "div",
                            { className: "row" },
                            l.a.createElement(
                              "div",
                              { className: "col mb-4" },
                              l.a.createElement("b", null, "Question"),
                              l.a.createElement("br", null),
                              U || "new" === t
                                ? l.a.createElement(Be.a, {
                                    onChange: function (e) {
                                      return Q(e.editor.getData());
                                    },
                                    onBlur: function (e) {
                                      return Q(e.editor.getData());
                                    },
                                    data: U,
                                    name: "data",
                                  })
                                : null
                            )
                          )
                        : "One correct choice" === r ||
                          "Multiple correct choices" === r
                        ? l.a.createElement(
                            l.a.Fragment,
                            null,
                            l.a.createElement(
                              "div",
                              { className: "row" },
                              l.a.createElement(
                                "div",
                                { className: "col mb-4" },
                                l.a.createElement("b", null, "Question"),
                                l.a.createElement("br", null),
                                C || "new" === t
                                  ? l.a.createElement(Be.a, {
                                      onChange: function (e) {
                                        return j(e.editor.getData());
                                      },
                                      onBlur: function (e) {
                                        return j(e.editor.getData());
                                      },
                                      data: C,
                                      name: "question",
                                    })
                                  : null
                              )
                            ),
                            l.a.createElement(
                              "div",
                              { className: "row" },
                              l.a.createElement(
                                "div",
                                { className: "col mb-2" },
                                l.a.createElement(
                                  "b",
                                  null,
                                  "Choices (check correct answer",
                                  "Multiple correct choices" === r ? "s)" : ")"
                                ),
                                l.a.createElement("br", null),
                                I.map(function (e, t) {
                                  return l.a.createElement(
                                    "div",
                                    { key: t },
                                    "One correct choice" === r
                                      ? l.a.createElement("input", {
                                          type: "radio",
                                          onChange: function (t) {
                                            return (function (e) {
                                              e
                                                ? (Y([e]), d("idle"))
                                                : (v(
                                                    "Empty choice cannot be the correct answer"
                                                  ),
                                                  d("error"));
                                            })(e);
                                          },
                                          name: "radio-boxes",
                                          checked: e && D.includes(e),
                                          style: {
                                            width: "15px",
                                            height: "15px",
                                          },
                                        })
                                      : l.a.createElement("input", {
                                          type: "checkbox",
                                          onChange: function (t) {
                                            return (function (e, t) {
                                              var a = Object(Ce.a)(D);
                                              t
                                                ? e
                                                  ? (a.push(e), d("idle"))
                                                  : (v(
                                                      "Empty choice cannot be among correct answers"
                                                    ),
                                                    d("error"))
                                                : (a = a.filter(function (t) {
                                                    return t !== e;
                                                  })),
                                                Y(a);
                                            })(e, t.target.checked);
                                          },
                                          name: "checkbox-boxes",
                                          checked: e && D.includes(e),
                                          style: {
                                            width: "15px",
                                            height: "15px",
                                          },
                                        }),
                                    l.a.createElement("input", {
                                      type: "text",
                                      className: "ml-2 mb-1",
                                      onChange: function (e) {
                                        return J(t, e.target.value);
                                      },
                                      onBlur: function (e) {
                                        return J(t, e.target.value);
                                      },
                                      value: e,
                                      style: { width: "480px", height: "38px" },
                                      placeholder: "choice " + (t + 1),
                                    }),
                                    l.a.createElement(
                                      M,
                                      {
                                        className: "btn btn-danger ml-2",
                                        type: "button",
                                        disabled: 1 === I.length,
                                        onClick: function (a) {
                                          return (function (e, t) {
                                            var a = Object(Ce.a)(I),
                                              n = Object(Ce.a)(D),
                                              l = n.indexOf(t);
                                            a.splice(e, 1),
                                              n.splice(l, 1),
                                              B(a),
                                              l >= 0 && Y(n);
                                          })(t, e);
                                        },
                                      },
                                      l.a.createElement(k, { icon: "minus" })
                                    )
                                  );
                                }),
                                l.a.createElement(
                                  M,
                                  {
                                    className: "btn btn-success",
                                    style: { width: "200px" },
                                    type: "button",
                                    onClick: G,
                                  },
                                  l.a.createElement("b", null, "Insert")
                                )
                              )
                            ),
                            l.a.createElement(
                              "div",
                              { className: "row" },
                              l.a.createElement(
                                "div",
                                { className: "col mb-4" },
                                l.a.createElement("input", {
                                  className: "mr-2",
                                  type: "checkbox",
                                  onChange: e.handleChange,
                                  checked: e.values.rnd,
                                  style: { width: "15px", height: "15px" },
                                  name: "rnd",
                                }),
                                l.a.createElement(
                                  "b",
                                  null,
                                  l.a.createElement(
                                    "i",
                                    null,
                                    "Check this if you want the order of choices to be randomized"
                                  )
                                )
                              )
                            )
                          )
                        : null,
                      "HTML" === r
                        ? l.a.createElement(
                            "div",
                            { className: "row" },
                            l.a.createElement(
                              "div",
                              { className: "col mb-4" },
                              l.a.createElement("b", null, "Data"),
                              l.a.createElement("br", null),
                              U || "new" === t
                                ? l.a.createElement(Be.a, {
                                    onChange: function (e) {
                                      return Q(e.editor.getData());
                                    },
                                    onBlur: function (e) {
                                      return Q(e.editor.getData());
                                    },
                                    data: U,
                                    name: "data",
                                  })
                                : null
                            )
                          )
                        : l.a.createElement(
                            "div",
                            { className: "row" },
                            "Text answer" === r
                              ? l.a.createElement(
                                  "div",
                                  { className: "col mb-4" },
                                  l.a.createElement(
                                    "b",
                                    null,
                                    "Correct answer"
                                  ),
                                  l.a.createElement("br", null),
                                  l.a.createElement("input", {
                                    type: "text",
                                    onChange: e.handleChange,
                                    onBlur: e.handleBlur,
                                    value: e.values.rqmt,
                                    style: { width: "250px", height: "30px" },
                                    name: "rqmt",
                                    placeholder: "put correct answer here",
                                  })
                                )
                              : l.a.createElement(
                                  "div",
                                  { className: "col mb-4" },
                                  l.a.createElement(
                                    "b",
                                    null,
                                    "Selected correct answer",
                                    "Multiple correct choices" === r ? "s" : ""
                                  ),
                                  l.a.createElement("br", null),
                                  l.a.createElement("input", {
                                    type: "text",
                                    value: D,
                                    style: { width: "250px", height: "30px" },
                                    name: "answers",
                                    disabled: !0,
                                  })
                                ),
                            l.a.createElement(
                              "div",
                              { className: "col mb-4" },
                              l.a.createElement(
                                "b",
                                null,
                                "Points (if answered correctly)"
                              ),
                              l.a.createElement("br", null),
                              l.a.createElement("input", {
                                type: "number",
                                onChange: e.handleChange,
                                onBlur: e.handleBlur,
                                value: e.values.points,
                                min: "0",
                                max: "1000",
                                style: { width: "250px", height: "30px" },
                                name: "points",
                              })
                            )
                          ),
                      l.a.createElement(N, { level: "2" }),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-primary ml-2 mr-2",
                          style: { width: "200px" },
                          type: "submit",
                        },
                        l.a.createElement("b", null, "Save")
                      ),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-secondary ml-2 mr-2 ",
                          style: { width: "200px" },
                          type: "button",
                          onClick: z,
                        },
                        l.a.createElement("b", null, "Close")
                      )
                    ),
                    l.a.createElement(N, { level: "2" }),
                    "loading" === u
                      ? l.a.createElement(H, null)
                      : "error" === u
                      ? l.a.createElement(L, { error: p })
                      : null
                  );
                }
              )
            )
          )
        );
      }
      function Ye(e) {
        var t = e.moduleId,
          a = e.changeTab,
          r = Object(n.useState)(null),
          c = Object(m.a)(r, 2),
          s = c[0],
          i = c[1],
          u = Object(n.useState)(!1),
          d = Object(m.a)(u, 2),
          E = d[0],
          b = d[1],
          p = Object(n.useState)(null),
          v = Object(m.a)(p, 2),
          g = v[0],
          f = v[1],
          w = Object(n.useState)(null),
          y = Object(m.a)(w, 2),
          x = y[0],
          O = y[1],
          C = Object(n.useState)("HTML"),
          j = Object(m.a)(C, 2),
          S = j[0],
          T = j[1],
          I = Object(n.useState)([]),
          A = Object(m.a)(I, 2),
          B = A[0],
          R = A[1],
          P = Object(n.useState)("loading"),
          q = Object(m.a)(P, 2),
          D = q[0],
          Y = q[1],
          F = Object(n.useState)(null),
          L = Object(m.a)(F, 2),
          H = L[0],
          U = L[1],
          Q = function (e) {
            i(null), Y("idle"), e || b(!E);
          };
        Object(n.useEffect)(
          function () {
            h.post("api/modules/getModule", { module: t })
              .then(function (e) {
                O(e.data.data.type), R(e.data.data.content), Y("success");
              })
              .catch(function (e) {
                Y("error"), U(e.message);
              });
          },
          [t, E]
        );
        var G = function (e) {
            Y("loading"),
              h
                .post("api/modules/removeSegments", {
                  module: t,
                  selectedSegments: e,
                })
                .then(function (e) {
                  U("Segment(s) successfully removed"), b(!E), f(null);
                })
                .catch(function (e) {
                  Y("error"), U(e.message);
                });
          },
          J = function (e) {
            h.post("api/modules/updateSegmentsOrder", {
              moduleId: t,
              segments: e,
            })
              .then(function (e) {
                b(!E), U("Segment successfully moved");
              })
              .catch(function (e) {
                Y("error"), U(e.message);
              });
          },
          z = [
            { name: "Name", selector: "name", sortable: !0, wrap: !0 },
            { name: "Type", selector: "sType", sortable: !0, wrap: !0 },
            {
              name: "Required time",
              selector: "rqmt",
              sortable: !0,
              wrap: !0,
              omit: "Info" !== x,
            },
            { name: "Points", selector: "points", sortable: !0, wrap: !0 },
            {
              name: "Actions",
              cell: function (e) {
                return l.a.createElement(
                  "div",
                  null,
                  l.a.createElement(
                    M,
                    {
                      variant: "primary",
                      className: "ml-1 mr-1",
                      onClick: function (t) {
                        return (function (e) {
                          T(e.sType), i(e._id);
                        })(e);
                      },
                    },
                    l.a.createElement(k, { icon: "folder-open" })
                  ),
                  l.a.createElement(
                    M,
                    {
                      variant: "danger",
                      className: "ml-1 mr-1",
                      onClick: function (t) {
                        return (function (e) {
                          K()({
                            title: "Do you want to remove this part?",
                            text:
                              "You are about to remove this part. Are you sure about it?",
                            icon: "warning",
                            buttons: ["No", "Yes"],
                          }).then(function (t) {
                            t && G([e]);
                          });
                        })(e);
                      },
                    },
                    l.a.createElement(k, { icon: "folder-minus" })
                  ),
                  l.a.createElement(
                    M,
                    {
                      variant: "secondary",
                      className: "ml-1 mr-1",
                      onClick: function (t) {
                        return (function (e) {
                          Y("loading");
                          var t = B.indexOf(e);
                          (B[t] = B[t + 1]), (B[t + 1] = e), J(B);
                        })(e);
                      },
                      disabled: B.indexOf(e) === B.length - 1,
                    },
                    l.a.createElement(k, { icon: "long-arrow-alt-down" })
                  ),
                  l.a.createElement(
                    M,
                    {
                      variant: "secondary",
                      className: "ml-1 mr-1",
                      onClick: function (t) {
                        return (function (e) {
                          Y("loading");
                          var t = B.indexOf(e);
                          (B[t] = B[t - 1]), (B[t - 1] = e), J(B);
                        })(e);
                      },
                      disabled: 0 === B.indexOf(e),
                    },
                    l.a.createElement(k, { icon: "long-arrow-alt-up" })
                  )
                );
              },
              ignoreRowClick: !0,
              allowOverflow: !0,
              minWidth: "220px",
              button: !0,
            },
          ];
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            "div",
            { className: "w-responsive pl-5 pr-5" },
            l.a.createElement(ne.a, {
              columns: z,
              data: B,
              customStyles: {
                headCells: { style: { fontSize: "16px" } },
                cells: { style: { fontSize: "14px" } },
              },
              highlightOnHover: !0,
              responsive: !0,
              pagination: !0,
              noDataComponent: "This module is currently empty",
              selectableRows: !0,
              subHeader: !0,
              subHeaderAlign: "right",
              onSelectedRowsChange: function (e) {
                return f(e.selectedRows);
              },
              clearSelectedRows: E,
              contextActions: l.a.createElement(
                M,
                {
                  variant: "danger",
                  className: "mr-3",
                  onClick: function () {
                    K()({
                      title: "Do you want to remove these parts?",
                      text:
                        "You are about to remove these parts. Are you sure about it?",
                      icon: "warning",
                      buttons: ["No", "Yes"],
                    }).then(function (e) {
                      e && G(g);
                    });
                  },
                },
                l.a.createElement(k, { icon: "folder-minus" }),
                l.a.createElement("b", null, " Remove")
              ),
              subHeaderComponent: l.a.createElement(
                l.a.Fragment,
                null,
                l.a.createElement(
                  "select",
                  {
                    className: "mr-3",
                    style: { width: "250px", height: "30px" },
                    value: S,
                    onChange: function (e) {
                      return T(e.target.value);
                    },
                  },
                  l.a.createElement("option", { value: "HTML" }, "HTML"),
                  "Info" === x
                    ? l.a.createElement(
                        "option",
                        { value: "Video or media" },
                        "Video or media"
                      )
                    : l.a.createElement(
                        l.a.Fragment,
                        null,
                        l.a.createElement(
                          "option",
                          { value: "One correct choice" },
                          "One correct choice"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "Multiple correct choices" },
                          "Multiple correct choices"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "Text answer" },
                          "Text answer"
                        )
                      )
                ),
                l.a.createElement(
                  M,
                  {
                    variant: "warning",
                    className: "mr-3",
                    onClick: function () {
                      i("new");
                    },
                  },
                  l.a.createElement(k, { icon: "folder-plus" }),
                  l.a.createElement("b", null, " Add segment")
                )
              ),
            })
          ),
          "Info" === x
            ? l.a.createElement(Pe, {
                segmentId: s,
                moduleId: t,
                type: S,
                closeModal: Q,
              })
            : l.a.createElement(De, {
                segmentId: s,
                moduleId: t,
                type: S,
                closeModal: Q,
              }),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(V, { status: D, message: H }),
          l.a.createElement(N, { level: "1" }),
          a
            ? l.a.createElement(
                M,
                {
                  className: "btn btn-success",
                  style: { width: "200px" },
                  type: "button",
                  onClick: function () {
                    a("redirect");
                  },
                },
                l.a.createElement("b", null, "Finish module")
              )
            : l.a.createElement(
                o.b,
                { to: { pathname: "/enter-module/".concat(t) } },
                l.a.createElement(
                  M,
                  { className: "btn btn-info", style: { width: "200px" } },
                  l.a.createElement("b", null, "Preview")
                )
              )
        );
      }
      function Fe() {
        var e = Object(n.useState)("info"),
          t = Object(m.a)(e, 2),
          a = t[0],
          r = t[1],
          c = function (e) {
            r(e);
          };
        return "redirect" === a
          ? l.a.createElement(f.a, { push: !0, to: "/my-modules" })
          : l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(A, { level: "1" }, "NEW MODULE"),
              l.a.createElement(N, { level: "2" }),
              "info" === a
                ? l.a.createElement(Ae, { moduleId: null, changeTab: c })
                : l.a.createElement(Ye, { moduleId: a, changeTab: c })
            );
      }
      function Le(e) {
        var t = e.courseId,
          a = Object(n.useState)(!1),
          r = Object(m.a)(a, 2),
          c = r[0],
          o = r[1],
          s = Object(n.useState)(null),
          i = Object(m.a)(s, 2),
          u = i[0],
          d = i[1],
          b = Object(n.useState)(""),
          p = Object(m.a)(b, 2),
          v = p[0],
          g = p[1],
          f = Object(n.useState)([]),
          w = Object(m.a)(f, 2),
          y = w[0],
          x = w[1],
          O = Object(n.useState)("loading"),
          C = Object(m.a)(O, 2),
          j = C[0],
          S = C[1],
          T = Object(n.useState)(null),
          I = Object(m.a)(T, 2),
          A = I[0],
          B = I[1],
          R = E();
        Object(n.useEffect)(
          function () {
            h.post("api/courses/getUsersWithAccess", { course: t })
              .then(function (e) {
                e.data.data.access.length > 0 &&
                  h
                    .post("api/users/getSelectedUsers", {
                      tokens: e.data.data.access,
                    })
                    .then(function (e) {
                      if (e.data.data) {
                        var a = [];
                        e.data.data.forEach(function (e) {
                          if (e.mail !== R.user) {
                            var n = 0;
                            if (e.progress && e.progress.length > 0) {
                              var l = e.progress.find(function (e) {
                                return e.course === t;
                              });
                              l &&
                                l.rewards.forEach(function (e) {
                                  n += e.points;
                                });
                            }
                            var r = {
                              name: e.name,
                              mail: e.mail,
                              token: e.token,
                              points: n,
                            };
                            a.push(r);
                          }
                        }),
                          x(a);
                      }
                    })
                    .catch(function (e) {
                      S("error"), B(e.message);
                    }),
                  S("success");
              })
              .catch(function (e) {
                S("error"), B(e.message);
              });
          },
          [t, R.user, c]
        );
        var P = function (e) {
            S("loading"),
              h
                .post("api/courses/removeStudents", {
                  course: t,
                  selectedUsers: e,
                })
                .then(function (e) {
                  B("User(s) successfully removed"), o(!c), d(null);
                })
                .catch(function (e) {
                  S("error"), B(e.message);
                });
          },
          q = [
            { name: "Name", selector: "name", sortable: !0, wrap: !0 },
            { name: "E-mail", selector: "mail", sortable: !0, wrap: !0 },
            { name: "Points", selector: "points", sortable: !0, wrap: !0 },
            {
              name: "Actions",
              cell: function (e) {
                return l.a.createElement(
                  M,
                  {
                    variant: "danger",
                    className: "ml-1 mr-1",
                    onClick: function (t) {
                      return (function (e) {
                        K()({
                          title: "Do you want to remove this user?",
                          text:
                            "You are about to remove this user. Are you sure about it?",
                          icon: "warning",
                          buttons: ["No", "Yes"],
                        }).then(function (t) {
                          t && P([e]);
                        });
                      })(e);
                    },
                  },
                  l.a.createElement(k, { icon: "user-slash" })
                );
              },
              ignoreRowClick: !0,
              allowOverflow: !0,
              minWidth: "100px",
              button: !0,
            },
          ];
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            "div",
            { className: "w-responsive pl-5 pr-5" },
            l.a.createElement(ne.a, {
              columns: q,
              data: y,
              customStyles: {
                headCells: { style: { fontSize: "16px" } },
                cells: { style: { fontSize: "14px" } },
              },
              highlightOnHover: !0,
              responsive: !0,
              pagination: !0,
              noDataComponent: "No users have access to this course",
              selectableRows: !0,
              subHeader: !0,
              subHeaderAlign: "right",
              onSelectedRowsChange: function (e) {
                return d(e.selectedRows);
              },
              clearSelectedRows: c,
              contextActions: l.a.createElement(
                M,
                {
                  variant: "danger",
                  className: "mr-3",
                  onClick: function () {
                    K()({
                      title: "Do you want to remove these users?",
                      text:
                        "You are about to remove these users. Are you sure about it?",
                      icon: "warning",
                      buttons: ["No", "Yes"],
                    }).then(function (e) {
                      e && P(u);
                    });
                  },
                },
                l.a.createElement(k, { icon: "user-slash" }),
                l.a.createElement("b", null, " Remove")
              ),
              subHeaderComponent: l.a.createElement(
                l.a.Fragment,
                null,
                l.a.createElement("input", {
                  type: "text",
                  className: "mr-3",
                  style: { width: "250px", height: "30px" },
                  placeholder: "e-mail of the student to be added",
                  value: v,
                  onChange: function (e) {
                    return g(e.target.value);
                  },
                }),
                l.a.createElement(
                  M,
                  {
                    variant: "success",
                    className: "mr-3",
                    onClick: function () {
                      S("loading"),
                        v
                          ? v === R.user
                            ? (S("error"),
                              B("You already have access to this module"))
                            : y.find(function (e) {
                                return e.mail === v;
                              })
                            ? (S("error"),
                              B(
                                "User with this e-mail already has access to this module"
                              ))
                            : h
                                .post("api/users/getUserToken", { mail: v })
                                .then(function (e) {
                                  e.data.data
                                    ? h
                                        .post("api/courses/giveAccess", {
                                          course: t,
                                          user: e.data.data.token,
                                        })
                                        .then(function (e) {
                                          B("Student successfully added"),
                                            o(!c);
                                        })
                                        .catch(function (e) {
                                          S("error"), B(e.message);
                                        })
                                    : (S("error"),
                                      B(
                                        "Student with this e-mail does not exist"
                                      ));
                                })
                                .catch(function (e) {
                                  S("error"), B(e.message);
                                })
                          : (S("error"),
                            B(
                              "E-mail of the student to be added is a required field"
                            ));
                    },
                  },
                  l.a.createElement(k, { icon: "user-plus" }),
                  l.a.createElement("b", null, " Add student")
                )
              ),
            })
          ),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(V, { status: j, message: A })
        );
      }
      function He(e) {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "EDIT COURSE"),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(
            "nav",
            null,
            l.a.createElement(
              "div",
              {
                className: "nav nav-tabs justify-content-center",
                id: "nav-tab",
                role: "tablist",
              },
              l.a.createElement(
                "a",
                {
                  className: "nav-item nav-link active",
                  id: "info-tab",
                  "data-toggle": "tab",
                  href: "#info",
                  role: "tab",
                  "aria-controls": "info",
                  "aria-selected": "true",
                },
                "Course info"
              ),
              l.a.createElement(
                "a",
                {
                  className: "nav-item nav-link",
                  id: "students-tab",
                  "data-toggle": "tab",
                  href: "#students",
                  role: "tab",
                  "aria-controls": "students",
                  "aria-selected": "false",
                },
                "Students"
              ),
              l.a.createElement(
                "a",
                {
                  className: "nav-item nav-link",
                  id: "content-tab",
                  "data-toggle": "tab",
                  href: "#content",
                  role: "tab",
                  "aria-controls": "content",
                  "aria-selected": "false",
                },
                "Course content"
              )
            )
          ),
          l.a.createElement(
            "div",
            { className: "tab-content", id: "nav-tabContent" },
            l.a.createElement(
              "div",
              {
                className: "tab-pane fade show active",
                id: "info",
                role: "tabpanel",
                "aria-labelledby": "info-tab",
              },
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                "p",
                { className: "text-danger" },
                l.a.createElement(
                  "b",
                  null,
                  l.a.createElement(
                    "i",
                    null,
                    "* If you want your changes to be saved, remember to click on save button"
                  )
                )
              ),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(Oe, { courseId: e.match.params.course })
            ),
            l.a.createElement(
              "div",
              {
                className: "tab-pane fade",
                id: "students",
                role: "tabpanel",
                "aria-labelledby": "students-tab",
              },
              l.a.createElement(Le, { courseId: e.match.params.course })
            ),
            l.a.createElement(
              "div",
              {
                className: "tab-pane fade",
                id: "content",
                role: "tabpanel",
                "aria-labelledby": "content-tab",
              },
              l.a.createElement(ke, {
                courseId: e.match.params.course,
                changeTab: null,
              })
            )
          )
        );
      }
      function Ve(e) {
        var t = e.moduleId,
          a = Object(n.useState)(!1),
          r = Object(m.a)(a, 2),
          c = r[0],
          o = r[1],
          s = Object(n.useState)(null),
          i = Object(m.a)(s, 2),
          u = i[0],
          d = i[1],
          b = Object(n.useState)(""),
          p = Object(m.a)(b, 2),
          v = p[0],
          g = p[1],
          f = Object(n.useState)([]),
          w = Object(m.a)(f, 2),
          y = w[0],
          x = w[1],
          O = Object(n.useState)("loading"),
          C = Object(m.a)(O, 2),
          j = C[0],
          S = C[1],
          T = Object(n.useState)(null),
          I = Object(m.a)(T, 2),
          A = I[0],
          B = I[1],
          R = E();
        Object(n.useEffect)(
          function () {
            h.post("api/modules/getUsersWithAccess", { module: t })
              .then(function (e) {
                e.data.data.access.length > 0 &&
                  h
                    .post("api/users/getSelectedUsers", {
                      tokens: e.data.data.access,
                    })
                    .then(function (e) {
                      if (e.data.data) {
                        var t = [];
                        e.data.data.forEach(function (e) {
                          if (e.mail !== R.user) {
                            var a = {
                              name: e.name,
                              mail: e.mail,
                              token: e.token,
                            };
                            t.push(a);
                          }
                        }),
                          x(t);
                      }
                    })
                    .catch(function (e) {
                      S("error"), B(e.message);
                    }),
                  S("success");
              })
              .catch(function (e) {
                S("error"), B(e.message);
              });
          },
          [t, R.user, c]
        );
        var P = function (e) {
            S("loading"),
              h
                .post("api/modules/removeUsers", {
                  module: t,
                  selectedUsers: e,
                })
                .then(function (e) {
                  B("User(s) successfully removed"), o(!c), d(null);
                })
                .catch(function (e) {
                  S("error"), B(e.message);
                });
          },
          q = [
            { name: "Name", selector: "name", sortable: !0, wrap: !0 },
            { name: "E-mail", selector: "mail", sortable: !0, wrap: !0 },
            {
              name: "Actions",
              cell: function (e) {
                return l.a.createElement(
                  M,
                  {
                    variant: "danger",
                    className: "ml-1 mr-1",
                    onClick: function (t) {
                      return (function (e) {
                        K()({
                          title: "Do you want to remove this user?",
                          text:
                            "You are about to remove this user. Are you sure about it?",
                          icon: "warning",
                          buttons: ["No", "Yes"],
                        }).then(function (t) {
                          t && P([e]);
                        });
                      })(e);
                    },
                  },
                  l.a.createElement(k, { icon: "user-slash" })
                );
              },
              ignoreRowClick: !0,
              allowOverflow: !0,
              minWidth: "100px",
              button: !0,
            },
          ];
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(
            "div",
            { className: "w-responsive pl-5 pr-5" },
            l.a.createElement(ne.a, {
              columns: q,
              data: y,
              customStyles: {
                headCells: { style: { fontSize: "16px" } },
                cells: { style: { fontSize: "14px" } },
              },
              highlightOnHover: !0,
              responsive: !0,
              pagination: !0,
              noDataComponent: "No users have access to this module",
              selectableRows: !0,
              subHeader: !0,
              subHeaderAlign: "right",
              onSelectedRowsChange: function (e) {
                return d(e.selectedRows);
              },
              clearSelectedRows: c,
              contextActions: l.a.createElement(
                M,
                {
                  variant: "danger",
                  className: "mr-3",
                  onClick: function () {
                    K()({
                      title: "Do you want to remove these users?",
                      text:
                        "You are about to remove these users. Are you sure about it?",
                      icon: "warning",
                      buttons: ["No", "Yes"],
                    }).then(function (e) {
                      e && P(u);
                    });
                  },
                },
                l.a.createElement(k, { icon: "user-slash" }),
                l.a.createElement("b", null, " Remove")
              ),
              subHeaderComponent: l.a.createElement(
                l.a.Fragment,
                null,
                l.a.createElement("input", {
                  type: "text",
                  className: "mr-3",
                  style: { width: "250px", height: "30px" },
                  placeholder: "e-mail of the user to be added",
                  value: v,
                  onChange: function (e) {
                    return g(e.target.value);
                  },
                }),
                l.a.createElement(
                  M,
                  {
                    variant: "success",
                    className: "mr-3",
                    onClick: function () {
                      S("loading"),
                        v
                          ? v === R.user
                            ? (S("error"),
                              B("You already have access to this module"))
                            : y.find(function (e) {
                                return e.mail === v;
                              })
                            ? (S("error"),
                              B(
                                "User with this e-mail already has access to this module"
                              ))
                            : h
                                .post("api/users/getUserToken", { mail: v })
                                .then(function (e) {
                                  e.data.data
                                    ? h
                                        .post("api/modules/giveAccess", {
                                          module: t,
                                          user: e.data.data.token,
                                        })
                                        .then(function (e) {
                                          B("User successfully added"), o(!c);
                                        })
                                        .catch(function (e) {
                                          S("error"), B(e.message);
                                        })
                                    : (S("error"),
                                      B(
                                        "User with this e-mail does not exist"
                                      ));
                                })
                                .catch(function (e) {
                                  S("error"), B(e.message);
                                })
                          : (S("error"),
                            B(
                              "E-mail of the user to be added is a required field"
                            ));
                    },
                  },
                  l.a.createElement(k, { icon: "user-plus" }),
                  l.a.createElement("b", null, " Add user")
                )
              ),
            })
          ),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(V, { status: j, message: A })
        );
      }
      function Ue(e) {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "EDIT MODULE"),
          l.a.createElement(N, { level: "2" }),
          l.a.createElement(
            "nav",
            null,
            l.a.createElement(
              "div",
              {
                className: "nav nav-tabs justify-content-center",
                id: "nav-tab",
                role: "tablist",
              },
              l.a.createElement(
                "a",
                {
                  className: "nav-item nav-link active",
                  id: "info-tab",
                  "data-toggle": "tab",
                  href: "#info",
                  role: "tab",
                  "aria-controls": "info",
                  "aria-selected": "true",
                },
                "Module info"
              ),
              l.a.createElement(
                "a",
                {
                  className: "nav-item nav-link",
                  id: "users-tab",
                  "data-toggle": "tab",
                  href: "#users",
                  role: "tab",
                  "aria-controls": "users",
                  "aria-selected": "false",
                },
                "Users with access"
              ),
              l.a.createElement(
                "a",
                {
                  className: "nav-item nav-link",
                  id: "content-tab",
                  "data-toggle": "tab",
                  href: "#content",
                  role: "tab",
                  "aria-controls": "content",
                  "aria-selected": "false",
                },
                "Module content"
              )
            )
          ),
          l.a.createElement(
            "div",
            { className: "tab-content", id: "nav-tabContent" },
            l.a.createElement(
              "div",
              {
                className: "tab-pane fade show active",
                id: "info",
                role: "tabpanel",
                "aria-labelledby": "info-tab",
              },
              l.a.createElement(N, { level: "2" }),
              l.a.createElement(
                "p",
                { className: "text-danger" },
                l.a.createElement(
                  "b",
                  null,
                  l.a.createElement(
                    "i",
                    null,
                    "* If you want your changes to be saved, remember to click on save button"
                  )
                )
              ),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(Ae, {
                moduleId: e.match.params.module,
                changeTab: null,
              })
            ),
            l.a.createElement(
              "div",
              {
                className: "tab-pane fade",
                id: "users",
                role: "tabpanel",
                "aria-labelledby": "users-tab",
              },
              l.a.createElement(Ve, {
                moduleId: e.match.params.module,
                changeTab: null,
              })
            ),
            l.a.createElement(
              "div",
              {
                className: "tab-pane fade",
                id: "content",
                role: "tabpanel",
                "aria-labelledby": "content-tab",
              },
              l.a.createElement(Ye, {
                moduleId: e.match.params.module,
                changeTab: null,
              })
            )
          )
        );
      }
      function Qe() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "MY COURSES"),
          l.a.createElement("br", null),
          l.a.createElement(oe, {
            isEditable: !0,
            noCoursesMessage: "You have not created any courses yet",
          })
        );
      }
      function Ge() {
        return l.a.createElement(
          "div",
          { align: "center" },
          l.a.createElement(A, { level: "1" }, "MY MODULES"),
          l.a.createElement("br", null),
          l.a.createElement(ie, {
            isEditable: !0,
            noModulesMessage: "You have not created any modules yet",
          })
        );
      }
      function Je(e) {
        var t = e.user,
          a = e.link,
          r = Object(n.useState)([]),
          c = Object(m.a)(r, 2),
          o = c[0],
          s = c[1],
          i = Object(n.useState)("loading"),
          u = Object(m.a)(i, 2),
          d = u[0],
          E = u[1],
          b = Object(n.useState)(null),
          p = Object(m.a)(b, 2),
          v = p[0],
          g = p[1],
          w = Object(n.useState)(!1),
          y = Object(m.a)(w, 2),
          x = y[0],
          O = y[1];
        return (
          Object(n.useEffect)(
            function () {
              h.post("api/invites/getInviteLink", { link: a })
                .then(function (e) {
                  E("idle"), s(e.data.data);
                })
                .catch(function (e) {
                  E("error"), g(e.message);
                });
            },
            [a]
          ),
          x
            ? l.a.createElement(f.a, { push: !0, to: "/courses" })
            : l.a.createElement(
                "div",
                { align: "center" },
                o
                  ? l.a.createElement(
                      "div",
                      null,
                      "Invitation to course ",
                      l.a.createElement("b", null, o.courseName),
                      l.a.createElement(N, { level: "1" }),
                      l.a.createElement(
                        M,
                        {
                          className: "btn btn-info",
                          style: { width: "200px" },
                          type: "button",
                          onClick: function () {
                            return (
                              E("loading"),
                              h
                                .post("api/courses/getCourseWithAccess", {
                                  course: o.courseId,
                                  user: t,
                                })
                                .then(function (e) {
                                  e.data.data
                                    ? (E("error"),
                                      g(
                                        "You already have access to this course"
                                      ))
                                    : h
                                        .post("api/courses/giveAccess", {
                                          course: o.courseId,
                                          user: t,
                                        })
                                        .then(function (e) {
                                          O(!0);
                                        })
                                        .catch(function (e) {
                                          E("error"), g(e.message);
                                        });
                                })
                                .catch(function (e) {
                                  E("error"), g(e.message);
                                }),
                              0
                            );
                          },
                        },
                        l.a.createElement("b", null, "Accept Invitation")
                      )
                    )
                  : l.a.createElement(
                      "b",
                      null,
                      "This invitation is either invalid or no longer active"
                    ),
                l.a.createElement(N, { level: "1" }),
                l.a.createElement(V, { status: d, message: v })
              )
        );
      }
      function ze(e) {
        var t = E();
        return t.token
          ? l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(A, { level: "1" }, "INVITATION LINK"),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(Je, {
                user: t.token,
                link: e.match.params.link,
              })
            )
          : l.a.createElement(
              "div",
              { align: "center" },
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(L, {
                error: "You must be signed in to proceed",
              }),
              l.a.createElement(A, { level: "1" }, "Sign in"),
              l.a.createElement(N, { level: "1" }),
              l.a.createElement(Q, null)
            );
      }
      var We = function () {
        return l.a.createElement(
          I,
          null,
          l.a.createElement(
            f.d,
            null,
            l.a.createElement(y, { path: "/sign-in", exact: !0, component: G }),
            l.a.createElement(y, {
              path: "/register",
              exact: !0,
              component: W,
            }),
            l.a.createElement(f.b, {
              path: "/invites/:link",
              exact: !0,
              component: ze,
            }),
            l.a.createElement(
              f.d,
              null,
              l.a.createElement(x, {
                path: "/profile",
                exact: !0,
                component: te,
              }),
              l.a.createElement(x, {
                path: "/courses",
                exact: !0,
                component: se,
              }),
              l.a.createElement(x, {
                path: "/modules",
                exact: !0,
                component: me,
              }),
              l.a.createElement(x, {
                path: "/my-courses",
                exact: !0,
                component: Qe,
              }),
              l.a.createElement(x, {
                path: "/my-modules",
                exact: !0,
                component: Ge,
              }),
              l.a.createElement(x, {
                path: "/add-course",
                exact: !0,
                component: Te,
              }),
              l.a.createElement(x, {
                path: "/add-module",
                exact: !0,
                component: Fe,
              }),
              l.a.createElement(x, {
                path: "/enter-course/:course",
                exact: !0,
                component: be,
              }),
              l.a.createElement(x, {
                path: "/enter-course/:course/:section",
                exact: !0,
                component: ye,
              }),
              l.a.createElement(x, {
                path: "/enter-module/:module",
                exact: !0,
                component: xe,
              }),
              l.a.createElement(x, {
                path: "/edit-course/:course",
                exact: !0,
                component: He,
              }),
              l.a.createElement(x, {
                path: "/edit-module/:module",
                exact: !0,
                component: Ue,
              }),
              l.a.createElement(x, { path: "*", component: R })
            )
          )
        );
      };
      var Xe = Object(f.g)(function (e) {
        var t = e.children,
          a = e.location.pathname;
        return (
          Object(n.useEffect)(
            function () {
              window.scrollTo(0, 0);
            },
            [a]
          ),
          t || null
        );
      });
      a(153).config();
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      c.a.render(
        l.a.createElement(function () {
          return l.a.createElement(
            b,
            null,
            l.a.createElement(
              g,
              null,
              l.a.createElement(
                o.a,
                null,
                l.a.createElement(Xe, null),
                l.a.createElement(We, null)
              )
            )
          );
        }, null),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
    99: function (e, t) {
      e.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAAD8/Pz09PT39/diYmLz8/Pv7+/q6uqSkpLk5ORycnIeHh59fX2wsLCXl5cwMDBXV1e4uLjBwcFJSUnY2NiGhobJycknJyfS0tIXFxdfX19nZ2empqaDg4OgoKA2NjY/Pz8hISEPDw9GRkZ2dnY0NDRYWFhtbW1stSvNAAALp0lEQVR4nN2djYKiOg+GBREQFREFxH8GZ/X+r/DT2T1nZzRJ2zQFzvdegPBImyZpmo4892p3823WrA6fi/K0mN0P+9vm2mTZ9mO+a90/feTyx3e/rg+uaVoV0ehNfpgUVb5cTFbN1iWoM8Ltalae10nov7O9kEZFfj4dGleUTgjbzeK4LgIV23dFVTq9X1y8jDxhO1muoVGplB/X6UkeUpqwORax0cf7qTCpy7nsG4kStotaPe9UCuJ8JflScoTtJrf4eD+VTDOx95IizA6VFN6X/PNmJ/NmMoRNKcv3VHScfEi8mwThr7IW5/tiTCcCbydAWFZi8+9VSXrtn3BVh674HvKTpa2vY0nYHjlruxFjve+T8J445nsqOFv5ADaE17wDvqcKG4tjQTgrOgJ8fMYlf+FgE2ZTa//MROmma8LVulPA0aiedUvY4Qj9R/GUt27wCD9drxGQgjMLkUW4cObE0Eo5iBzCaT98D1WMeINBeOoNcDRam8eN5oRlx0b0BdE4kWNMuHDpaGso3zom/Iz7BRwFR0P3xpBw0oWrrUCcuiS8dr/Qvys4uCP8JZ+N4Sgy8lGNCNO+2f6oMAkYTQjLvsn+1dEN4b7ndeKb/E8XhNkQrMw/SvRzcPqEQ5mEv5XLE977Xup/KlxIEw5kofirQnec6hKe+yZ6k248rEm46t9be1WsmSnWI9wd++YBlOqt+3qEqz7yMiqN9T6iHmFXyW0zreUIL32zINIyp1qEw/yEo1ElRXjpmwRVI0Q4LH/tu3R8Nw3CbIiG9LeiRoRw2Wv6kJSvESiqCXduCi1kpBHtqwlnwx2kWiGGmnC4duYpta1REsolEP1gPA6fGo+DIBCa3IWyyk9JWIrspIVJnZb3VXPJttml2dzu5TmvisQ+86POD6sIW4FBGhTpqYF+u1mkte0sz1VJfhXh1dqSxnlJ+I+Xz9Qu9ExuloSzsR1feJyoDPptaTXVVdZURWi535uvdMLU69JirB4V+8IKwmxtwxd+6m68N/zpXjRWhBubHKLRljQ7ExQoQn0F4Z3PNzbdyqyYS+TJinDJBowMNzIfSnlLb05PBZpwx84Dh6UxoDc/shBjemefJtxyfStfO+n+43Ep63mNBeGVCThifMGnMtaYuVsQfjIBj9zi7CvHotJhME3ITLJVv5iAnndijNPEgpC3RunuKIDijFMLQlZ04y8tAL2G8UTSmJKEOw7gqG5sCDkfkQwvSEKWKSVWwvlmtlgsZivS2bmZP5J0LkjCGYcQTX8d0iKJoyiKkyInDPzcfPKTyRqSkOOz+cgfuqm+H74cV3hdk/lTyf0LkpAT0sRwuDZ7NVoxekpkb/xMcrkgCTmWOwV/6fC+zAVYlqwxDvnHlINBEnKWQ/C9t1AMXyDvtTX2M4KGS8hYDkPwh+AyAMTotsYTER0OSkJGFgrceb7AUVGMPNa4VD6gTn5RhFtGuAYG3FgxDuLdfZr6pgEVXVCEDYMQXAQw04GUGsxMn0tGoxThxpwwgFzEDZYrRKz83ZiQStVQhDdzwgJaDU/YfE7gtfNgmj31qYCbIpyYE4LHdo7YvIrhdKP5N+QSGj8JOXuFZpVj2IWdmVoazFNUEho/aTQ6Az/Tops7yDxcmD6VjEgpQmOrDccxePk04jEb75V0SQhNiA3q/MFG/sPY4e+bcI/tfQSwY2ruebMJGZbG9/3gofGfHfvoGfCivh/yXjfjP5ZtaRiEJiqQx5pvWbJXi4NTwhgJCHbmMRubcOWSMMbO10/Mf4vttTH8Um3FCywuZyQW2J43EtZJCAdkfEL6GBRFmDkjHOOvxKnLCKiOEhThzrLSBJWPvxGrYoE8VSqdp9F6ITwkRwMt+gfZeRo3B2XGuF1g9iwKqGOzJKGT2lmihIHblImfTbQqF0IU4k1YPtklNVSjBZLQwWknoq0Vv/QLzA5pEcofbfbxKjReHcaXkCBFg9B8j0QldB8ss5nzEQVBEmZiZH+EbYO1M6szuPy9p1aK7I+w6qXt0m7lrdmE0ks+4qtdc8uydvKYnotqE0xIid3EetklS4ZoQtEFMYJLJk72fyNZREcT8osvAcELheUU/BJ55oImtCigfVMI+ttniQiNrCXvbpTmwHvsZI4ckS15yB1SydOxYMZPqG/YmBkfZqLHf6EDSlZ18t8VE4g4IbNgF9MasDNyx+IKvBwSJWyXolka6LTnRvAvrNEgGCW8yx6sDIGUpugsSLEICiO8CHdrgapqRWcBmt3CCKX7WxbvG9qi7sTjP0QCfYRQPN1dvxsa6b5TiHeKEIr3iXiPDFvxE9SwsYEJL9IPBwgb8WwsHETBhPIpqPenT8Qz6gF4VhUklB9Ao2o1+akbWmXDF5gFAgkdNAr2w/FPhQ62fUBzChIOr+2VngKoMgAiHGRXKC1BuTyIUCQq7UUJEMBAhC62K7rRGAhCAcLLkJpcGgo4KQAQDqAbMlvVu/sLEJbD6cRqLCCTABAOsYOgrsL3tDpAONTubFp6NzXvhLv/e8Ltf3exGOkR8k6MD0U6hNIZmu/yk3We1y5Xo34J/eP+mm23l+vd3UTQIXTWE3n9N0BtD66+Y4+W5iWy+XBksftbLYLXkxiOEHUI3TTZe9/hdtPFXovw7KDXZQxk+g7yj4GOQwCEJwchPnj+2UFhYPy+0QwQuuhO3kCErIYGtICOFQChg4al8IlfdgcjXEBBC5TFkM9kItVe4oNlDBy8gAj34hMR2TQR9y0KwKCB+VJxOw4dS3RBCCW9QULxulKk6FL6nwyhXVJ430J6gsCHuHbSCSGwRhHee+L2+MLkg1VLG+GnjMCNbmSHVHr8gIfLpFNecJkptsst/PAYKLycSy9KjQlhK3yvjA+4bdJRmtk+vnikH5YvX7GVvjG5QApq0Ioh6dx+XP6oxthOhQ0pXNxJEXrSrxB9v3h6lQvv4vvoSRWccC7tnvpJevs9VPeWHa4B4R19ierLnXjCxo+Soq6LJBJ37Yl2yeK9vnoRdi5cSejmeJ68KEAFYcvtz9ypoCSQLqGX5cOvWkioTl/qrvPZeeilJzUNqL7fYr4Y1tWOr1qrrs7VuCtoNeDaDP+o7Gyvc6PVbnjXO/5RpHGnrA7hM4U6RJvqa12ep0fo7abF0BiDguoVYUz4CKfOg5qOfj2l2+mbEz7i/vNgvqNfTRvd1zYgfMY8faP9VlJq8xkSOu6rpKsxfVWAFWEziGgjVdydY0Mofc6FJz0byiQcQmVmrX+vOoNwCEVvyDaPEKG36D3UoM6LShBadegQkfIqOUtCJ5UaJooU1zvZE2Y9h4u13n3jFoQ9LxiB8S1E5oT9nhkiG7VIERo3hReUb+SwcQn7/Ih6F8ZbE0rvgevLb7oh7M+xMXRn2ITeracVo+DcBcYi7GvFMDczbEK760m5OrPuq+MRevse7Klh1GRJ6JWuureiQlsrOyLs/Mp19QXc0oRuCtFxQW2m3BKybqHhC6uWcUnooDMmITagDaH5nT5s+Ra3YtoQihduYTIPCoUIvS3vimJjwLNRCliS8IHYwVcMjvxJaE3obd0vi5aAtoSMS2FMZXpFuzShc+cGb//dGaHn0qLybjCXJvQWztpMAEfRjCVByG8XT8sn+j3qS4TQ27vYOQ1yXkD4IhlCr5FvFxLpFlsoJETo7Xh3b+ASGaFPSRF63k00YMw5aTVQcoTeXK6DFjdjAUmQ8GFwapGlMUyVBYcGEiX0Po7264Zf26/y3yVL6HmrteXyn1g62m+SJvTmC5vq9yg1rENQS5zQ8y4nrlUN8js3o4bLAeGDsWRt3VQH4QH6JSeEnteat54obrZxEixHhA8tCoPlMazIGxxs5I7Q8+5rvfLwcZKqjhRYyCXhY+04VqoZ6SfrqZiHBsktoedtZ8eKmJLxejlxM/3+lWvChy73MoeGq18cy4kL6/lTHRA+tN1MHpQ/6NLTvpFf/AB1Q/hU+5FtZqfyodP9ms0dj82/+h/N97qzABKFCwAAAABJRU5ErkJggg==";
    },
  },
  [[105, 1, 2]],
]);
//# sourceMappingURL=main.653a315e.chunk.js.map
