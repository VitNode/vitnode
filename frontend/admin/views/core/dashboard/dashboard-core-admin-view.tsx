'use client';

import corePackages from '~/package.json';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Tabs } from '@/components/tabs/tabs';
import { HeaderContent } from '@/components/header-content/header-content';
import { TabsTrigger } from '@/components/tabs/tabs-trigger';

export const DashboardCoreAdminView = () => {
  const t = useTranslations('core');
  const [activeTab, setActiveTab] = useState('account');

  return (
    <>
      <HeaderContent h1="VitNode" desc={t('version', { version: corePackages.version })} />

      <Tabs>
        <TabsTrigger
          id="account"
          active={activeTab === 'account'}
          onClick={() => setActiveTab('account')}
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          id="password"
          active={activeTab === 'password'}
          onClick={() => setActiveTab('password')}
        >
          Password
        </TabsTrigger>
        <TabsTrigger id="test" active={activeTab === 'test'} onClick={() => setActiveTab('test')}>
          Test
        </TabsTrigger>
        <TabsTrigger
          id="test2"
          active={activeTab === 'test2'}
          onClick={() => setActiveTab('test2')}
        >
          Test2
        </TabsTrigger>
        <TabsTrigger
          id="test3"
          active={activeTab === 'test3'}
          onClick={() => setActiveTab('test3')}
        >
          Test3
        </TabsTrigger>
      </Tabs>
    </>
  );
};
