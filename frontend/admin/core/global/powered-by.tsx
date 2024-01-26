/**
 * Thanks for using VitNode!
 *
 * ! This is an open source project, you can use it for free.
 * ! If you want to support us, please consider donating.
 * ! You can remove this component if you want, but we will be very grateful if you leave it.
 * ! Thank you for your support!
 */

interface Props {
  className?: string;
}

export const PoweredByVitNode = ({ className }: Props) => {
  return (
    <a className={className} href="https://vitnode.com/" rel="noopener noreferrer" target="_blank">
      Powered by VitNode
    </a>
  );
};
