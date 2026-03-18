import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col font-sans transition-colors duration-300">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2.5 rounded-xl">
                <BookOpen className="text-primary w-8 h-8" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">Books Store</span>
            </div>
            <div className="flex items-center gap-8">
              <nav className="flex space-x-8">
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    `inline-flex items-center px-2 py-6 border-b-4 text-lg font-medium transition-all ${
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-200 dark:hover:border-gray-700'
                    }`
                  }
                >
                  Books
                </NavLink>
                <NavLink
                  to="/authors"
                  className={({ isActive }) =>
                    `inline-flex items-center px-2 py-6 border-b-4 text-lg font-medium transition-all ${
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-200 dark:hover:border-gray-700'
                    }`
                  }
                >
                  Authors
                </NavLink>
              </nav>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all border border-gray-200 dark:border-gray-700"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex justify-center items-center">
          <p className="text-center text-base text-gray-400 dark:text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} Books Store &bull; Thoughtfully Crafted
          </p>
        </div>
      </footer>
    </div>
  );
}
