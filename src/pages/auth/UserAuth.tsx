
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import AuthForm from '@/components/auth/AuthForm';

const UserAuth: React.FC = () => {
  return (
    <PageTransition>
      <AuthForm role="user" title="User Portal Login" />
    </PageTransition>
  );
};

export default UserAuth;
