try {
  let e =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof self
              ? self
              : {},
    t = new e.Error().stack
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = '691447f9-c589-4ed1-8c6f-133309adf106'),
    (e._sentryDebugIdIdentifier = 'sentry-dbid-691447f9-c589-4ed1-8c6f-133309adf106'))
} catch (e) {}
;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [959],
  {
    5171: (e, t, s) => {
      s.r(t), s.d(t, { default: () => x })
      var r = s(4568),
        a = s(8157),
        i = s(7620),
        n = s(475)
      function l(e) {
        let { className: t, type: s, ...a } = e
        return (0, r.jsx)('input', {
          type: s,
          'data-slot': 'input',
          className: (0, n.cn)(
            'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            t
          ),
          ...a
        })
      }
      let o = (0, s(8889).A)('search', [
        ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
        ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }]
      ])
      var d = s(7261),
        c = s.n(d),
        u = s(2733)
      function x() {
        let [e, t] = (0, i.useState)(''),
          [s, n] = (0, i.useState)([]),
          [d, x] = (0, i.useState)([]),
          [m, f] = (0, i.useState)(!0)
        return (
          (0, i.useEffect)(() => {
            ;(async () => {
              n(await (0, u.cN)()), f(!1)
            })()
          }, []),
          (0, i.useEffect)(() => {
            if (!e.trim()) {
              x([])
              return
            }
            let t = e.toLowerCase()
            x(
              s
                .filter(e => {
                  var s, r
                  return (
                    e.name.toLowerCase().includes(t) ||
                    (null === (s = e.nationality) || void 0 === s
                      ? void 0
                      : s.toLowerCase().includes(t)) ||
                    (null === (r = e.proDivision) || void 0 === r
                      ? void 0
                      : r.toLowerCase().includes(t))
                  )
                })
                .slice(0, 50)
            )
          }, [e, s]),
          (0, r.jsx)('div', {
            className: 'max-w-6xl mx-auto px-4 py-8',
            children: (0, r.jsxs)('div', {
              className: 'space-y-6',
              children: [
                (0, r.jsxs)('div', {
                  className: 'text-center space-y-4',
                  children: [
                    (0, r.jsx)('h1', {
                      className: 'text-4xl font-bold',
                      children: 'Search Boxers'
                    }),
                    (0, r.jsxs)('p', {
                      className: 'text-muted-foreground',
                      children: [
                        'Search our database of ',
                        s.length.toLocaleString(),
                        ' professional boxers'
                      ]
                    })
                  ]
                }),
                (0, r.jsxs)('div', {
                  className: 'relative max-w-2xl mx-auto',
                  children: [
                    (0, r.jsx)(o, {
                      className:
                        'absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5'
                    }),
                    (0, r.jsx)(l, {
                      type: 'text',
                      placeholder: 'Search by name, country, or division...',
                      value: e,
                      onChange: e => t(e.target.value),
                      className: 'pl-10 h-12 text-lg',
                      autoFocus: !0
                    })
                  ]
                }),
                m
                  ? (0, r.jsx)('div', {
                      className: 'text-center py-12',
                      children: (0, r.jsx)('p', {
                        className: 'text-muted-foreground',
                        children: 'Loading boxers...'
                      })
                    })
                  : e.trim()
                    ? (0, r.jsxs)('div', {
                        className: 'space-y-4',
                        children: [
                          (0, r.jsxs)('p', {
                            className: 'text-sm text-muted-foreground',
                            children: ['Found ', d.length, ' ', 1 === d.length ? 'boxer' : 'boxers']
                          }),
                          d.length > 0
                            ? (0, r.jsx)('div', {
                                className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
                                children: d.map(e =>
                                  (0, r.jsxs)(
                                    a.Zp,
                                    {
                                      className: 'hover:shadow-lg transition-shadow',
                                      children: [
                                        (0, r.jsx)(a.aR, {
                                          children: (0, r.jsx)(a.ZB, {
                                            children: (0, r.jsx)(c(), {
                                              href: '/boxers/'.concat(e.slug),
                                              className: 'hover:underline',
                                              children: e.name
                                            })
                                          })
                                        }),
                                        (0, r.jsx)(a.Wu, {
                                          children: (0, r.jsxs)('dl', {
                                            className: 'space-y-2',
                                            children: [
                                              (0, r.jsxs)('div', {
                                                className: 'flex justify-between',
                                                children: [
                                                  (0, r.jsx)('dt', {
                                                    className: 'text-sm text-muted-foreground',
                                                    children: 'Record'
                                                  }),
                                                  (0, r.jsxs)('dd', {
                                                    className: 'font-semibold',
                                                    children: [
                                                      e.proWins,
                                                      '-',
                                                      e.proLosses,
                                                      '-',
                                                      e.proDraws
                                                    ]
                                                  })
                                                ]
                                              }),
                                              e.proDivision &&
                                                (0, r.jsxs)('div', {
                                                  className: 'flex justify-between',
                                                  children: [
                                                    (0, r.jsx)('dt', {
                                                      className: 'text-sm text-muted-foreground',
                                                      children: 'Division'
                                                    }),
                                                    (0, r.jsx)('dd', {
                                                      className: 'capitalize',
                                                      children: e.proDivision
                                                    })
                                                  ]
                                                }),
                                              e.nationality &&
                                                (0, r.jsxs)('div', {
                                                  className: 'flex justify-between',
                                                  children: [
                                                    (0, r.jsx)('dt', {
                                                      className: 'text-sm text-muted-foreground',
                                                      children: 'Country'
                                                    }),
                                                    (0, r.jsx)('dd', { children: e.nationality })
                                                  ]
                                                })
                                            ]
                                          })
                                        })
                                      ]
                                    },
                                    e.id
                                  )
                                )
                              })
                            : (0, r.jsx)('div', {
                                className: 'text-center py-12',
                                children: (0, r.jsxs)('p', {
                                  className: 'text-muted-foreground',
                                  children: ['No boxers found matching "', e, '"']
                                })
                              })
                        ]
                      })
                    : (0, r.jsx)('div', {
                        className: 'text-center py-12',
                        children: (0, r.jsx)('p', {
                          className: 'text-muted-foreground',
                          children: 'Start typing to search for boxers'
                        })
                      })
              ]
            })
          })
        )
      }
    },
    6060: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 5171))
    },
    8889: (e, t, s) => {
      s.d(t, { A: () => c })
      var r = s(7620)
      let a = e => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
        i = e =>
          e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, s) => (s ? s.toUpperCase() : t.toLowerCase())),
        n = e => {
          let t = i(e)
          return t.charAt(0).toUpperCase() + t.slice(1)
        },
        l = () => {
          for (var e = arguments.length, t = Array(e), s = 0; s < e; s++) t[s] = arguments[s]
          return t
            .filter((e, t, s) => !!e && '' !== e.trim() && s.indexOf(e) === t)
            .join(' ')
            .trim()
        }
      var o = {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 24,
        height: 24,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }
      let d = (0, r.forwardRef)((e, t) => {
          let {
            color: s = 'currentColor',
            size: a = 24,
            strokeWidth: i = 2,
            absoluteStrokeWidth: n,
            className: d = '',
            children: c,
            iconNode: u,
            ...x
          } = e
          return (0, r.createElement)(
            'svg',
            {
              ref: t,
              ...o,
              width: a,
              height: a,
              stroke: s,
              strokeWidth: n ? (24 * Number(i)) / Number(a) : i,
              className: l('lucide', d),
              ...x
            },
            [
              ...u.map(e => {
                let [t, s] = e
                return (0, r.createElement)(t, s)
              }),
              ...(Array.isArray(c) ? c : [c])
            ]
          )
        }),
        c = (e, t) => {
          let s = (0, r.forwardRef)((s, i) => {
            let { className: o, ...c } = s
            return (0, r.createElement)(d, {
              ref: i,
              iconNode: t,
              className: l('lucide-'.concat(a(n(e))), 'lucide-'.concat(e), o),
              ...c
            })
          })
          return (s.displayName = n(e)), s
        }
    }
  },
  e => {
    var t = t => e((e.s = t))
    e.O(0, [874, 261, 323, 353, 587, 315, 358], () => t(6060)), (_N_E = e.O())
  }
])
