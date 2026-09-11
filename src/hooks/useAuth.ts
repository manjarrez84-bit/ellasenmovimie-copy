"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, onAuthStateChange, signOut as authSignOut } from '@/services/forumService';
import { getUserProfile, autoAssignAdminRole } from '@/services/profileService';

interface AuthUser {
  id: string;
  email: string | null;
  role: 'admin' | 'user';
}

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const profile = await getUserProfile(currentUser.id);
        const role = profile?.role || 'user';

        // Auto-asignar rol admin al primer usuario
        if (role === 'user') {
          const wasPromoted = await autoAssignAdminRole(currentUser.id);
          if (wasPromoted) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              role: 'admin',
            });
            return;
          }
        }

        setUser({
          id: currentUser.id,
          email: currentUser.email,
          role,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = async () => {
    try {
      await authSignOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      fetchUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUser]);

  return {
    user,
    loading,
    signOut,
    isAdmin: user?.role === 'admin',
  };
};