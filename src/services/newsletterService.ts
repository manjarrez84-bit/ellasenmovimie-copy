import { supabase } from '@/lib/supabase';
import { Subscription } from '@/types';

export const createSubscription = async (email: string): Promise<Subscription> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{ email }])
    .select()
    .single();

  if (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }

  return data as Subscription;
};

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }

  return data as Subscription[];
};

export const deleteSubscription = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting subscription:', error);
    throw error;
  }
};