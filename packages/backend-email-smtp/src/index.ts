import * as nodemailer from 'nodemailer';

export const emailSMTPResend = ({
  host,
  port,
  secure,
  user,
  password,
}: {
  host?: string;
  password?: string;
  port?: string;
  secure?: boolean;
  user?: string;
}) => {
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
