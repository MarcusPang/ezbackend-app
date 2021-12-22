import Link from 'next/link';
import { SVGProps } from 'react';
import {
  CompassIcon,
  HeartIcon,
  HomeIcon,
  MessageIcon,
  PlusIcon,
  SearchIcon,
} from '../Icons';
import HeaderAvatar from './Avatar';

const icons: {
  href: string;
  alt: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}[] = [
  {
    href: '/',
    alt: 'home',
    icon: HomeIcon,
  },
  {
    href: '/messages',
    alt: 'messages',
    icon: MessageIcon,
  },
  {
    href: '/upload',
    alt: 'upload',
    icon: PlusIcon,
  },
  {
    href: '/search',
    alt: 'search',
    icon: CompassIcon,
  },
  {
    href: '/liked',
    alt: 'liked photos',
    icon: HeartIcon,
  },
];

const Header = () => {
  return (
    <header className="navbar sticky top-0 shadow-lg bg-neutral text-neutral-content min-h-16 z-50 mb-8">
      <div className="mx-auto max-w-screen-xl w-full">
        <div className="items-center flex-1 px-2 mx-2 lg:flex">
          <span className="text-lg font-bold">
            <Link href="/">sample</Link>
          </span>
        </div>
        <div className="flex-1 lg:flex-none rounded-lg mr-1">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <SearchIcon width={24} height={24} />
          </button>
        </div>
        {icons.map((icon) => (
          <div className="flex-none" key={icon.alt}>
            <Link href={icon.href} passHref>
              <a className="btn btn-square btn-ghost">
                <icon.icon width={24} height={24} />
              </a>
            </Link>
          </div>
        ))}
        <div className="flex-none">
          <HeaderAvatar />
        </div>
      </div>
    </header>
  );
};
export default Header;
