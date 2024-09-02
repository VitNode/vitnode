import { CarouselPreviewHome } from './carousel';

export const PreviewHome = () => {
  return (
    <div className="bg-card border-y shadow-sm">
      <div className="container my-16 flex max-w-3xl flex-col items-center gap-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Check How <span className="text-primary">VitNode</span> Look
        </h2>

        <CarouselPreviewHome />
      </div>
    </div>
  );
};
