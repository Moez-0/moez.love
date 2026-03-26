import { NavLink } from 'react-router-dom';
import { Home, Quote, Music, Camera, PenTool, Folder } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/thoughts', icon: PenTool, label: 'Thoughts' },
  { path: '/music', icon: Music, label: 'Music' },
  { path: '/moments', icon: Camera, label: 'Moments' },
  { path: '/projects', icon: Folder, label: 'Projects' },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-bg border-t border-border z-50 md:top-0 md:bottom-auto md:left-0 md:w-20 md:h-full md:border-t-0 md:border-r">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-full md:py-8 md:gap-8">
        <div className="hidden md:block mb-8">
          <span className="font-mono text-xl font-bold tracking-tighter">M.</span>
        </div>
        
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }: { isActive: boolean }) => `
              flex flex-col items-center justify-center gap-1 p-2 transition-all duration-200
              ${isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-mono uppercase tracking-widest md:hidden">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
