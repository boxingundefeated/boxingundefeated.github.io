// src/navigation.js
import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Reviews',
      links: [
        {
          text: '1',
          href: getPermalink('/category/reviews/'),
        },
        {
          text: '2',
          href: getPermalink('/category/reviews/2/'),
        },
        {
          text: '3',
          href: getPermalink('/category/reviews/3/'),
        },
      ],
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Links',
      links: [
        { text: 'Website',href: 'https://boxingundefeated.com' },
        { text: 'boxingundefeated.github.io',href: 'https://boxingundefeated.github.io' },
        { text: 'boxingundefeated.pages.dev',href: 'https://boxingundefeated.pages.dev' }
      ], 
    },
    {
      title: 'Tags',
      links: [
        { text: 'Tags', href: '/tags/' },
      ],
    },
    {
      title: 'Boring Stuff',
      links: [
        { text: 'Privacy Policy', href: '/privacy/' },
        { text: 'Terms & Conditions', href: '/terms/' },
        { text: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
        { text: 'DMCA', href: '/dmca/' },
        { text: 'Archive', href: '/archive/' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [  
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://serp.ly/@boxundefeated/twitter', target: '_blank' },
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://serp.ly/@boxundefeated/instagram',
      target: '_blank',
    },
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://serp.ly/@boxundefeated/facebook',
      target: '_blank',
    },
    {
      ariaLabel: 'YouTube',
      icon: 'tabler:brand-youtube',
      href: 'https://serp.ly/@boxundefeated/youtube',
      target: '_blank',
    },
    {
      ariaLabel: 'Linkedin',
      icon: 'tabler:brand-linkedin',
      href: 'https://serp.ly/@boxundefeated/linkedin',
      target: '_blank',
    },
    {
      ariaLabel: 'TikTok',
      icon: 'tabler:brand-tiktok',
      href: 'https://serp.ly/@boxundefeated/tiktok',
      target: '_blank',
    },
  ],
};
