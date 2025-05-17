"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, User } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "タイムライン",
      path: "/timeline",
      icon: Home,
    },
    {
      name: "アイディア生成",
      path: "/ai",
      icon: Search,
    },

    {
      name: "プロフィール",
      path: "/profile/mainProfile",
      icon: User,
    },
  ];

  return (
    <header className="fixed bottom-0 w-full bg-orange-400 shadow-md dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex flex-col items-center justify-center"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-1 transition-all ${
                  isActive 
                    ? "bg-white dark:bg-gray-700 shadow-lg transform scale-110" 
                    : "bg-blue-100/60 hover:bg-white dark:bg-gray-700/50 dark:hover:bg-gray-700"
                }`}>
                  <item.icon 
                    size={22} 
                    className={`${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`} 
                  />
                </div>
                <span className={`text-xs ${
                  isActive 
                    ? "font-semibold text-purple-600 dark:text-purple-400" 
                    : "text-gray-600 dark:text-gray-300"
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}