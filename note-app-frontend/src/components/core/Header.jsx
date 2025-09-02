import { useAuth } from '../../hooks/useAuth';
// import Logo from '../../assets/logo.svg'; // Un-comment if you want to use the logo
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();

  // Helper to get the first initial from the user's name
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
             {/* You can un-comment this line if you have a logo file */}
             {/* <img className="h-8 w-auto" src={Logo} alt="NoteApp" /> */}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              
              {/* --- THIS IS THE CORRECTED AVATAR LOGIC --- */}
              <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                {userInitial}
              </div>
              {/* ------------------------------------------- */}

              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Logout"
            >
              <FiLogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
