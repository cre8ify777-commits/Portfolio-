'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
      {/* Logo / Name */}
      <div className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase pointer-events-auto cursor-pointer">
        Aditya
      </div>

      {/* Very subtle nav links */}
      <nav className="hidden md:flex items-center gap-12 font-medium text-sm tracking-widest text-neutral-300 pointer-events-auto">
        <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        <a href="#experience" className="hover:text-white transition-colors">EXPERIENCE</a>
        <a href="#skills" className="hover:text-white transition-colors">SKILLS & EXPERTISE</a>
        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
      </nav>
    </header>
  );
}
