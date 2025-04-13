
import { ReactNode } from 'react';
import { PineLarge } from '@/components/icons/Pine';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-50 to-pine-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 flex flex-col items-center">
        <PineLarge className="h-16 w-16 text-forest-700 mb-4" />
        <h1 className="text-3xl font-bold text-forest-800">Sistema de Gestão de Resina</h1>
        <p className="text-forest-600 mt-2 text-center">
          Controle eficiente para plantio e extração de resina de pinus
        </p>
      </div>
      {children}
    </div>
  );
}
