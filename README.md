[![pages-build-deployment](https://github.com/serpcompany/serpcompany.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/serpcompany/serpcompany.github.io/actions/workflows/pages/pages-build-deployment)

# README

## Configuration

### Site Settings

- Customize your metadata in `src/config.yaml`


### Deploying to github pages

**Settings:**

1. Github repository > settings > pages > deploy via: github actions

**Configuration:**

In `src/utils/config.ts` customize the values of this function by replacing:

`site: 'serpcompany.github.io',` and `base: 'serpcompany.github.io',`

```
const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: 'serpcompany.github.io',
    base: 'serpcompany.github.io',
    trailingSlash: true,


    googleSiteVerificationId: '',
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};
```
