'use client';

import corePackages from '~/package.json';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Tabs } from '@/components/tabs/tabs';
import { HeaderContent } from '@/components/header-content/header-content';
import { Editor } from '@/components/editor/editor';

import { Input } from '../../../../components/ui/input';

export const DashboardCoreAdminView = () => {
  const t = useTranslations('core');
  const [activeTab, setActiveTab] = useState('account');

  return (
    <>
      <HeaderContent h1="VitNode" desc={t('version', { version: corePackages.version })} />

      <Tabs
        items={[
          {
            id: 'account',
            text: 'Account',
            active: activeTab === 'account',
            onClick: () => setActiveTab('account')
          },
          {
            id: 'password',
            text: 'Password',
            active: activeTab === 'password',
            onClick: () => setActiveTab('password')
          },
          {
            id: 'test',
            text: 'Test',
            active: activeTab === 'test',
            onClick: () => setActiveTab('test')
          },
          {
            id: 'test2',
            text: 'Test2',
            active: activeTab === 'test2',
            onClick: () => setActiveTab('test2')
          },
          {
            id: 'test3',
            text: 'Test3',
            active: activeTab === 'test3',
            onClick: () => setActiveTab('test3')
          }
        ]}
      />
      <br />
      <br />

      <Input />

      <br />

      <Editor id="text_editor_vitnode" />
    </>
  );
};
