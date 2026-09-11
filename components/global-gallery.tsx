'use client';
/* oxlint-disable nextjs/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';
type Labels = { gallery: string; slide: string; previous: string; next: string; pause: string; play: string; imageConcept: string };
export function GlobalGallery({ images, captions, labels, rtl = false }: { images: string[]; captions: string[]; labels: Labels; rtl?: boolean }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => { setReduced(media.matches); if (media.matches) setPaused(true); };
    const visibility = () => setForeground(document.visibilityState === 'visible');
    motion(); visibility(); setReady(true);
    media.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    return () => { observer.disconnect(); media.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (!api) return;
    const select = () => {
      const index = api.selectedScrollSnap(); setSelected(index);
      setLoaded(previous => new Set([...previous, index, (index + 1) % images.length, (index + images.length - 1) % images.length]));
    };
    const interact = () => setPaused(true);
    select(); api.on('select', select); api.on('pointerDown', interact);
    return () => { api.off('select', select); api.off('pointerDown', interact); };
  }, [api, images.length]);
  const playing = ready && !paused && visible && foreground && !hovered;
  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setInterval(() => api.scrollNext(reduced), 3000);
    return () => window.clearInterval(timer);
  }, [api, playing, reduced]);
  const move = (next: boolean) => { setPaused(true); if (next) api?.scrollNext(reduced); else api?.scrollPrev(reduced); };
  return <div ref={region} className="global-gallery" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPaused(true)}>
    <Carousel opts={{ loop: true, direction: rtl ? 'rtl' : 'ltr' }} setApi={setApi} aria-label={labels.gallery}
      onKeyDownCapture={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(rtl ? event.key === 'ArrowLeft' : event.key === 'ArrowRight'); } }}>
      <CarouselContent className="global-gallery-track">
        {images.map((name, index) => <CarouselItem key={name} className="global-gallery-slide" aria-label={`${labels.slide} ${index + 1} / ${images.length}`} aria-hidden={selected !== index}>
          <div className="global-gallery-image">
            {loaded.has(index) && <img src={`/brand/global/${name}-1280.webp`} srcSet={`/brand/global/${name}-768.webp 768w, /brand/global/${name}-1280.webp 1280w`} sizes="(max-width: 760px) 86vw, 44vw" width={1536} height={1024} alt={`${captions[index]} · ${labels.imageConcept}`} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'low'} decoding="async" />}
          </div>
        </CarouselItem>)}
      </CarouselContent>
      <div className="global-gallery-bottom">
        <div className="global-gallery-caption" aria-live={paused ? 'polite' : 'off'} aria-atomic="true"><span className="english-label" dir="ltr">{String(selected + 1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}</span><span>{captions[selected]}</span></div>
        <div className="global-gallery-controls">
          <button type="button" aria-label={labels.previous} onClick={() => move(false)}>{rtl ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}</button>
          <button type="button" aria-label={paused ? labels.play : labels.pause} aria-pressed={!paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button>
          <button type="button" aria-label={labels.next} onClick={() => move(true)}>{rtl ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}</button>
        </div>
      </div>
    </Carousel>
  </div>;
}
