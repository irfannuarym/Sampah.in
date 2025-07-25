'use client'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Logo from '../assets/logo.svg';
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  UserPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import FiturSection from '../components/Home/FiturSection';
import AlurKerjaSection from '../components/Home/AlurKerjaSection';
import CTASection from '../components/Home/CTASection';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuthStore();

  return (
    <div>
      <header className="bg-green-500 shadow-md sticky top-0 z-10">
        <nav aria-label="Global" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Sampah.in</span>
              <img
                alt="Logo Sampah.in"
                src={Logo}
                className="h-20 w-auto bg-white rounded-2xl"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-6">
            <Link to="/" className="flex items-center text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1">
              Beranda
            </Link>
            <div className="border-l border-white/60 h-6 self-center" />
            <Link to="#fitur" className="flex items-center text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1">
              Fitur
            </Link>
            <div className="border-l border-white/60 h-6 self-center" />
            <Link to="/cara-kerja" className="flex items-center text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1">
              Cara Kerja
            </Link>
            <div className="border-l border-white/60 h-6 self-center" />
            <Link to="/tentang-kami" className="flex items-center text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1">
              Tentang Kami
            </Link>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-semibold text-gray-900">{user.username}</span>
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-green-600 hover:text-green-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1">
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                  Login
                </Link>
                <div className="border-l border-white/60 h-6 self-center" />
                <Link to="/register" className="flex items-center gap-2 text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1">
                  <UserPlusIcon className="w-5 h-5" />
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Sampah.in</span>
                <img
                  alt="Logo Sampah.in"
                  src={Logo}
                  className="h-20 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Beranda
                  </Link>
                  <Link
                    to="#fitur"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Fitur
                  </Link>
                  <Link
                    to="/cara-kerja"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Cara Kerja
                  </Link>
                  <Link
                    to="/tentang-kami"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Tentang Kami
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        <HeroSection />
        <StatsSection />
        <FiturSection />
        <AlurKerjaSection />
        <CTASection />
      </main>
    </div>
  );
}
