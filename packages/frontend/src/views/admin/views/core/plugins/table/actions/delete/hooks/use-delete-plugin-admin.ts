import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

// import { checkConnectionMutationApi } from '../../../../hooks/check-connection-mutation-api';
import { mutationApi } from './mutation-api';

export const useDeletePluginAdmin = ({ code }: { code: string }) => {
  const tCore = useTranslations('core.global.errors');

  const onSubmit = async () => {
    const mutation = await mutationApi({ code });

    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    // // Wait 3 seconds before reloading the page
    // await new Promise<void>(resolve =>
    //   setTimeout(async () => {
    //     const data = await checkConnectionMutationApi();

    //     if (data?.error) {
    //       toast.error(tCore('title'), {
    //         description: tCore('internal_server_error'),
    //       });

    //       resolve();
    //     }

    //     window.location.reload();
    //     resolve();
    //   }, 3000),
    // );
  };

  return {
    onSubmit,
  };
};
