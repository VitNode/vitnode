import type core from '@/src/plugins/core/langs/en.json';
import type admin from '@/src/plugins/admin/langs/en.json';
import type welcome from '@/src/plugins/welcome/langs/en.json';

// ! === IMPORT ===

type Messages = typeof core & typeof admin & typeof welcome; // ! === MODULE ===

declare global {
  interface IntlMessages extends Messages {}
}
