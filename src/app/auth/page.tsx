// /app/auth/page.tsx

'use client';

import React from 'react';
import LoginRegister from '@/app/components/Log/LoginRegister';

const AuthPage: React.FC = () => {
  return (
    <div className="auth-page">
      <LoginRegister />
    </div>
  );
};

export default AuthPage;
