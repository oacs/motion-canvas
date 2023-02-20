import React, {createContext, useContext, useReducer} from 'react';

export type Shortcut = {
  key: string;
  action: string;
};

type Action = {
  type: 'add' | 'remove';
  shortcuts: Shortcut[];
};

type Reducer<S, A> = (prevState: S, action: A) => S;
const initialshortcuts = [] as Shortcut[];
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
