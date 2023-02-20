import {createContext, useContext, useReducer} from 'react';

type Shortcut = {
  key: string;
  action: string;
};

const ShortcutsContext = createContext(null);
const ShortcutsDispatchContext = createContext(null);

export function ShortcutsProvider({children}) {
  const [shortcuts, dispatch] = useReducer(shortcutsReducer, initialshortcuts);

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

function shortcutsReducer(
  shortcuts: Shortcut[],
  action: {type: string; shortcut: Shortcut},
) {
  switch (action.type) {
    case 'add': {
      if (
        shortcuts.find(
          (shortcutItem: Shortcut) => shortcutItem.key === action.shortcut.key,
        )
      ) {
        return shortcuts;
      }
      return [...shortcuts, action.shortcut];
    }
    case 'remove': {
      return shortcuts.filter(
        (shortcutItem: Shortcut) => shortcutItem.key !== action.shortcut.key,
      );
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialshortcuts = [] as Shortcut[];
