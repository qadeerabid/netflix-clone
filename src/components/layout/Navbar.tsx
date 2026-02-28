'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { useProfileStore } from '@/stores/profileStore';
import { ROUTES } from '@/constants';

const NAV_LINKS = [
  { href: ROUTES.BROWSE, label: 'Home' },
  { href: ROUTES.TV, label: 'TV Shows' },
  { href: ROUTES.MOVIES, label: 'Movies' },
  { href: ROUTES.LATEST, label: 'New & Popular' },
  { href: ROUTES.MY_LIST, label: 'My List' },
];

export function Navbar() {
  const isAtTop = useScrollTop(50);
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuthStore();
  const { isSearchOpen, setSearchOpen, setSearchQuery, searchQuery } = useUIStore();
  const { activeProfile } = useProfileStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      router.push(ROUTES.SEARCH);
    }
  }, [setSearchQuery, router]);

  const handleSignOut = () => {
    signOut();
    router.push(ROUTES.HOME);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isAtTop ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-[#141414]'
      }`}
    >
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={isAuthenticated ? ROUTES.BROWSE : ROUTES.HOME} className="flex-shrink-0">
          <span className="text-netflix-red font-black text-3xl tracking-tight">NETFLIX</span>
        </Link>

        {isAuthenticated ? (
          <>
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-4 ml-8">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white text-sm transition">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white ml-4" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <FiChevronDown className={`w-5 h-5 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Right Side */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Search */}
              <div className="flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      placeholder="Titles, people, genres"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="bg-black/80 border border-white text-white placeholder-gray-400 px-3 py-1 text-sm focus:outline-none"
                      autoFocus
                    />
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setSearchOpen(!isSearchOpen)}
                  className="text-white p-1 hover:text-gray-300 transition"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>

              {/* Notifications */}
              <button className="text-white hover:text-gray-300 transition hidden sm:block">
                <FiBell className="w-5 h-5" />
              </button>

              {/* Profile */}
              <div className="relative" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                <button className="flex items-center gap-1">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: activeProfile?.color || '#E50914' }}
                  >
                    {activeProfile?.avatar || 'U'}
                  </div>
                  <FiChevronDown className={`text-white w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-gray-700 rounded shadow-xl py-2"
                    >
                      <Link href={ROUTES.PROFILES} className="block px-4 py-2 text-sm text-gray-300 hover:text-white transition">
                        Switch Profiles
                      </Link>
                      <Link href={ROUTES.ACCOUNT} className="block px-4 py-2 text-sm text-gray-300 hover:text-white transition">
                        Account
                      </Link>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white transition"
                      >
                        Sign out of Netflix
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 ml-auto">
            <Link href={ROUTES.LOGIN}>
              <button className="bg-netflix-red text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && isAuthenticated && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#141414] border-t border-gray-800 overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-300 hover:text-white text-sm border-b border-gray-800 transition"
                onClick={() => setShowMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
