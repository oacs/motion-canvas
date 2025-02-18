import {Sidebar} from './components/sidebar';
import {Timeline} from './components/timeline';
import {Viewport} from './components/viewport';
import {ResizeableLayout} from './components/layout';
import {useState} from 'preact/hooks';
import {usePresenterState} from './hooks';
import {PresenterState} from '@motion-canvas/core';
import {PresentationMode} from './components/presentation';

export function Editor() {
  const state = usePresenterState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return state === PresenterState.Initial ? (
    <ResizeableLayout
      id={'main-timeline'}
      size={0.7}
      vertical
      start={
        <ResizeableLayout
          resizeable={sidebarOpen}
          id={'sidebar-vieport'}
          start={<Sidebar setOpen={setSidebarOpen} />}
          end={<Viewport />}
        />
      }
      end={<Timeline />}
    />
  ) : (
    <PresentationMode />
  );
}
