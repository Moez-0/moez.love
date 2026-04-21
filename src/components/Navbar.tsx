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
    <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 md:top-6 md:bottom-6 md:left-5 md:w-20 md:translate-x-0">
      <div className="pixel-panel flex h-16 items-center justify-between bg-surface/95 px-2 md:h-full md:flex-col md:justify-center md:gap-5 md:px-2 md:py-6">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }: { isActive: boolean }) => `
              flex min-w-0 flex-col items-center justify-center gap-1 px-3 py-2 text-[11px] transition-all duration-200 md:w-14 md:px-2
              ${isActive ? 'border border-text-primary bg-text-primary text-bg' : 'border border-transparent text-text-secondary hover:border-border hover:bg-bg hover:text-text-primary'}
            `}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Icon size={19} strokeWidth={isActive ? 2.4 : 2.1} />
                <span className="text-[10px] tracking-[0.12em] md:hidden">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
