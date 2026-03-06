import TwitterIcon from '../../assets/Img/Twitter.svg'
import InstagramIcon from '../../assets/Img/Instagram.svg'
import FacebookIcon from '../../assets/Img/Facebook.svg'
import YoutubeIcon from '../../assets/Img/Youtube.svg'
import FaviconIcon from '../../../public/favicon.svg'

const socialMediaLinks = [
  { name: 'Twitter', icon: TwitterIcon, url: 'https://x.com/EcoEventsGC' },
  { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/eco_eventsgc/' },
  { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com/profile.php?id=61586499163420' },
  { name: 'YouTube', icon: YoutubeIcon, url: 'https://www.youtube.com/@EcoEventsGC' },
]

export function Footer() {
  return (
    <footer className="hidden md:flex flex-col items-center py-6 bg-[#f8f9fa] border-t border-[#2e7d32]">
      <div className="relative mb-[22px] pl-6">
        <img
          src={FaviconIcon}
          alt=""
          className="absolute -top-4 -left-2 w-10 h-10"
        />
        <h2
          className="text-[32px] font-semibold text-[#1f1f1f]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Stay in Touch
        </h2>
      </div>

      <nav className="flex items-center gap-[44px]" aria-label="Social media links">
        {socialMediaLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="transition-opacity hover:opacity-70"
          >
            <img src={social.icon} alt={social.name} className="w-7 h-7" />
          </a>
        ))}
      </nav>
    </footer>
  )
}
