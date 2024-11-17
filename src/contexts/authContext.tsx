import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {auth, db} from '../database/firebase.config';
import {get, onValue, ref, set, update} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProviderProps = {
  children: ReactNode;
};

interface IUserInterface {
  name: string;
  email: string;
  work?: string;
  url?: string;
  phone?: string;
  uid: string;
}

interface IAuthContextInterface {
  user: IUserInterface | null;
  signed: boolean;
  createUser: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  loadingAuth: boolean;
  logout(): Promise<void>;
  updateProfile: (
    url: string,
    name: string,
    work: string,
    phone: string,
  ) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextInterface);

function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<IUserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.url) return;
      const dataRef = ref(db, `users/${user.uid}`);
      const unsubscribe = onValue(dataRef, snapshot => {
        let data = {
          uid: user.uid,
          name: snapshot.val().name,
          email: user.email,
          phone: snapshot.val().phone,
          work: snapshot.val().work,
          url: snapshot.val().url,
        };
        setUser(data);
        storageUser(data);
      });
      return () => unsubscribe();
    };
    fetchData();
  }, [user?.uid]);

  async function createUser(email: string, password: string, name: string) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        let uid = userCredential.user.uid;
        const dataRef = ref(db, `users/${uid}`);
        await set(dataRef, {
          name: name,
          balance: 0,
          email: userCredential.user?.email,
        }).then(() => {
          const data = {
            uid: uid,
            name: name,
            email: userCredential.user.email || '',
            phone: '',
            work: '',
            url: '',
          };
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
        });
      })
      .catch(error => {
        alert(error.code);
        setLoadingAuth(false);
      });
  }

  async function login(email: string, password: string) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        let uid = userCredential.user.uid;
        const dataRef = ref(db, `users/${uid}`);
        get(dataRef).then(snapshot => {
          let data = {
            uid: uid,
            name: snapshot.val().name,
            email: userCredential.user.email || '',
            phone: snapshot.val().phone,
            work: snapshot.val().work,
            url: snapshot.val().url,
          };
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
        });
      })
      .catch(error => {
        alert(error.code);
        setLoadingAuth(false);
      });
  }

  async function logout() {
    await signOut(auth);
    await AsyncStorage.clear().then(() => setUser(null));
  }

  async function updateProfile(
    url: string,
    name: string,
    work: string,
    phone: string,
  ) {
    const dataRef = ref(db, `users/${user?.uid}`);
    await update(dataRef, {
      url: url,
      name: name,
      work: work,
      phone: phone,
    });
    await get(dataRef).then(snapshot => {
      let data = {
        uid: user?.uid || '',
        name: snapshot.val().name,
        email: user?.email || '',
        phone: snapshot.val().phone,
        work: snapshot.val().work,
        url: snapshot.val().url,
      };
      setUser(data);
      storageUser(data);
    });
  }

  async function storageUser(data: IUserInterface) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        createUser,
        login,
        loading,
        logout,
        updateProfile,
        loadingAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
