import {Sidebar} from './components/sidebar';
import {Timeline} from './components/timeline';
import {Viewport} from './components/viewport';
import {Footer} from './components/footer/Footer';
import {ResizeableLayout} from './components/layout';
import {useState} from 'preact/hooks';
import {ShortcutsProvider} from './contexts/shorcuts';

export function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ShortcutsProvider>
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
        footer={<Footer />}
      />
    </ShortcutsProvider>
  );
}
