import Image from 'next/image';
import Link from 'next/link';
import { userDropdownLinks } from '../../constants/sampleData';
import useUser from '../../hooks/useUser';

const HeaderAvatar = () => {
  const { user, isLoading } = useUser();

  let icon: JSX.Element, dropdownContent: JSX.Element | undefined;

  if (!isLoading && user) {
    icon = (
      <Image
        alt="avatar"
        className="hover:opacity-70 transition-opacity ease-in-out"
        src={user.googleData.photos[0].value}
        layout="fill"
      />
    );
    dropdownContent = (
      <ul
        tabIndex={0}
        className="p-2 menu dropdown-content bg-base-200 rounded-lg shadow-xl w-40"
      >
        <li>
          <Link href={'/profile/' + user.id}>Profile</Link>
        </li>
        {userDropdownLinks.map((item) => (
          <li key={item.name}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
        <li>
          <Link
            href={
              process.env.NEXT_PUBLIC_BACKEND_URL + '/user/auth/google/logout'
            }
            passHref
          >
            <a>Log out</a>
          </Link>
        </li>
      </ul>
    );
  } else {
    icon = (
      <Link
        passHref
        href={process.env.NEXT_PUBLIC_BACKEND_URL + '/user/auth/google/login'}
      >
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
      </Link>
    );
  }
  return (
    <div className="avatar dropdown dropdown-end">
      <div
        tabIndex={0}
        className="rounded-full w-9 h-9 m-1 relative hover:cursor-pointer"
      >
        {icon}
      </div>
      {dropdownContent}
    </div>
  );
};
export default HeaderAvatar;
