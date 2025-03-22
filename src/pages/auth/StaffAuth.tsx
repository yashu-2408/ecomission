
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import AuthForm from '@/components/auth/AuthForm';

const StaffAuth: React.FC = () => {
  return (
    <PageTransition>
      <AuthForm role="staff" title="Staff Portal Login" />
    </PageTransition>
  );
};

export default StaffAuth;
