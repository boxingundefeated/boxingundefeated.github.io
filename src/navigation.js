import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Boxing',
    //   links: [
    //     {
    //       text: 'Boxers',
    //       href: getPermalink('/boxers'),
    //     },
    //     {
    //       text: 'Divisions',
    //       href: getPermalink('/weight-classes'),
    //     },
    //     {
    //       text: 'Fights',
    //       href: getPermalink('/fights'),
    //     },
    //     {
    //       text: 'Schedule',
    //       href: getPermalink('/schedule'),
    //     },
    //     {
    //       text: 'Tickets',
    //       href: getPermalink('/tickets'),
    //     },
    //   ],
    // },
    {
      text: 'Videos',
      links: [
        {
          text: 'YouTube',
          href: 'https://youtube.com/@boxingundefeated',
          target: '_blank',
        },
        {
          text: 'Full Fights',
          href: 'https://youtube.com/@boxingundefeated-fightarchive',
          target: '_blank',
        },
      ],
    },
    {
      text: 'Content',
      links: [
        {
          text: 'Blog',
          href: getBlogPermalink(),
        },
        // {
        //   text: 'Glossary',
        //   href: getPermalink('/glossary'),
        // },
      ],
    },
   
  ],
  actions: [{ text: 'Subscribe', href: '/subscribe/', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'Website', href: 'https://boxingundefeated.com' },
        { text: 'About', href: '/about/' },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'Newsletter', href: '/subscribe/' },
        // { text: 'Forum', href: '#' },
        // { text: 'Community', href: '#' },
      ],
    },
    {
      title: 'Links',
      links: [
        { text: 'Medium', href: 'https://medium.com/boxing-undefeated', target: '_blank' },
        { text: 'Pages', href: 'https://boxingundefeated.pages.dev', target: '_blank' },
        { text: 'Github', href: 'https://boxingundefeated.github.io', target: '_blank' },
        { text: 'Substack', href: 'https://boxingundefeated.substack.com/', target: '_blank' },
        { text: 'Hashnode', href: 'https://boxingundefeated.hashnode.dev/', target: '_blank' },
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
        { text: 'Tags', href: '/tags/' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Free Stuff', href: 'https://stuff.boxingundefeated.com' },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://serp.ly/@boxingundefeated/twitter', target: '_blank' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://serp.ly/@boxingundefeated/instagram', target: '_blank' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/boxundefeated', target: '_blank' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://serp.ly/@boxingundefeated/youtube', target: '_blank' },
    { ariaLabel: 'Linkedin', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/company/boxingundefeated', target: '_blank' },
    { ariaLabel: 'TikTok', icon: 'tabler:brand-tiktok', href: 'https://tiktok.com/@boxundefeated', target: '_blank' },
    { ariaLabel: 'Medium', icon: 'tabler:brand-medium', href: 'https://medium.com/boxing-undefeated', target: '_blank' },
  ],
};
