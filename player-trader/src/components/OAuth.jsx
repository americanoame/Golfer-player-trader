import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase'

export default function OAuth() {
  const handleGoogleClick = async () => {
      try {
        const provider = new GoogleAuthProvider()
         const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);
        console.log(result);
      } catch (error) {
        
        console.log('could not login with google', error);
        
      }
  };
  return (
    <button type='button' onClick={handleGoogleClick}
    className="w-full bg-green-500 text-white  font-semibold p-2 rounded-lg
 hover:bg-green-600 transition duration-200 uppercase mt-3"
  >
    Sign with google
  </button>
  )
}
