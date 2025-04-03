
import React from 'react';
import { Login } from '@/components/Login';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TaskProvider } from '@/contexts/TaskContext';

const MainContent = () => {
  const { authState } = useAuthContext();
  
  return (
    <div className="flex flex-col min-h-screen">
      {authState.isAuthenticated ? (
        <>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden flex flex-col">
            <Dashboard />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <MainContent />
      </TaskProvider>
    </AuthProvider>
  );
};

export default Index;
