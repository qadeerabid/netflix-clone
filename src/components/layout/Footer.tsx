'use client';

import Link from 'next/link';

const FOOTER_LINKS = [
  ['FAQ', 'Help Center', 'Account', 'Media Centre'],
  ['Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use'],
  ['Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
  ['Speed Test', 'Legal Notices', 'Only on Netflix'],
];

export function Footer() {
  return (
    <footer className="bg-netflix-bg text-gray-500 py-12 px-8 md:px-16 mt-8">
      <div className="max-w-5xl mx-auto">
        <p className="mb-6 text-sm">Questions? Call 1-800-NETFLIX</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {FOOTER_LINKS.map((column, colIdx) => (
            <ul key={colIdx} className="space-y-3">
              {column.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="text-xs">Netflix Clone &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
