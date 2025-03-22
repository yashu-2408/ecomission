
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import AuthForm from '@/components/auth/AuthForm';

const AdminAuth: React.FC = () => {
  return (
    <PageTransition>
      <AuthForm role="admin" title="Admin Portal Login" />
    </PageTransition>
  );
};

export default AdminAuth;
