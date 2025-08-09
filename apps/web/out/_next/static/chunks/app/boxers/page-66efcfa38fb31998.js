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
    s = new e.Error().stack
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = '8e8f1b2b-9ab6-4e38-a3e4-c04c6d064065'),
    (e._sentryDebugIdIdentifier = 'sentry-dbid-8e8f1b2b-9ab6-4e38-a3e4-c04c6d064065'))
} catch (e) {}
;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [96],
  {
    2898: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 7464)),
        Promise.resolve().then(t.t.bind(t, 7261, 23)),
        Promise.resolve().then(t.bind(t, 1874))
    },
    6511: (e, s, t) => {
      t.d(s, { $: () => d })
      var a = t(4568)
      t(7620)
      var i = t(9649),
        n = t(615),
        r = t(475)
      let l = (0, n.F)(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        {
          variants: {
            variant: {
              default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
              destructive:
                'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
              outline:
                'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
              secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
              ghost: 'hover:bg-accent hover:text-accent-foreground',
              link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
              default: 'h-9 px-4 py-2 has-[>svg]:px-3',
              sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
              lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
              icon: 'size-9'
            }
          },
          defaultVariants: { variant: 'default', size: 'default' }
        }
      )
      function d(e) {
        let { className: s, variant: t, size: n, asChild: d = !1, ...o } = e,
          c = d ? i.DX : 'button'
        return (0, a.jsx)(c, {
          'data-slot': 'button',
          className: (0, r.cn)(l({ variant: t, size: n, className: s })),
          ...o
        })
      }
    },
    7464: (e, s, t) => {
      t.d(s, { ClientBoxersList: () => z })
      var a = t(4568),
        i = t(7620),
        n = t(6511),
        r = t(8157),
        l = t(6589),
        d = t(475)
      let o = (0, t(615).F)(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          {
            variants: {
              variant: {
                default: 'bg-transparent',
                outline:
                  'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
              },
              size: {
                default: 'h-9 px-2 min-w-9',
                sm: 'h-8 px-1.5 min-w-8',
                lg: 'h-10 px-2.5 min-w-10'
              }
            },
            defaultVariants: { variant: 'default', size: 'default' }
          }
        ),
        c = i.createContext({ size: 'default', variant: 'default' })
      function x(e) {
        let { className: s, variant: t, size: i, children: n, ...r } = e
        return (0, a.jsx)(l.bL, {
          'data-slot': 'toggle-group',
          'data-variant': t,
          'data-size': i,
          className: (0, d.cn)(
            'group/toggle-group flex items-center rounded-md data-[variant=outline]:shadow-xs',
            s
          ),
          ...r,
          children: (0, a.jsx)(c.Provider, { value: { variant: t, size: i }, children: n })
        })
      }
      function u(e) {
        let { className: s, children: t, variant: n, size: r, ...x } = e,
          u = i.useContext(c)
        return (0, a.jsx)(l.q7, {
          'data-slot': 'toggle-group-item',
          'data-variant': u.variant || n,
          'data-size': u.size || r,
          className: (0, d.cn)(
            o({ variant: u.variant || n, size: u.size || r }),
            'min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
            s
          ),
          ...x,
          children: t
        })
      }
      var m = t(4736),
        h = t(6285),
        v = t(1467),
        f = t(2055),
        g = t(7432),
        b = t(2733),
        p = t(3332),
        j = t(7261),
        N = t.n(j)
      function y(e) {
        let { title: s, description: t, actionLabel: i, actionHref: r } = e
        return (0, a.jsxs)('div', {
          className: 'flex flex-col items-center justify-center h-[50vh] text-center',
          children: [
            (0, a.jsx)(p.A, { className: 'h-16 w-16 text-muted-foreground mb-4' }),
            (0, a.jsx)('h2', { className: 'text-2xl font-bold mb-2', children: s }),
            (0, a.jsx)('p', { className: 'text-muted-foreground mb-4 max-w-md', children: t }),
            (0, a.jsx)(n.$, { asChild: !0, children: (0, a.jsx)(N(), { href: r, children: i }) })
          ]
        })
      }
      var w = t(2942)
      function z(e) {
        let { initialBoxers: s } = e,
          t = (0, w.useRouter)(),
          l = (0, w.useSearchParams)(),
          [d, o] = (0, i.useState)('grid'),
          [c, p] = (0, i.useState)(s),
          j = l.get('division') || 'all',
          z = l.get('sort') || 'wins',
          [k, _] = (0, i.useState)(j),
          [D, R] = (0, i.useState)(z),
          C = (0, b.Bn)()
        ;(0, i.useEffect)(() => {
          let e = l.get('division') || 'all',
            s = l.get('sort') || 'wins'
          _(e), R(s)
        }, [l])
        let S = (e, s) => {
          let a = new URLSearchParams()
          'all' !== e && a.set('division', e), s && 'wins' !== s && a.set('sort', s)
          let i = a.toString()
          t.push('/boxers'.concat(i ? '?'.concat(i) : ''))
        }
        ;(0, i.useEffect)(() => {
          let e = [...s]
          'all' !== k && (e = e.filter(e => e.proDivision === k)),
            'wins' === D
              ? e.sort((e, s) => (s.proWins || 0) - (e.proWins || 0))
              : 'name' === D
                ? e.sort((e, s) => e.name.localeCompare(s.name))
                : 'bouts' === D &&
                  e.sort((e, s) => (s.proTotalBouts || 0) - (e.proTotalBouts || 0)),
            p(e)
        }, [s, k, D])
        let A = e => {
            let { boxer: s } = e,
              t = (0, b.M)(s)
            return (0, a.jsxs)(r.Zp, {
              className: 'hover:shadow-lg transition-shadow',
              children: [
                (0, a.jsx)(r.aR, {
                  children: (0, a.jsxs)(r.ZB, {
                    className: 'flex items-start justify-between',
                    children: [
                      (0, a.jsx)(N(), {
                        href: '/boxers/'.concat(s.slug),
                        className: 'hover:underline',
                        children: s.name
                      }),
                      s.nicknames &&
                        (0, a.jsxs)('span', {
                          className: 'text-sm text-muted-foreground',
                          children: ['"', s.nicknames, '"']
                        })
                    ]
                  })
                }),
                (0, a.jsx)(r.Wu, {
                  children: (0, a.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, a.jsxs)('div', {
                        className: 'flex justify-between text-sm',
                        children: [
                          (0, a.jsx)('span', {
                            className: 'text-muted-foreground',
                            children: 'Record:'
                          }),
                          (0, a.jsx)('span', { className: 'font-semibold', children: t.record })
                        ]
                      }),
                      s.proDivision &&
                        (0, a.jsxs)('div', {
                          className: 'flex justify-between text-sm',
                          children: [
                            (0, a.jsx)('span', {
                              className: 'text-muted-foreground',
                              children: 'Division:'
                            }),
                            (0, a.jsx)('span', { className: 'capitalize', children: s.proDivision })
                          ]
                        }),
                      s.nationality &&
                        (0, a.jsxs)('div', {
                          className: 'flex justify-between text-sm',
                          children: [
                            (0, a.jsx)('span', {
                              className: 'text-muted-foreground',
                              children: 'Nationality:'
                            }),
                            (0, a.jsx)('span', { children: s.nationality })
                          ]
                        }),
                      s.stance &&
                        (0, a.jsxs)('div', {
                          className: 'flex justify-between text-sm',
                          children: [
                            (0, a.jsx)('span', {
                              className: 'text-muted-foreground',
                              children: 'Stance:'
                            }),
                            (0, a.jsx)('span', { className: 'capitalize', children: s.stance })
                          ]
                        }),
                      (0, a.jsx)('div', {
                        className: 'pt-2 border-t',
                        children: (0, a.jsxs)('div', {
                          className: 'grid grid-cols-3 gap-2 text-center',
                          children: [
                            (0, a.jsxs)('div', {
                              children: [
                                (0, a.jsx)('div', {
                                  className: 'text-xs text-muted-foreground',
                                  children: 'Win Rate'
                                }),
                                (0, a.jsx)('div', {
                                  className: 'font-semibold',
                                  children: t.winRate
                                })
                              ]
                            }),
                            (0, a.jsxs)('div', {
                              children: [
                                (0, a.jsx)('div', {
                                  className: 'text-xs text-muted-foreground',
                                  children: 'KO Rate'
                                }),
                                (0, a.jsx)('div', {
                                  className: 'font-semibold',
                                  children: t.koRate
                                })
                              ]
                            }),
                            (0, a.jsxs)('div', {
                              children: [
                                (0, a.jsx)('div', {
                                  className: 'text-xs text-muted-foreground',
                                  children: 'Bouts'
                                }),
                                (0, a.jsx)('div', {
                                  className: 'font-semibold',
                                  children: t.totalBouts
                                })
                              ]
                            })
                          ]
                        })
                      })
                    ]
                  })
                })
              ]
            })
          },
          B = e => {
            let { boxer: s } = e,
              t = (0, b.M)(s)
            return (0, a.jsx)('div', {
              className: 'border rounded-lg p-4 hover:shadow-md transition-shadow',
              children: (0, a.jsxs)('div', {
                className: 'flex items-center justify-between',
                children: [
                  (0, a.jsxs)('div', {
                    className: 'flex-1',
                    children: [
                      (0, a.jsxs)('h3', {
                        className: 'font-semibold text-lg',
                        children: [
                          (0, a.jsx)(N(), {
                            href: '/boxers/'.concat(s.slug),
                            className: 'hover:underline',
                            children: s.name
                          }),
                          s.nicknames &&
                            (0, a.jsxs)('span', {
                              className: 'ml-2 text-sm text-muted-foreground',
                              children: ['"', s.nicknames, '"']
                            })
                        ]
                      }),
                      (0, a.jsxs)('div', {
                        className: 'flex gap-4 mt-1 text-sm text-muted-foreground',
                        children: [
                          (0, a.jsxs)('span', { children: ['Record: ', t.record] }),
                          s.proDivision &&
                            (0, a.jsxs)('span', { children: ['Division: ', s.proDivision] }),
                          s.nationality && (0, a.jsx)('span', { children: s.nationality })
                        ]
                      })
                    ]
                  }),
                  (0, a.jsxs)('div', {
                    className: 'flex gap-4 text-sm',
                    children: [
                      (0, a.jsxs)('div', {
                        className: 'text-center',
                        children: [
                          (0, a.jsx)('div', { className: 'font-semibold', children: t.winRate }),
                          (0, a.jsx)('div', {
                            className: 'text-xs text-muted-foreground',
                            children: 'Win Rate'
                          })
                        ]
                      }),
                      (0, a.jsxs)('div', {
                        className: 'text-center',
                        children: [
                          (0, a.jsx)('div', { className: 'font-semibold', children: t.koRate }),
                          (0, a.jsx)('div', {
                            className: 'text-xs text-muted-foreground',
                            children: 'KO Rate'
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            })
          }
        return (0, a.jsxs)('div', {
          children: [
            (0, a.jsx)('h1', {
              className: 'text-4xl font-bold tracking-tight mb-4',
              children: 'Professional Boxers Directory'
            }),
            (0, a.jsx)('div', {
              className: 'mb-8',
              children: (0, a.jsxs)('div', {
                className: 'flex flex-wrap gap-2',
                children: [
                  (0, a.jsx)(n.$, {
                    variant: 'all' === k ? 'default' : 'secondary',
                    size: 'sm',
                    onClick: () => {
                      _('all'), S('all', D)
                    },
                    className: 'rounded-full',
                    children: 'All Divisions'
                  }),
                  C.map(e =>
                    (0, a.jsx)(
                      n.$,
                      {
                        variant: k === e.slug ? 'default' : 'secondary',
                        size: 'sm',
                        onClick: () => {
                          _(e.slug), S(e.slug, D)
                        },
                        className: 'rounded-full',
                        children: e.name
                      },
                      e.slug
                    )
                  )
                ]
              })
            }),
            (0, a.jsxs)('div', {
              className: 'flex justify-between items-center mb-4',
              children: [
                (0, a.jsxs)('div', {
                  className: 'flex items-center space-x-2',
                  children: [
                    (0, a.jsx)(n.$, {
                      variant: 'grid' === d ? 'default' : 'outline',
                      size: 'sm',
                      onClick: () => o('grid'),
                      children: (0, a.jsx)(m.A, { className: 'size-4' })
                    }),
                    (0, a.jsx)(n.$, {
                      variant: 'list' === d ? 'default' : 'outline',
                      size: 'sm',
                      onClick: () => o('list'),
                      children: (0, a.jsx)(h.A, { className: 'size-4' })
                    })
                  ]
                }),
                (0, a.jsxs)('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    (0, a.jsx)('span', {
                      className: 'text-sm text-muted-foreground',
                      children: 'Sort by:'
                    }),
                    (0, a.jsxs)(x, {
                      type: 'single',
                      value: D,
                      onValueChange: e => e && R(e),
                      className: 'bg-background border rounded-md',
                      children: [
                        (0, a.jsxs)(u, {
                          value: 'wins',
                          className: 'px-3 py-2 h-10 data-[state=on]:bg-accent',
                          children: [
                            (0, a.jsx)(v.A, { className: 'size-4 mr-2' }),
                            (0, a.jsx)('span', { className: 'text-sm', children: 'Wins' })
                          ]
                        }),
                        (0, a.jsxs)(u, {
                          value: 'bouts',
                          className: 'px-3 py-2 h-10 data-[state=on]:bg-accent',
                          children: [
                            (0, a.jsx)(f.A, { className: 'size-4 mr-2' }),
                            (0, a.jsx)('span', { className: 'text-sm', children: 'Experience' })
                          ]
                        }),
                        (0, a.jsxs)(u, {
                          value: 'name',
                          className: 'px-3 py-2 h-10 data-[state=on]:bg-accent',
                          children: [
                            (0, a.jsx)(g.A, { className: 'size-4 mr-2' }),
                            (0, a.jsx)('span', { className: 'text-sm', children: 'Name' })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            0 === c.length
              ? (0, a.jsx)(y, {
                  title: 'No boxers found',
                  description: 'There are no boxers matching your current filters.',
                  actionLabel: 'View All',
                  actionHref: '/boxers'
                })
              : 'grid' === d
                ? (0, a.jsx)('div', {
                    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
                    children: c.map(e => (0, a.jsx)(A, { boxer: e }, e.id))
                  })
                : (0, a.jsx)('div', {
                    className: 'space-y-2',
                    children: c.map(e => (0, a.jsx)(B, { boxer: e }, e.id))
                  })
          ]
        })
      }
    }
  },
  e => {
    var s = s => e((e.s = s))
    e.O(0, [874, 261, 323, 681, 353, 587, 315, 358], () => s(2898)), (_N_E = e.O())
  }
])
