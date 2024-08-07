import type core from '../../apps/frontend/plugins/core/langs/en.json';
import type admin from '../../apps/frontend/plugins/admin/langs/en.json';

type Messages = typeof core & typeof admin;

declare global {
  interface IntlMessages extends Messages {}
}
