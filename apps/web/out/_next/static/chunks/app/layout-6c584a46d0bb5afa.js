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
    r = new e.Error().stack
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = 'd5de3a9d-36d3-483d-b868-db43c94ed621'),
    (e._sentryDebugIdIdentifier = 'sentry-dbid-d5de3a9d-36d3-483d-b868-db43c94ed621'))
} catch (e) {}
;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [177],
  {
    475: (e, r, t) => {
      t.d(r, { cn: () => n })
      var s = t(2987)
      t(1874)
      var o = t(607)
      t(6492)
      let n = () => {
        for (var e = arguments.length, r = Array(e), t = 0; t < e; t++) r[t] = arguments[t]
        return (0, o.QP)((0, s.$)(r))
      }
    },
    1996: (e, r, t) => {
      t.d(r, { Toaster: () => i })
      var s = t(4568),
        o = t(8309),
        n = t(1874)
      let i = e => {
        let { ...r } = e,
          { theme: t = 'system' } = (0, o.D)()
        return (0, s.jsx)(n.l, {
          theme: t,
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
          ...r
        })
      }
    },
    2144: (e, r, t) => {
      t.d(r, { TooltipProvider: () => n })
      var s = t(4568)
      t(7620)
      var o = t(597)
      function n(e) {
        let { delayDuration: r = 0, ...t } = e
        return (0, s.jsx)(o.Kq, { 'data-slot': 'tooltip-provider', delayDuration: r, ...t })
      }
      t(475)
    },
    3583: (e, r, t) => {
      t.d(r, { Header: () => u })
      var s = t(4568),
        o = t(7261),
        n = t.n(o),
        i = t(2942)
      let a = {
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
      function d(e, r) {
        let t = e.split('.'),
          s = a
        for (let e of t) s = s[e]
        if ('string' == typeof s && r) {
          let e = Object.entries(r)[0]
          return s.replace('['.concat(e[0], ']'), e[1])
        }
        return s
      }
      function l(e) {
        let { href: r, children: t, exact: o = !1 } = e,
          a = (0, i.usePathname)(),
          d = o ? a === r : a.startsWith(r)
        return (0, s.jsx)(n(), {
          href: r,
          className: 'text-sm transition-colors '.concat(
            d ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
          ),
          children: t
        })
      }
      function u() {
        return (0, s.jsx)('header', {
          className: 'border-b',
          children: (0, s.jsx)('div', {
            className: 'container mx-auto px-4 h-16 flex items-center justify-between',
            children: (0, s.jsxs)('div', {
              className: 'flex items-center gap-6',
              children: [
                (0, s.jsx)(n(), {
                  href: d('home'),
                  className: 'font-bold text-xl',
                  children: '\uD83E\uDD4A Boxing Directory'
                }),
                (0, s.jsxs)('nav', {
                  className: 'hidden md:flex items-center gap-4',
                  children: [
                    (0, s.jsx)(l, { href: d('website.list'), children: 'Boxers' }),
                    (0, s.jsx)(l, { href: '/blog', children: 'Blog' }),
                    (0, s.jsx)(l, { href: d('about'), children: 'About' }),
                    (0, s.jsx)(l, { href: d('search'), children: 'Search' })
                  ]
                })
              ]
            })
          })
        })
      }
    },
    3855: (e, r, t) => {
      Promise.resolve().then(t.bind(t, 3583)),
        Promise.resolve().then(t.bind(t, 9177)),
        Promise.resolve().then(t.bind(t, 8733)),
        Promise.resolve().then(t.bind(t, 9308)),
        Promise.resolve().then(t.bind(t, 8309)),
        Promise.resolve().then(t.t.bind(t, 7261, 23)),
        Promise.resolve().then(t.t.bind(t, 4760, 23)),
        Promise.resolve().then(t.t.bind(t, 3620, 23)),
        Promise.resolve().then(t.bind(t, 1874)),
        Promise.resolve().then(t.bind(t, 1996)),
        Promise.resolve().then(t.bind(t, 2144)),
        Promise.resolve().then(t.t.bind(t, 6635, 23)),
        Promise.resolve().then(t.bind(t, 8378))
    },
    6492: (e, r, t) => {
      t.d(r, { v: () => n }), t(1929), t(880), t(459)
      let s = { debug: 0, info: 1, warn: 2, error: 3 }
      class o {
        formatMessage(e, r) {
          let t = []
          return (
            (null == r ? void 0 : r.level) && t.push('['.concat(r.level.toUpperCase(), ']')),
            t.push(e),
            t.join(' ')
          )
        }
        shouldLog(e) {
          return 'error' === e || s[e] >= s.error
        }
        debug(e, r) {
          this.shouldLog('debug') && console.debug(this.formatMessage(e, { ...r, level: 'debug' }))
        }
        info(e, r) {
          this.shouldLog('info') && console.info(this.formatMessage(e, { ...r, level: 'info' }))
        }
        warn(e, r) {
          this.shouldLog('warn') && console.warn(this.formatMessage(e, { ...r, level: 'warn' }))
        }
        error(e, r) {
          var t
          let s = e instanceof Error ? e.message : e,
            o = e instanceof Error ? e.stack : void 0
          console.error(
            this.formatMessage(s, { ...r, level: 'error' }),
            null !== (t = null != o ? o : null == r ? void 0 : r.data) && void 0 !== t ? t : ''
          )
        }
      }
      let n = new o()
    },
    6511: (e, r, t) => {
      t.d(r, { $: () => d })
      var s = t(4568),
        o = t(9649),
        n = t(615)
      t(7620)
      var i = t(475)
      let a = (0, n.F)(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
        let { className: r, variant: t, size: n, asChild: d = !1, ...l } = e,
          u = d ? o.DX : 'button'
        return (0, s.jsx)(u, {
          'data-slot': 'button',
          className: (0, i.cn)(a({ variant: t, size: n, className: r })),
          ...l
        })
      }
    },
    6635: () => {},
    8378: (e, r, t) => {
      t.d(r, { SentryUserProvider: () => i })
      var s = t(4568),
        o = t(1651),
        n = t(7620)
      function i(e) {
        let { children: r } = e
        return (
          (0, n.useEffect)(() => {
            o.gV(null)
          }, []),
          (0, s.jsx)(s.Fragment, { children: r })
        )
      }
    },
    9177: (e, r, t) => {
      t.d(r, { ModeToggle: () => d })
      var s = t(4568),
        o = t(6511),
        n = t(1261),
        i = t(3672),
        a = t(8309)
      function d() {
        let { theme: e, setTheme: r } = (0, a.D)()
        return (0, s.jsxs)(o.$, {
          variant: 'ghost',
          size: 'icon',
          onClick: () => r('light' === e ? 'dark' : 'light'),
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
    var r = r => e((e.s = r))
    e.O(0, [640, 262, 874, 261, 323, 744, 631, 587, 315, 358], () => r(3855)), (_N_E = e.O())
  }
])
