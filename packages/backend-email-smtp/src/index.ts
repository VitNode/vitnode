import * as nodemailer from 'nodemailer';

export const emailSMTP = ({
  host = '',
  port,
  secure,
  user,
  password,
  from = '',
}: {
  from: string | undefined;
  host: string | undefined;
  password?: string;
  port?: string;
  secure?: boolean;
  user: string | undefined;
}) => {
  return async ({
    to,
    subject,
    html,
    site_short_name,
  }: {
    html: string;
    site_short_name: string;
    subject: string;
    to: string;
  }): Promise<void> => {
    const transporter = nodemailer.createTransport(
      {
        host,
        port: port ? +port : 587,
        secure: secure ?? false,
        auth: {
          user,
          pass: password,
        },
      },
      {
        from: {
          name: site_short_name,
          address: from,
        },
      },
    );

    await transporter.sendMail({
      to,
      subject,
      html,
    });
  };
};
