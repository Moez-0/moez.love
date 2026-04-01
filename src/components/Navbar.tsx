import { NavLink } from 'react-router-dom';
import { Home, Music, Camera, PenTool, Folder } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/thoughts', icon: PenTool, label: 'Thoughts' },
  { path: '/music', icon: Music, label: 'Music' },
  { path: '/moments', icon: Camera, label: 'Moments' },
  { path: '/projects', icon: Folder, label: 'Projects' },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 md:top-4 md:bottom-4 md:left-4 md:w-20 md:translate-x-0">
      <div className="pixel-panel flex h-16 items-center justify-around bg-surface/95 px-2 md:h-full md:flex-col md:justify-start md:gap-6 md:py-7">
        <div className="hidden md:mb-2 md:block">
          <span className="font-mono text-xl font-bold text-text-primary">M.</span>
        </div>
        
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }: { isActive: boolean }) => `
              flex flex-col items-center justify-center gap-1 border-2 px-3 py-2 text-[11px] transition-all duration-200 md:w-14 md:px-2
              ${isActive ? 'border-text-primary bg-text-primary text-bg' : 'border-border bg-bg text-text-secondary hover:border-text-secondary hover:text-text-primary'}
            `}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Icon size={19} strokeWidth={isActive ? 2.4 : 2.1} />
                <span className="text-[10px] font-mono uppercase tracking-widest md:hidden">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
