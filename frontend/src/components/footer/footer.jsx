import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full h-[150px] bg-black/40 text-gray-400 py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Nome */}
        <div className="flex items-center gap-3">
          {/* Logo icona */}
          <span className="text-sm md:text-base">&copy; 2025 TerraQuake API</span>
        </div>

        {/* Link ai social */}
        <ul className="flex gap-5 text-xl">
          <li>
            <a
              href="https://www.linkedin.com/in/tuo-profilo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-purple-400 transition-colors"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tuo-username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-purple-400 transition-colors"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-purple-400 transition-colors"
            >
              <FaFacebook />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

