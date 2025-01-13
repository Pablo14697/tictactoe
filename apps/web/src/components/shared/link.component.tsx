import { Link as LinkRouterDom } from 'react-router-dom';

const variants = {
  sm: 'rounded-2 bg-custom-gray px-8 font-bold text-base text-white leading-[38.73px] hover:opacity-80',
  md: 'rounded-2 bg-custom-green px-8 py-3 font-bold text-white text-xl leading-[38.73px] hover:opacity-80',
};

export const Link = ({ variant, children, to }) => (
  <LinkRouterDom className={variants[variant]} to={to}>
    {children}
  </LinkRouterDom>
);
