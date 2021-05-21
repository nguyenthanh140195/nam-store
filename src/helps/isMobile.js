/* eslint-disable-file */
/**
 * # Checks whether running on a mobile device according to browser data.
 * Functions (each returns bool):
 * * Android
 * * BlackBerry
 * * iPhone
 * * iPod
 * * iPad
 * * iOS
 * * Opera
 * * Windows
 * * Kindle Fire
 * * any
 * @example
 * isMobile.Android() => true/false
 * isMobile.iOS() => true/false
 * isMobile.any() => true/false
 * isMobile.KindleFire() => true/false
 * isMobile.BlackBerry() => true/false
 */

 const isMobile = {
    getUserAgent: () => navigator.userAgent,
    Android() {
      return /Android/i.test(isMobile.getUserAgent()) && !isMobile.Windows();
    },
    BlackBerry() {
      return /BlackBerry|BB10|PlayBook/i.test(isMobile.getUserAgent());
    },
    iPhone() {
      return /iPhone/i.test(isMobile.getUserAgent()) && !isMobile.iPad() && !isMobile.Windows();
    },
    iPod() {
      return /iPod/i.test(isMobile.getUserAgent());
    },
    iPad() {
      return /iPad/i.test(isMobile.getUserAgent());
    },
    iOS() {
      return isMobile.iPad() || isMobile.iPod() || isMobile.iPhone();
    },
    Opera() {
      return /Opera Mini/i.test(isMobile.getUserAgent());
    },
    Windows() {
      return /Windows Phone|IEMobile|WPDesktop/i.test(isMobile.getUserAgent());
    },
    KindleFire() {
      return /Kindle Fire|Silk|KFAPWA|KFSOWI|KFJWA|KFJWI|KFAPWI|KFAPWI|KFOT|KFTT|KFTHWI|KFTHWA|KFASWI|KFTBWI|KFMEWI|KFFOWI|KFSAWA|KFSAWI|KFARWI/i.test(
        isMobile.getUserAgent()
      );
    },
    any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };
  
  export default isMobile;
  
  export function isScreenMobile() {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const x = e.clientWidth || g.clientWidth || w.innerWidth;
    return isMobile.any() || x <= 480;
  }
  