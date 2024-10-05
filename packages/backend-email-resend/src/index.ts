import { Resend } from 'resend';

export const emailSenderResend = ({ api_key }: { api_key?: string }) => {
  const resend = new Resend(api_key);

  return async ({
    to,
    subject,
    html,
    from,
    site_short_name,
  }: {
    from: string;
    html: string;
    site_short_name: string;
    subject: string;
    to: string;
  }): Promise<void> => {
    const provider = await resend.emails.send({
      from: `${site_short_name} <${from}>`,
      to,
      subject,
      html,
    });

    if (provider.error) {
      throw new Error(`[${provider.error.name}]: ${provider.error.message}`);
    }
  };
};
