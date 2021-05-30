import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoBlack from '../images/LogoBlack';
import Button from './Button';
import SearchBox from './SearchBox';

function Header() {
  return (
    <div className="sticky top-0 bg-white w-full h-16 flex items-center px-5">
      <Link to="/" className="flex items-center">
        <LogoBlack width={32} height={32} />
        <div className="flex flex-col ml-3">
          <span className="font-bold leading-none text-sm">
            Unsplash
          </span>
          <span className="font-normal leading-none text-xs mt-1">
            Photos for everyone
          </span>
        </div>
      </Link>
      <div className="flex flex-grow ml-6">
        <SearchBox
          options={['wallpapers', 'work', 'way', 'nature', 'people']}
        />
      </div>
      <div>
        <div className="inline-flex items-center">
          <div className="px-3 mr-3 text-gray-500">
            <Link to="login">Login</Link>
          </div>
          <Button className="bg-green-500 text-white h-8 px-3 rounded-md">
            <Link to="register">Join Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
