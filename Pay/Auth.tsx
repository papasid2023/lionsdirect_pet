import { useMMKV } from "react-native-mmkv";
import { FIREBASE_AUTH } from "../firebaseConfig";

const auth = FIREBASE_AUTH;

const CurrentMail = auth.currentUser?.email;

const storage = useMMKV({id: `user-${CurrentMail}-storage`});

export { storage, auth, CurrentMail }