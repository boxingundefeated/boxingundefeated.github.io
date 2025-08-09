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
    (e._sentryDebugIds[t] = '9bddbeb0-66bb-4b3f-b55d-6abf612be2bc'),
    (e._sentryDebugIdIdentifier = 'sentry-dbid-9bddbeb0-66bb-4b3f-b55d-6abf612be2bc'))
} catch (e) {}
;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [177],
  {
    475: (e, t, r) => {
      r.d(t, { cn: () => n })
      var s = r(2987)
      r(1874)
      var o = r(607)
      r(6492)
      let n = () => {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r]
        return (0, o.QP)((0, s.$)(t))
      }
    },
    1996: (e, t, r) => {
      r.d(t, { Toaster: () => i })
      var s = r(4568),
        o = r(8309),
        n = r(1874)
      let i = e => {
        let { ...t } = e,
          { theme: r = 'system' } = (0, o.D)()
        return (0, s.jsx)(n.l, {
          theme: r,
          className: 'toaster group',
          toastOptions: {
            classNames: {
              toast:
                'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
              description: 'group-[.toast]:text-muted-foreground',
              actionButton:
                'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
              cancelButton:
                'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium'
            }
          },
          ...t
        })
      }
    },
    2144: (e, t, r) => {
      r.d(t, { TooltipProvider: () => n })
      var s = r(4568)
      r(7620)
      var o = r(597)
      function n(e) {
        let { delayDuration: t = 0, ...r } = e
        return (0, s.jsx)(o.Kq, { 'data-slot': 'tooltip-provider', delayDuration: t, ...r })
      }
      r(475)
    },
    3855: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 6380)),
        Promise.resolve().then(r.bind(r, 9177)),
        Promise.resolve().then(r.bind(r, 8733)),
        Promise.resolve().then(r.bind(r, 9308)),
        Promise.resolve().then(r.bind(r, 8309)),
        Promise.resolve().then(r.t.bind(r, 7261, 23)),
        Promise.resolve().then(r.t.bind(r, 4760, 23)),
        Promise.resolve().then(r.t.bind(r, 3620, 23)),
        Promise.resolve().then(r.bind(r, 1874)),
        Promise.resolve().then(r.bind(r, 1996)),
        Promise.resolve().then(r.bind(r, 2144)),
        Promise.resolve().then(r.t.bind(r, 6635, 23)),
        Promise.resolve().then(r.bind(r, 8378))
    },
    6380: (e, t, r) => {
      r.d(t, { Header: () => b })
      var s = r(4568),
        o = r(5173),
        n = r(7261),
        i = r.n(n),
        a = r(2942),
        l = r(7620)
      let d = {
        home: '/',
        llmsTxt: '/llms.txt',
        boxers: {
          list: '/boxers',
          detail: '/boxers/[slug]',
          featured: '/boxers',
          latest: '/boxers?sort=latest',
          withDivision: '/boxers?division=[division]'
        },
        website: {
          list: '/boxers',
          detail: '/boxers/[slug]',
          featured: '/boxers',
          latest: '/boxers?sort=latest',
          withCategory: '/boxers?category=[category]'
        },
        about: '/about',
        guides: { list: '/guides', guide: '/guides/[slug]' },
        faq: '/faq',
        login: '/login',
        news: '/news',
        privacy: '/privacy',
        projects: '/projects',
        search: '/search',
        submit: '/submit',
        terms: '/terms',
        rss: '/rss.xml'
      }
      function u(e, t) {
        let r = e.split('.'),
          s = d
        for (let e of r) s = s[e]
        if ('string' == typeof s && t) {
          let e = Object.entries(t)[0]
          return s.replace('['.concat(e[0], ']'), e[1])
        }
        return s
      }
      function c(e) {
        let { href: t, children: r, exact: o = !1 } = e,
          n = (0, a.usePathname)(),
          l = o ? n === t : n.startsWith(t)
        return (0, s.jsx)(i(), {
          href: t,
          className: 'text-sm transition-colors '.concat(
            l ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
          ),
          children: r
        })
      }
      function b() {
        let [e, t] = (0, l.useState)(!1),
          {
            searchQuery: r,
            setSearchQuery: n,
            handleSearch: d
          } = (() => {
            let [e, t] = (0, l.useState)(''),
              r = ((e, t) => {
                let [r, s] = (0, l.useState)(e)
                return (
                  (0, l.useEffect)(() => {
                    let t = setTimeout(() => {
                      s(e)
                    }, 300)
                    return () => {
                      clearTimeout(t)
                    }
                  }, [e, 300]),
                  r
                )
              })(e, 300),
              s = (0, a.useRouter)()
            return {
              searchQuery: e,
              setSearchQuery: t,
              debouncedSearchQuery: r,
              handleSearch: (0, l.useCallback)(
                async e =>
                  e.trim()
                    ? new Promise(t => {
                        let r = ''.concat(u('search'), '?q=').concat(encodeURIComponent(e))
                        s.push(r),
                          setTimeout(() => {
                            t()
                          }, 100)
                      })
                    : Promise.resolve(),
                [s]
              )
            }
          })(),
          b = e => {
            e.preventDefault(), r.trim() && (d(r), n(''))
          }
        return (0, s.jsxs)('header', {
          className: 'border-b',
          children: [
            (0, s.jsxs)('div', {
              className: 'container mx-auto px-4 h-16 flex items-center justify-between',
              children: [
                (0, s.jsxs)('div', {
                  className: 'flex items-center gap-6',
                  children: [
                    (0, s.jsx)(i(), {
                      href: u('home'),
                      className: 'font-bold text-xl',
                      children: '\uD83E\uDD4A Boxing Directory'
                    }),
                    (0, s.jsxs)('nav', {
                      className: 'hidden md:flex items-center gap-4',
                      children: [
                        (0, s.jsx)(c, { href: u('website.list'), children: 'Boxers' }),
                        (0, s.jsx)(c, { href: u('about'), children: 'About' }),
                        (0, s.jsx)(c, { href: u('search'), children: 'Search' })
                      ]
                    })
                  ]
                }),
                (0, s.jsxs)('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    (0, s.jsxs)('form', {
                      onSubmit: b,
                      className: 'hidden md:block relative',
                      children: [
                        (0, s.jsx)('input', {
                          type: 'text',
                          placeholder: 'Search boxers...',
                          value: r,
                          onChange: e => n(e.target.value),
                          className:
                            'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                        }),
                        (0, s.jsx)('button', {
                          type: 'submit',
                          className:
                            'absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground',
                          'aria-label': 'Search',
                          children: (0, s.jsx)(o.A, { className: 'h-4 w-4' })
                        })
                      ]
                    }),
                    (0, s.jsx)('button', {
                      type: 'button',
                      className: 'md:hidden text-muted-foreground',
                      onClick: () => t(!e),
                      'aria-label': 'Toggle search',
                      children: (0, s.jsx)(o.A, { className: 'h-5 w-5' })
                    })
                  ]
                })
              ]
            }),
            e &&
              (0, s.jsx)('div', {
                className: 'md:hidden container mx-auto px-4 py-2 border-t',
                children: (0, s.jsxs)('form', {
                  onSubmit: b,
                  className: 'relative',
                  children: [
                    (0, s.jsx)('input', {
                      type: 'text',
                      placeholder: 'Search boxers...',
                      value: r,
                      onChange: e => n(e.target.value),
                      className:
                        'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    }),
                    (0, s.jsx)('button', {
                      type: 'submit',
                      className:
                        'absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground',
                      'aria-label': 'Search',
                      children: (0, s.jsx)(o.A, { className: 'h-4 w-4' })
                    })
                  ]
                })
              })
          ]
        })
      }
    },
    6492: (e, t, r) => {
      r.d(t, { v: () => n }), r(1929), r(880), r(459)
      let s = { debug: 0, info: 1, warn: 2, error: 3 }
      class o {
        formatMessage(e, t) {
          let r = []
          return (
            (null == t ? void 0 : t.level) && r.push('['.concat(t.level.toUpperCase(), ']')),
            r.push(e),
            r.join(' ')
          )
        }
        shouldLog(e) {
          return 'error' === e || s[e] >= s.error
        }
        debug(e, t) {
          this.shouldLog('debug') && console.debug(this.formatMessage(e, { ...t, level: 'debug' }))
        }
        info(e, t) {
          this.shouldLog('info') && console.info(this.formatMessage(e, { ...t, level: 'info' }))
        }
        warn(e, t) {
          this.shouldLog('warn') && console.warn(this.formatMessage(e, { ...t, level: 'warn' }))
        }
        error(e, t) {
          var r
          let s = e instanceof Error ? e.message : e,
            o = e instanceof Error ? e.stack : void 0
          console.error(
            this.formatMessage(s, { ...t, level: 'error' }),
            null !== (r = null != o ? o : null == t ? void 0 : t.data) && void 0 !== r ? r : ''
          )
        }
      }
      let n = new o()
    },
    6511: (e, t, r) => {
      r.d(t, { $: () => l })
      var s = r(4568)
      r(7620)
      var o = r(9649),
        n = r(615),
        i = r(475)
      let a = (0, n.F)(
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
      function l(e) {
        let { className: t, variant: r, size: n, asChild: l = !1, ...d } = e,
          u = l ? o.DX : 'button'
        return (0, s.jsx)(u, {
          'data-slot': 'button',
          className: (0, i.cn)(a({ variant: r, size: n, className: t })),
          ...d
        })
      }
    },
    6635: () => {},
    8378: (e, t, r) => {
      r.d(t, { SentryUserProvider: () => i })
      var s = r(4568),
        o = r(1651),
        n = r(7620)
      function i(e) {
        let { children: t } = e
        return (
          (0, n.useEffect)(() => {
            o.gV(null)
          }, []),
          (0, s.jsx)(s.Fragment, { children: t })
        )
      }
    },
    9177: (e, t, r) => {
      r.d(t, { ModeToggle: () => l })
      var s = r(4568),
        o = r(6511),
        n = r(1261),
        i = r(3672),
        a = r(8309)
      function l() {
        let { theme: e, setTheme: t } = (0, a.D)()
        return (0, s.jsxs)(o.$, {
          variant: 'ghost',
          size: 'icon',
          onClick: () => t('light' === e ? 'dark' : 'light'),
          children: [
            (0, s.jsx)(n.A, {
              className:
                'h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
            }),
            (0, s.jsx)(i.A, {
              className:
                'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
            }),
            (0, s.jsx)('span', { className: 'sr-only', children: 'Toggle theme' })
          ]
        })
      }
    }
  },
  e => {
    var t = t => e((e.s = t))
    e.O(0, [640, 262, 874, 261, 323, 744, 927, 587, 315, 358], () => t(3855)), (_N_E = e.O())
  }
])
