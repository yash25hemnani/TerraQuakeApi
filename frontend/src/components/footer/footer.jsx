import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className='bg-gradient-to-b from-violet-950 to-black text-slate-300 py-10 mt-20'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

        {/* Logo + Description */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-3'>TerraQuake API</h2>
          <p className='text-sm leading-relaxed'>
            Open-source project providing reliable earthquake data for
            developers, researchers, and communities.
          </p>
        </div>

        {/* Navigation Link */}
        <div>
          <h3 className='text-white font-semibold mb-3'>Navigation</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='/'
                className='hover:text-violet-400 transition'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='/about'
                className='hover:text-violet-400 transition'
              >
                About
              </a>
            </li>
            <li>
              <a
                href='/docs'
                className='hover:text-violet-400 transition'
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href='/contribute'
                className='hover:text-violet-400 transition'
              >
                Contribute
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className='text-white font-semibold mb-3'>Resources</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='https://github.com/nagcas/TerraQuakeApi'
                target='_blank'
                className='hover:text-violet-400 transition'
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href='/faq'
                className='hover:text-violet-400 transition'
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='hover:text-violet-400 transition'
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social / Sponsor */}
        <div>
          <h3 className='text-white font-semibold mb-3'>Connect</h3>
          <div className='flex space-x-4'>
            <a
              href='https://twitter.com'
              target='_blank'
              className='hover:text-violet-400 transition'
            >
              <FaXTwitter />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              className='hover:text-violet-400 transition'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://github.com'
              target='_blank'
              className='hover:text-violet-400 transition'
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright + Extended License */}
      <div className='border-t border-white/10 mt-10 pt-6 text-center text-sm text-slate-400 space-y-4'>
        <p>© {new Date().getFullYear()} TerraQuake API · All rights reserved</p>
        <p className='max-w-3xl mx-auto leading-relaxed px-4'>
          TerraQuake API is free software: you can redistribute it and/or modify
          it under the terms of the{' '}
          <a
            href='https://www.gnu.org/licenses/agpl-3.0.html'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-violet-400 transition'
          >
            GNU Affero General Public License
          </a>{' '}
          as published by the Free Software Foundation, either version 3 of the
          License, or (at your option) any later version.
        </p>
      </div>
    </footer>
  );
}
