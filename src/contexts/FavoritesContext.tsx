import { createContext, useContext, useReducer, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (patternId: string) => void;
  isFavorite: (patternId: string) => boolean;
  loading: boolean;
}

type State = {
  favorites: string[];
  loading: boolean;
};

type Action =
  | { type: 'SET_FAVORITES'; payload: string[] }
  | { type: 'SET_LOADING'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { favorites: [], loading: true });

  const useLocal = !auth.app.options.apiKey;

  useEffect(() => {
    if (useLocal) {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      dispatch({ type: 'SET_FAVORITES', payload: stored });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const favColl = collection(db, 'users', user.uid, 'favorites');
        dispatch({ type: 'SET_LOADING', payload: true });
        const unsubscribeFav = onSnapshot(favColl, (snapshot) => {
          const favs = snapshot.docs.map((doc) => doc.id);
          dispatch({ type: 'SET_FAVORITES', payload: favs });
          dispatch({ type: 'SET_LOADING', payload: false });
        });
        return () => unsubscribeFav();
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });
    return () => unsubscribeAuth();
  }, [useLocal]);

  const toggleFavorite = async (patternId: string) => {
    const user = auth.currentUser;
    if (useLocal || !user) {
      let favs = [...state.favorites];
      if (favs.includes(patternId)) {
        favs = favs.filter((id) => id !== patternId);
      } else {
        favs.push(patternId);
      }
      localStorage.setItem('favorites', JSON.stringify(favs));
      dispatch({ type: 'SET_FAVORITES', payload: favs });
      return;
    }
    const favDoc = doc(db, 'users', user.uid, 'favorites', patternId);
    if (state.favorites.includes(patternId)) {
      await deleteDoc(favDoc);
    } else {
      await setDoc(favDoc, { patternId: true });
    }
  };

  const isFavorite = (patternId: string) => state.favorites.includes(patternId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
        loading: state.loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}