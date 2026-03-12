import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';

import headerLogo from '../../assets/Img/Logo-mobile.svg';
import headerSmall from '../../assets/Img/LogoSmall.svg';
import HamburgerMenu from '../../assets/Img/HamburgerMenu.svg';
import CloseIcon from '../../assets/Img/Close.svg';
import TwitterIcon from '../../assets/Img/Twitter.svg';
import InstagramIcon from '../../assets/Img/Instagram.svg';
import FacebookIcon from '../../assets/Img/Facebook.svg';
import YoutubeIcon from '../../assets/Img/Youtube.svg';

const socialMediaLinks = [
  { name: 'Twitter', icon: TwitterIcon, url: 'https://x.com/EcoEventsGC' },
  { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/eco_eventsgc/' },
  { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com/profile.php?id=61586499163420' },
  { name: 'YouTube', icon: YoutubeIcon, url: 'https://www.youtube.com/@EcoEventsGC' },
];

type HeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

export function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { logout, userData } = useContext(AuthContext)

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <header className="w-full bg-[#F8F9FA] border-b border-[#2E7D32]" style={{ fontFamily: 'Poppins, sans-serif'}}>
      <div className="max-w-7xl mx-auto flex justify-between px-6 pt-6 pb-6">

        {/* Logo */}
        <Link to="/about">
          <img src={headerLogo} className="hidden md:block w-24" alt="Eco Events Logo" aria-label="Eco Events Home"/>
          <img src={headerSmall} className="w-auto md:hidden" alt="Eco Events Logo" />
        </Link>

        {/* Desktop navigation */}
        <nav className="flex gap-10 font-medium pt-6.25 text-[16px] text-textDark no-underline" aria-label="Main navigation" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <div className="hidden md:flex gap-10">
            <Link to="/events" aria-label='Go to Events page'>Events</Link>
            <Link to="/create-event" aria-label="Go to Create Event page" >Create Event</Link>
            {userData?.role === 'admin' && <Link to="/admin" aria-label="Go to Admin page">Admin</Link>}
            <Link to="/login" onClick={logout} aria-label="Logout">Log out</Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden cursor-pointer" aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <img src={HamburgerMenu} alt="Open menu" className="w-6 h-6" />
          </button>
        </nav>

        {/* Mobile side menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <aside
              className="absolute top-0 right-0 w-64 h-full bg-[#3A5B3B] py-6 flex flex-col z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="self-end px-6 pt-6 cursor-pointer" aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <img src={CloseIcon} className="w-6 h-6 invert brightness-0" />
              </button>

              <div className="border-b border-white my-6"></div>

              {/* Mobile links */}
              <nav className="flex flex-col gap-4 text-white text-[18px] px-6 pt-14">
                <Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link>
                <Link to="/create-event" onClick={() => setIsMenuOpen(false)}>Create Event</Link>
                {userData?.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
                <Link to="/login" onClick={() => { setIsMenuOpen(false); logout(); }} aria-label="Logout">Log out</Link>
              </nav>

              {/* Social footer */}
              <div className="fixed bottom-8 px-6 flex flex-col gap-4">
                <h2 className="text-[18px] font-medium text-white">Stay in Touch</h2>
                <nav className="flex gap-6"  aria-label="Social media links">
                  {socialMediaLinks.map((social) => (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="hover:opacity-70"
                    > 
                      <img
                        src={social.icon} alt={social.name}
                        className="w-4 h-4 invert brightness-0"
                      />
                    </a>
                     
                      
                     
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
}

