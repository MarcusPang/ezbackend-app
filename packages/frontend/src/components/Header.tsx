import Image from 'next/image';
import Link from 'next/link';
import { headerItems, userDropdownLinks } from '../constants/links';
import useUser from '../hooks/useUser';

const Header = () => {
  const user = useUser();

  return (
    <header className="navbar mb-2 shadow-lg bg-neutral text-neutral-content min-h-16">
      <div className="items-center flex-1 px-2 mx-2 lg:flex">
        <span className="text-lg font-bold">
          <Link href="/">talkMore</Link>
        </span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          {headerItems.map((item) => (
            <div className="btn btn-ghost btn-md rounded-btn" key={item.name}>
              <Link href={item.link}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 lg:flex-none rounded-lg">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-none">
        <div className="avatar dropdown dropdown-end">
          <div
            tabIndex={0}
            className="rounded-full w-9 h-9 m-1 relative hover:cursor-pointer"
          >
            {user ? (
              <Image
                alt="avatar"
                src={user.googleData.photos[0].value}
                layout="fill"
              />
            ) : (
              <svg
                width="36"
                height="36"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 00-4.193 9.494A4.971 4.971 0 017.5 9.025c1.762 0 3.31.916 4.193 2.296A5.673 5.673 0 007.5 1.827zm3.482 10.152A4.023 4.023 0 007.5 9.975a4.023 4.023 0 00-3.482 2.004A5.648 5.648 0 007.5 13.173c1.312 0 2.52-.446 3.482-1.194zM5.15 6.505a2.35 2.35 0 114.7 0 2.35 2.35 0 01-4.7 0zm2.35-1.4a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"
                  fill="white"
                />
              </svg>
            )}
          </div>
          <ul
            tabIndex={0}
            className="p-2 menu dropdown-content bg-base-100 rounded-lg shadow-md w-40"
          >
            {userDropdownLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
            {user ? (
              <li>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/user/auth/google/logout'
                  }
                >
                  Log out
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/user/auth/google/login'
                  }
                >
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
