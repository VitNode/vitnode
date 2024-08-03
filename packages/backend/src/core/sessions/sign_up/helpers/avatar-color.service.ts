import { Injectable } from '@nestjs/common';

import { convertColor } from '@/functions';

@Injectable()
export class AvatarColorService {
  private readonly hRange = [0, 360];
  private readonly sRange = [50, 75];
  private readonly lRange = [25, 60];

  private readonly getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    return hash;
  };

  private readonly normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  private readonly generateHSLFromName = (name: string) => {
    const hash = this.getHashOfString(name);
    const h = this.normalizeHash(hash, this.hRange[0], this.hRange[1]);
    const s = this.normalizeHash(hash, this.sRange[0], this.sRange[1]);
    const l = this.normalizeHash(hash, this.lRange[0], this.lRange[1]);

    return [h, s, l];
  };

  generateAvatarColor = (name: string): string => {
    const hslName = this.generateHSLFromName(name);
    const rgb = convertColor.hslToRgb(hslName[0], hslName[1], hslName[2]);

    return `${rgb.r},${rgb.g},${rgb.b}`;
  };
}
