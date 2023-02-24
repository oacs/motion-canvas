import React, {createContext, useContext, useReducer} from 'react';

export type Shortcut = {
  key: string;
  action: string;
  isGlobal?: boolean;
};

type Action = {
  type: 'add' | 'remove';
  shortcuts: Shortcut[];
};

type Reducer<S, A> = (prevState: S, action: A) => S;
const initialshortcuts = [
  //  Timeline shortcuts
  //{key: 'f', action: 'Focus Playhead', isGlobal: true},
  // Playback Controls Shortcuts
  {key: 'Space', action: 'Toggle playback', isGlobal: true},
  {key: '←', action: 'Previous frame', isGlobal: true},
  {key: '→', action: 'Next frame', isGlobal: true},
  {key: 'Shift + ←', action: 'Reset to first frame', isGlobal: true},
  {key: 'Shift + →', action: 'Seek to last frame', isGlobal: true},
  {key: 'm', action: 'Toggle audio', isGlobal: true},
  {key: 'l', action: 'Toggle loop', isGlobal: true},
] as Shortcut[];
const ShortcutsContext = createContext<Shortcut[]>(initialshortcuts);
const ShortcutsDispatchContext = createContext<React.Dispatch<Action>>(null);

export function ShortcutsProvider({children}) {
  const [shortcuts, dispatch] = useReducer<Reducer<Shortcut[], Action>>(
    shortcutsReducer,
    initialshortcuts,
  );

  return (
    <ShortcutsContext.Provider value={shortcuts}>
      <ShortcutsDispatchContext.Provider value={dispatch}>
        {children}
      </ShortcutsDispatchContext.Provider>
    </ShortcutsContext.Provider>
  );
}

export function useShortcuts() {
  return useContext<Shortcut[]>(ShortcutsContext);
}

export function useShortcutsDispatch() {
  return useContext(ShortcutsDispatchContext);
}

function uniqBy<T extends Record<string, unknown>>(arr: T[], key: string) {
  const seen = {} as Record<string, boolean>;
  return arr.filter(item => {
    const k = (item as any)?.[key];
    return Object.hasOwn(seen, k) ? false : (seen[k] = true);
  });
}

function shortcutsReducer(shortcuts: Shortcut[], action: Action) {
  console.log('shortcutsReducer', {
    shortcuts,
    action,
    concat: shortcuts.concat(action.shortcuts),
    unique: uniqBy(action.shortcuts.concat(shortcuts), 'key'),
  });
  switch (action.type) {
    case 'add': {
      return [...uniqBy(shortcuts.concat(action.shortcuts), 'key')];
    }
    case 'remove': {
      return shortcuts.filter(
        (shortcutItem: Shortcut) =>
          !action.shortcuts.find(a => a.key === shortcutItem.key),
      );
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
