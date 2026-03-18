import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary w-6 h-6" />
              <span className="font-semibold text-lg tracking-tight">Books Store</span>
            </div>
            <nav className="flex space-x-8">
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Books
              </NavLink>
              <NavLink
                to="/authors"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Authors
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Books Store. Keep it simple.
          </p>
        </div>
      </footer>
    </div>
  );
}
