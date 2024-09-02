'use client';

import React, { forwardRef, useRef } from 'react';
import { AnimatedBeam } from './animated-beam';
import { cn } from '@/utils/classnames';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import {
  AtSign,
  Database,
  Languages,
  Paintbrush,
  Plug,
  Search,
  ShieldCheck,
  Sparkle,
  Users,
} from 'lucide-react';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-card z-10 flex size-12 items-center justify-center rounded-md border p-3',
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = 'Circle';

export function AnimatedBeamHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden sm:max-w-md"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Users />
          </Circle>
          <Circle ref={div8Ref}>
            <AtSign />
          </Circle>
          <Circle ref={div5Ref}>
            <Plug />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Languages />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <Image
              alt="VitNode"
              src={logo}
              className="w-10"
              aria-label="VitNode"
            />
          </Circle>
          <Circle ref={div6Ref}>
            <Paintbrush />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <ShieldCheck />
          </Circle>
          <Circle ref={div9Ref}>
            <Sparkle />
          </Circle>
          <Circle ref={div7Ref}>
            <Database />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div8Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div9Ref}
        curvature={75}
        toRef={div4Ref}
      />
    </div>
  );
}
