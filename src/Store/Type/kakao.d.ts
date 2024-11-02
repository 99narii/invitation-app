declare global {
    interface Window {
      kakao: {
        maps: {
          LatLng: new (lat: number, lng: number) => any;
          Map: new (container: HTMLElement, options: { center: LatLng; level: number }) => any;
        };
      };
    }
  }
  
  export {};
  