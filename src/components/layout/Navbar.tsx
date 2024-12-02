import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../../types';

const navItems: NavItem[] = [
  { id: 'about', label: 'О нас', path: '/#about' },
  { id: 'team', label: 'Команда', path: '/#team' },
  { id: 'projects', label: 'Проекты', path: '/#projects' },
  { id: 'contact', label: 'Контакты', path: '/#contact' },
];

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar-fixed transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <motion.img
            src="logo.png"
            alt="Pulse Studio"
            className="h-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        <div className="space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-lg font-medium text-gray-100 hover:text-red-400 transition-all duration-300 relative group"
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"
                initial={false}
                animate={{ width: "0%" }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;