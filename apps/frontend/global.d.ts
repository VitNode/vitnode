import type core from '@/plugins/core/langs/en.json';
import type welcome from '@/plugins/welcome/langs/en.json';
import type admin from '@/plugins/admin/langs/en.json';

type Messages = typeof core & typeof welcome & typeof admin;

declare global {
  interface IntlMessages extends Messages {}
}
